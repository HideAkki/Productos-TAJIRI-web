import { test, expect } from '@playwright/test';
import type { SocialPost } from '../lib/instagram-feed';

const posts: SocialPost[] = Array.from({ length: 14 }, (_, index) => ({
  id: `insta-test-${index}`, platform: 'Instagram', author: '@productos___tajiri_',
  text: index === 0 ? `Suero para compartir. ${'Una historia de nuestra cocina, sabores y momentos en familia. '.repeat(5)}` : `Historia ${index + 1}: un momento de TAJIRI.`,
  date: `${27 - index} oct 2026`, publishedAt: new Date(Date.UTC(2026, 9, 27 - index)).toISOString(),
  link: `https://www.instagram.com/p/test-${index}/`,
  image: index % 2 ? '/Portada Suero.png' : '/Portada Yogurt Griego.png',
  mediaType: (['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'] as const)[index % 3],
}));
async function loadPosts(page: import('@playwright/test').Page) {
  await page.route('**/api/social-feed', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ posts }) }));
  await page.goto('/blog');
  await page.getByRole('button', { name: 'Cerrar sin guardar' }).click();
  await expect(page.locator('#publicaciones article')).toHaveCount(9);
}
test('el blog permite ampliar textos, mostrar más publicaciones, filtrar y buscar', async ({ page }) => {
  await loadPosts(page);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Historias que saben a casa.');
  const moreText = page.getByRole('button', { name: 'Leer más', exact: true }).first();
  await moreText.click();
  await expect(page.locator('#publicaciones article').first().getByRole('button', { name: 'Leer menos', exact: true })).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: 'Ver más publicaciones' }).click();
  await expect(page.locator('#publicaciones article')).toHaveCount(14);
  const videos = page.getByRole('group', { name: 'Filtrar publicaciones' }).getByRole('button', { name: 'Vídeos', exact: true });
  await videos.click(); await expect(videos).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#publicaciones article')).toHaveCount(5);
  await page.getByRole('group', { name: 'Filtrar publicaciones' }).getByRole('button', { name: 'Todas', exact: true }).click();
  await page.getByRole('searchbox', { name: 'Buscar publicaciones' }).fill('suero');
  await expect(page.locator('#publicaciones article')).toHaveCount(1);
  await page.getByRole('searchbox', { name: 'Buscar publicaciones' }).fill('sin coincidencias');
  await expect(page.getByText('No encontramos publicaciones con esa búsqueda.')).toBeVisible();
  await page.getByRole('button', { name: 'Ver todas las publicaciones', exact: true }).click();
  await expect(page.locator('#publicaciones article')).toHaveCount(9);
});
test('el blog se adapta a móvil y conserva enlaces reales de las publicaciones', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await loadPosts(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('#publicaciones article').first().getByRole('link', { name: 'Ver en Instagram', exact: true })).toHaveAttribute('href', posts[0].link);
  await page.screenshot({ path: test.info().outputPath('blog-mobile.png'), fullPage: true });
  await page.screenshot({ path: test.info().outputPath('blog-mobile-viewport.png') });
});
test('el error del feed permite reintentar sin mostrar errores internos', async ({ page }) => {
  let ready = false;
  await page.route('**/api/social-feed', route => route.fulfill({ status: ready ? 200 : 503, contentType: 'application/json', body: JSON.stringify(ready ? { posts: posts.slice(0, 1) } : { error: 'SECRET provider trace', posts: [] }) }));
  await page.goto('/blog'); await page.getByRole('button', { name: 'Cerrar sin guardar' }).click();
  await expect(page.getByRole('heading', { name: 'Nos vemos en Instagram' })).toBeVisible();
  await expect(page.getByText('SECRET provider trace')).toHaveCount(0);
  ready = true;
  await page.getByRole('button', { name: 'Reintentar', exact: true }).click();
  await expect(page.locator('#publicaciones article')).toHaveCount(1);
});
test('las imágenes fallidas conservan una tarjeta utilizable', async ({ page }) => {
  await page.route('**/api/social-feed', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ posts: [{ ...posts[0], image: '/test-image-missing.jpg' }] }) }));
  await page.route('**/test-image-missing.jpg', route => route.abort());
  await page.goto('/blog'); await page.getByRole('button', { name: 'Cerrar sin guardar' }).click();
  const card = page.locator('#publicaciones article').first();
  await card.scrollIntoViewIfNeeded();
  await expect(card.getByText('Un momento de TAJIRI', { exact: true })).toBeVisible();
  await expect(card.getByRole('link', { name: 'Ver en Instagram', exact: true })).toBeVisible();
});
test('el diseño completo del blog en escritorio', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await loadPosts(page);
  await page.screenshot({ path: test.info().outputPath('blog-desktop.png'), fullPage: true });
});
