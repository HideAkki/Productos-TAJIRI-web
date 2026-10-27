import { test, expect } from '@playwright/test';

async function dismissNotice(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: 'Cerrar sin guardar' }).click();
}
test('las páginas tienen título y un encabezado principal', async ({ page }) => {
  for (const path of ['/', '/productos', '/contacto', '/blog', '/conocenos/nuestra-historia', '/conocenos/galeria', '/privacidad', '/cookies']) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/TAJIRI/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-image\.jpg$/);
  }
});
test('menú por teclado y detalle con foco, Escape y consulta contextual', async ({ page }) => {
  await page.goto('/productos'); await dismissNotice(page);
  const menu = page.getByRole('button', { name: 'Conócenos', exact: true });
  await menu.focus(); await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('link', { name: 'Galería', exact: true })).toBeVisible();
  await page.keyboard.press('Escape'); await expect(menu).toBeFocused();
  const trigger = page.getByRole('button', { name: 'Ver detalle', exact: true }).first();
  await trigger.click();
  const dialog = page.getByRole('dialog'); await expect(dialog).toBeVisible();
  await page.keyboard.press('Shift+Tab');
  await expect.poll(() => page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  await page.keyboard.press('Escape'); await expect(dialog).toHaveCount(0); await expect(trigger).toBeFocused();
  await trigger.click(); await page.getByRole('button', { name: '9 oz', exact: true }).click();
  await page.getByRole('link', { name: 'Consultar por este producto' }).click();
  await expect(page.getByLabel('Mensaje', { exact: true })).toHaveValue(/Suero Costeño, presentación 9 oz/);
});
test('el contacto no finge un envío sin proveedor configurado', async ({ page }) => {
  await page.goto('/contacto'); await dismissNotice(page);
  await page.getByLabel('Nombre', { exact: true }).fill('Cliente de prueba');
  await page.getByLabel('Correo', { exact: true }).fill('prueba@example.com');
  await page.getByLabel('Mensaje', { exact: true }).fill('Consulta de prueba');
  await page.getByRole('button', { name: 'Enviar mensaje', exact: true }).click();
  await expect(page.locator('form [role=alert]')).toContainText('aún no está disponible');
  await expect(page.getByLabel('Mensaje', { exact: true })).toHaveValue('Consulta de prueba');
});
test('la galería pagina y responde al deslizamiento sin zoom en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/conocenos/galeria'); await dismissNotice(page);
  const images = page.locator('main .grid > button');
  await expect(images).toHaveCount(18);
  await page.getByRole('navigation', { name: 'Páginas de la galería' }).first().getByRole('link', { name: 'Siguiente', exact: true }).click();
  await expect(images).toHaveCount(2);
  await page.getByRole('navigation', { name: 'Páginas de la galería' }).first().getByRole('link', { name: 'Anterior', exact: true }).click();
  await images.first().click();
  const dialog = page.getByRole('dialog'); await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('01 / 18');
  await dialog.locator('img').evaluate(image => {
    const target = image;
    const touch = (x: number) => new Touch({ identifier: 1, target, clientX: x, clientY: 350 });
    target.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [touch(300)], changedTouches: [touch(300)] }));
    target.dispatchEvent(new TouchEvent('touchmove', { bubbles: true, touches: [touch(100)], changedTouches: [touch(100)] }));
    target.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [], changedTouches: [touch(100)] }));
  });
  await expect(dialog).toContainText('02 / 18');
  await page.getByRole('button', { name: 'Volver', exact: true }).click(); await expect(dialog).toHaveCount(0);
});
test('preferencia de privacidad opcional y restablecible', async ({ page }) => {
  await page.goto('/cookies'); await dismissNotice(page);
  expect(await page.evaluate(() => localStorage.getItem('tajiri_cookie_consent'))).toBeNull();
  await page.reload(); await page.getByRole('button', { name: 'Recordar mi elección' }).click();
  await page.reload(); await expect(page.getByRole('complementary', { name: 'Preferencias de privacidad' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Restablecer mi preferencia' }).click();
  await expect(page.getByRole('complementary', { name: 'Preferencias de privacidad' })).toBeVisible();
});
test('API social no expone configuración ni mensajes internos', async ({ request }) => {
  const result = await request.get('/api/social-feed');
  expect(result.status()).toBe(503);
  expect(await result.text()).not.toMatch(/INSTAGRAM_ACCESS_TOKEN|Missing|access_token|trace/);
});
test('historia accesible y diseños sin desbordamiento horizontal', async ({ page }) => {
  await page.goto('/conocenos/nuestra-historia'); await dismissNotice(page);
  const trigger = page.getByRole('button', { name: 'Conocer este capítulo' }).first();
  await trigger.click(); await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(trigger).toBeFocused();
  for (const path of ['/', '/productos', '/contacto']) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.screenshot({ path: test.info().outputPath('contacto-mobile.png'), fullPage: true });
});
test('un envío aceptado muestra el resultado y limpia el formulario', async ({ page }) => {
  await page.route('**/api/contact', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ message: 'Tu mensaje fue aceptado para envío.' }) }));
  await page.goto('/contacto'); await dismissNotice(page);
  await page.getByLabel('Nombre', { exact: true }).fill('Cliente');
  await page.getByLabel('Correo', { exact: true }).fill('cliente@example.com');
  await page.getByLabel('Mensaje', { exact: true }).fill('Una consulta');
  await page.getByRole('button', { name: 'Enviar mensaje', exact: true }).click();
  await expect(page.locator('form [role=status]')).toContainText('aceptado para envío');
  await expect(page.getByLabel('Mensaje', { exact: true })).toHaveValue('');
});
test('los vídeos MP4 y MOV muestran portada sin descargar el vídeo en la cuadrícula', async ({ page }) => {
  await page.route('https://res.cloudinary.com/**/video/upload/**', route => {
    if (new URL(route.request().url()).pathname.endsWith('.jpg')) {
      return route.fulfill({ contentType: 'image/png', body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64') });
    }
    return route.abort();
  });
  await page.goto('/conocenos/galeria'); await dismissNotice(page);
  for (const number of [2, 5]) {
    const card = page.getByRole('button', { name: `Abrir vídeo: Momento ${number}`, exact: true });
    await card.scrollIntoViewIfNeeded();
    await expect(card.getByText('Vídeo', { exact: true })).toBeVisible();
    await expect.poll(() => card.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(card.locator('video')).toHaveCount(0);
  }
  await page.getByRole('button', { name: 'Abrir vídeo: Momento 2', exact: true }).click();
  await expect(page.getByRole('dialog').locator('video')).toHaveAttribute('src', /galeria-test-2\.mp4$/);
});
test('una portada fallida mantiene un indicador y busca el fotograma del vídeo', async ({ page }) => {
  await page.route('https://res.cloudinary.com/**/video/upload/**', route => route.abort());
  await page.goto('/conocenos/galeria'); await dismissNotice(page);
  const card = page.getByRole('button', { name: 'Abrir vídeo: Momento 2', exact: true });
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator('video')).toHaveAttribute('preload', 'metadata');
  await expect(card.getByText('Abrir vídeo', { exact: true })).toBeVisible();
  await expect(card.getByText('Vídeo', { exact: true })).toBeVisible();
});
