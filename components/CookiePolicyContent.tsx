'use client';
import SectionTitle from '@/components/SectionTitle';
export default function CookiePolicyContent() {
  const reset = () => {
    try { window.localStorage.removeItem('tajiri_cookie_consent'); } catch { /* Sin acceso al almacenamiento. */ }
    window.dispatchEvent(new Event('tajiri:preferences-reset'));
  };
  return <main className="mx-auto max-w-5xl px-6 py-16">
    <SectionTitle as="h1" title="Cookies y almacenamiento local" />
    <div className="mt-10 space-y-8 rounded-3xl bg-white p-8 leading-8">
      <section><h2 className="text-2xl font-semibold">Qué guarda este sitio</h2><p>No incorporamos herramientas de publicidad ni analítica. El aviso de privacidad utiliza almacenamiento local del navegador, no una cookie. Si seleccionas “Recordar mi elección”, se guarda la clave <code>tajiri_cookie_consent</code> con el valor <code>accepted</code>. No contiene tu nombre ni correo.</p></section>
      <section><h2 className="text-2xl font-semibold">Duración y elección</h2><p>La preferencia permanece en este navegador hasta que la elimines. “Cerrar sin guardar” oculta el aviso durante esta visita sin escribir esa preferencia. Si el navegador bloquea el almacenamiento, puedes seguir navegando.</p></section>
      <section><h2 className="text-2xl font-semibold">Cómo eliminar la preferencia</h2><p>Puedes borrar los datos del sitio desde tu navegador o usar este botón. Borrar únicamente las cookies no siempre elimina el almacenamiento local.</p><button type="button" onClick={reset} className="mt-4 rounded-full bg-[#8f1111] px-6 py-3 text-white">Restablecer mi preferencia</button></section>
      <section><h2 className="text-2xl font-semibold">Servicios externos</h2><p>Las imágenes pueden cargarse desde Cloudinary y los servidores de Instagram. Al seguir enlaces a redes sociales se aplican sus propias políticas. Para consultas: <a href="mailto:isusedia@gmail.com" className="underline">isusedia@gmail.com</a>.</p></section>
    </div>
  </main>;
}
