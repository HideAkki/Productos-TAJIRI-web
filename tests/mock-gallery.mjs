import { createServer } from 'node:http';
const rows = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1, title: `Momento ${index + 1}`, description: 'Historia de prueba',
  image_url: index === 1 || index === 4
    ? `https://res.cloudinary.com/demo/video/upload/v1/galeria-test-${index + 1}.${index === 4 ? 'mov' : 'mp4'}`
    : `https://res.cloudinary.com/demo/image/upload/sample.jpg?item=${index + 1}`, date: '2026-10-27',
}));
createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:3201');
  res.setHeader('Content-Type', 'application/json');
  if (url.pathname === '/health') return res.end('{}');
  const offset = Number(url.searchParams.get('offset') || 0);
  const limit = Number(url.searchParams.get('limit') || 19);
  res.end(JSON.stringify(rows.slice(offset, offset + limit)));
}).listen(3201, '127.0.0.1');
