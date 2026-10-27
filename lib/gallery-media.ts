/** Portada estática de un vídeo público de Cloudinary; no requiere credenciales. */
export function getVideoPosterUrl(source: string): string | null {
  try {
    const url = new URL(source);
    if (url.protocol !== 'https:' || url.hostname !== 'res.cloudinary.com') return null;
    const marker = '/video/upload/';
    const index = url.pathname.indexOf(marker);
    if (index < 0) return null;
    const assetPath = url.pathname.slice(index + marker.length);
    // Las URLs firmadas necesitan su firma original: usar el fotograma nativo.
    if (!assetPath || assetPath.startsWith('s--')) return null;
    const imagePath = /\.(mp4|webm|ogg|ogv|mov|m4v|avi|mkv)$/i.test(assetPath)
      ? assetPath.replace(/\.[^/.]+$/, '.jpg')
      : `${assetPath}.jpg`;
    url.pathname = `${url.pathname.slice(0, index)}${marker}so_0/c_limit,w_640/q_auto/${imagePath}`;
    url.hash = '';
    return url.href;
  } catch { return null; }
}
