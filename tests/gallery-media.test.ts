import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getVideoPosterUrl } from '../lib/gallery-media.ts';

test('extrae una portada JPG de MP4 y MOV conservando versión, carpetas y query', () => {
  for (const ext of ['mp4', 'mov']) {
    assert.equal(getVideoPosterUrl(`https://res.cloudinary.com/tajiri/video/upload/v123/eventos/visita.${ext}?test=1#t=0.5`),
      'https://res.cloudinary.com/tajiri/video/upload/so_0/c_limit,w_640/q_auto/v123/eventos/visita.jpg?test=1');
  }
});
test('permite un vídeo de Cloudinary sin extensión', () => {
  assert.equal(getVideoPosterUrl('https://res.cloudinary.com/tajiri/video/upload/evento'),
    'https://res.cloudinary.com/tajiri/video/upload/so_0/c_limit,w_640/q_auto/evento.jpg');
});
test('usa el fotograma nativo para otros proveedores, URLs firmadas o inválidas', () => {
  for (const source of ['https://cdn.example/video.mp4', 'https://res.cloudinary.com/tajiri/video/upload/s--firma--/v1/video.mp4',
    'https://res.cloudinary.com/tajiri/image/upload/foto.jpg', 'https://res.cloudinary.com/tajiri/video/upload/',
    'http://res.cloudinary.com/tajiri/video/upload/video.mp4', 'javascript:alert(1)', 'no-es-url']) {
    assert.equal(getVideoPosterUrl(source), null);
  }
});
