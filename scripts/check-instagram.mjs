import nextEnv from '@next/env';
import { fetchInstagramPosts, InstagramFeedError } from '../lib/instagram-feed.ts';
nextEnv.loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
const loginType = process.env.INSTAGRAM_LOGIN_TYPE?.trim() || 'instagram';
if (!token) {
  console.error('Falta INSTAGRAM_ACCESS_TOKEN en .env.local. Guarda el token de la cuenta profesional de TAJIRI.');
  process.exitCode = 1;
} else if (!['instagram', 'facebook'].includes(loginType)) {
  console.error('INSTAGRAM_LOGIN_TYPE debe ser instagram o facebook.');
  process.exitCode = 1;
} else {
  try {
    const posts = await fetchInstagramPosts({ token, loginType, accountId: process.env.INSTAGRAM_USER_ID?.trim() || 'me', version: process.env.INSTAGRAM_API_VERSION?.trim() || 'v25.0' });
    console.log('Conexión con Instagram: correcta');
    console.log('Publicaciones recibidas:', posts.length);
    console.log('Con portada:', posts.filter(post => post.image).length);
    console.log('Autores:', [...new Set(posts.map(post => post.author))].join(', ') || 'sin publicaciones');
  } catch (error) {
    const messages = {
      configuration: 'Revisa el ID de la cuenta y el tipo de login. Facebook Login requiere el ID numérico de Instagram.',
      token: 'Meta rechazó el token. Genera uno válido para la cuenta de TAJIRI y comprueba su vigencia.',
      permission: 'El token no tiene permiso para leer estas publicaciones. Revisa los permisos de la app y la cuenta profesional.',
      rate_limit: 'Meta está limitando las consultas. Espera unos minutos antes de reintentar.',
      network: 'No se pudo contactar con Meta. Comprueba la conexión a Internet.',
      upstream: 'Meta rechazó la consulta. Revisa cuenta, versión y permisos.',
      format: 'Meta devolvió una respuesta no reconocida.',
    };
    console.error(error instanceof InstagramFeedError ? messages[error.code] : 'No se pudo verificar la conexión.');
    if (error instanceof InstagramFeedError && error.apiCode !== undefined) console.error('Código de Meta:', error.apiCode);
    process.exitCode = 1;
  }
}
