const TRANSIENT_STATUS = new Set([500, 502, 503, 504]);

/** Lecturas frescas de galería, con un único reintento ante fallos transitorios. */
export function createGalleryFetch(request: typeof fetch = fetch): typeof fetch {
  return async (input, init) => {
    const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
    const canRetry = method === 'GET' || method === 'HEAD';
    for (let attempt = 0; attempt < 2; attempt++) {
      const timeout = AbortSignal.timeout(8000);
      const signal = init?.signal ? AbortSignal.any([init.signal, timeout]) : timeout;
      try {
        const response = await request(input, { ...init, cache: 'no-store', signal });
        if (attempt === 0 && canRetry && !init?.signal?.aborted && TRANSIENT_STATUS.has(response.status)) {
          await response.body?.cancel();
          await new Promise(resolve => setTimeout(resolve, 250));
          continue;
        }
        return response;
      } catch (error) {
        if (attempt === 0 && canRetry && !init?.signal?.aborted) {
          await new Promise(resolve => setTimeout(resolve, 250));
          continue;
        }
        if (process.env.NODE_ENV === 'development') {
          const cause = error && typeof error === 'object' && 'cause' in error ? error.cause : null;
          const code = cause && typeof cause === 'object' && 'code' in cause ? cause.code : null;
          console.error('Supabase: fallo de conexión.', {
            code: typeof code === 'string' && /^[A-Z0-9_]{1,64}$/.test(code) ? code : 'NETWORK_ERROR',
            timeout: error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name),
          });
        }
        throw error;
      }
    }
    throw new Error('No se pudo completar la lectura de la galería.');
  };
}
