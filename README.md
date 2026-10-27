# Productos TAJIRI

Web de presentación, catálogo y contacto con Next.js 15, React 18, TypeScript, Tailwind y Framer Motion.

## Inicio local

Utiliza Node 24 (`nvm use`). Ejecuta `npm ci`, copia `.env.example` a `.env.local` y ejecuta `npm run dev`.
El proyecto compila sin credenciales: las integraciones opcionales muestran un estado de indisponibilidad. Conserva las credenciales de tu configuración existente. La clave `SUPABASE_SERVICE_ROLE_KEY`, si ya la utilizabas, se mantiene exclusivamente en el servidor.

- `npm run lint`: ESLint sin preguntas interactivas ni advertencias.
- `npm run typecheck`: comprobación de TypeScript.
- `npm test`: pruebas del contacto con proveedor simulado y recorridos de navegador con datos de galería simulados. No envía correos reales. Instala Chromium antes con `npx playwright install chromium`.
- `npm run build` y `npm start`: producción. La compilación descarga Poppins desde Google Fonts; requiere acceso a la red.
- `npm run check`: lint, tipos, pruebas y compilación.
- `npm audit`: revisión de dependencias. El override de PostCSS fuerza la versión corregida también dentro de Next.js 15; comprobarlo al actualizar Next.

GitHub Actions ejecuta estas comprobaciones con Node 24. Las pruebas no requieren credenciales reales y utilizan los puertos locales 3100 y 3201.

## Configuración de producción

Configura las variables del ejemplo en el hosting y vuelve a compilar al cambiar variables `NEXT_PUBLIC_*`.

### Dominio y buscadores

`NEXT_PUBLIC_SITE_URL` debe ser el origen público definitivo, por ejemplo `https://tu-dominio.com`, sin rutas. Sin dominio válido se desactiva la indexación y el sitemap responde 503 para evitar publicar URLs de localhost. Los metadatos por página incluyen canonical cuando el dominio existe. Sitemap contiene rutas reales y no inventa fechas de modificación.

### Galería (Supabase)

1. Ejecuta `supabase/gallery-table.sql` en el editor SQL del proyecto.
2. Configura `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clave pública anon o publishable).
3. Gestiona las filas desde el panel de Supabase. Solo se conceden permisos de lectura al visitante; las imágenes/vídeos deben tener URLs HTTPS públicas.
4. Si reutilizas una tabla, revisa sus políticas RLS anteriores: el SQL no elimina políticas ajenas. Prueba que anon no pueda insertar, modificar ni borrar.

La galería consulta 18 elementos por página y uno adicional para detectar la siguiente página, ordenados por fecha e ID. Las consultas tienen un límite de espera de 8 segundos. Se conserva la conexión original: si está definida `SUPABASE_SERVICE_ROLE_KEY`, el servidor la utiliza; en caso contrario usa `NEXT_PUBLIC_SUPABASE_ANON_KEY`. La clave de servicio permanece en un módulo `server-only` y nunca debe llevar prefijo `NEXT_PUBLIC_`. Cloudinary es opcional: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` solo hace falta para el componente `CloudinaryImage`. No hay cargas de archivos desde esta web ni se necesita un preset de subida.

Si las fotos existentes no aparecen en local, comprueba primero `.env.local`: debe usar el mismo proyecto de Supabase donde está la tabla con las fotos. Reinicia `npm run dev` después de configurar las variables. En desarrollo se muestra un diagnóstico cuando falta la conexión o falla la consulta. Si utilizas la clave pública y la consulta funciona pero no devuelve filas, revisa su permiso SELECT mediante RLS. Si aparecen 18 elementos, utiliza «Siguiente», disponible arriba y abajo de la cuadrícula; la paginación no elimina fotos.

Las lecturas de la galería no se guardan en la caché de `fetch`. Ante un fallo de red o una respuesta 500/502/503/504 se reintentan una sola vez, con ocho segundos de espera máxima por intento. Los errores de credenciales y permisos no se reintentan. En desarrollo se registra únicamente un código de conexión seguro, sin claves ni URLs de conexión.

Los vídeos públicos de Cloudinary muestran una portada JPG del primer fotograma y un indicador de reproducción. La cuadrícula descarga la portada en lugar del vídeo completo. Si el proveedor no admite la portada o esta falla, se intenta mostrar un fotograma mediante el navegador y se conserva el indicador de vídeo. Los vídeos se reproducen al abrir el visor, usando sus controles.

### Instagram

La cuenta debe ser profesional (Empresa o Creador). Conserva los valores de Supabase y completa solo las variables de Instagram en `.env.local`:

```dotenv
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_USER_ID=
INSTAGRAM_LOGIN_TYPE=instagram
INSTAGRAM_API_VERSION=v25.0
```

- **Instagram Login:** en tu app de Meta abre la configuración de la API de Instagram, añade/autoriza la cuenta de TAJIRI y genera el token con acceso de lectura (`instagram_business_basic`). Guarda el token en `INSTAGRAM_ACCESS_TOKEN`; `INSTAGRAM_USER_ID` puede quedar vacío porque se utiliza `me`.
- **Facebook Login:** conserva el token correspondiente a la página vinculada y configura `INSTAGRAM_LOGIN_TYPE=facebook` e `INSTAGRAM_USER_ID` con el ID numérico de la cuenta profesional de Instagram, no el ID de Facebook. Requiere los permisos de lectura de Instagram y de la página vinculada.
- Usa el token de la cuenta, no el App Secret ni una contraseña de Instagram. Los valores se guardan solo en el servidor; nunca llevan prefijo `NEXT_PUBLIC_` ni se comparten en el chat.
- Ejecuta `npm run instagram:check` para comprobar la conexión sin imprimir el token. El comando indica publicaciones recibidas y errores de configuración, permisos, vigencia o red. Reinicia `npm run dev` tras configurar las variables.
- Renueva el token antes de que expire según las condiciones de Meta. Una prueba con token recién emitido no garantiza su vigencia futura. No hay renovación automática de credenciales.

El feed consulta hasta 24 publicaciones recientes en una sola solicitud, con espera máxima de diez segundos y caché de diez minutos. Cambiar las credenciales invalida la caché anterior. Se admiten fotos, vídeos con portada y carruseles. El blog permite filtrar por formato, buscar en los textos, ampliar las descripciones y mostrar más publicaciones. El inicio conserva un resumen de cuatro publicaciones.

La página utiliza la cuenta pública `@productos___tajiri_`, definida en `lib/instagram-feed.ts`. Los autores de las tarjetas se toman de las publicaciones cuando Meta los devuelve. Si falla la integración, se muestra un enlace al perfil y un botón para reintentar; los detalles de configuración se muestran solo en desarrollo. Los errores técnicos de Meta no se envían al visitante. Las pruebas usan publicaciones simuladas únicamente en el entorno de pruebas, nunca como contenido del sitio.

Referencias: [Instagram Platform](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/) y [colección oficial de Meta](https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api).

### Contacto (Resend)

1. Configura y verifica un dominio remitente en Resend.
2. Define `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (por ejemplo `TAJIRI <web@tu-dominio.com>`) y `CONTACT_TO_EMAIL` (por defecto `isusedia@gmail.com`). Son variables del servidor.
3. Valida un envío real controlado tras configurar el proveedor. El mensaje de éxito indica aceptación para envío, no confirma entrega en la bandeja de entrada.

El endpoint `POST /api/contact` valida origen, formato, campos y tamaño (16 KiB), limita el mensaje a 4000 caracteres, usa un campo trampa, idempotencia en reintentos y un tiempo máximo de diez segundos. Envía texto plano y usa el correo del visitante únicamente como `reply_to`; no permite elegir el destinatario desde el navegador. Conserva el contenido del formulario si falla. Sin proveedor devuelve 503 y ofrece correo/teléfono como alternativa.

La protección de frecuencia es **por instancia**: tres intentos por correo cada diez minutos y treinta globales. Añade una regla distribuida de frecuencia en el hosting antes de abrir el formulario a tráfico elevado; no uses cabeceras de IP no verificadas como garantía de identidad. El proveedor de correo también aplica sus propios límites. No registramos el contenido del mensaje ni respuestas completas del proveedor.

## Contenido y recursos

- Catálogo único en `lib/products.ts`; inicio y catálogo usan estos mismos datos.
- Cada detalle permite consultar por producto y presentación en `/contacto`.
- Los productos sin fotos muestran un aviso claro; reemplázalo con fotografías reales cuando estén disponibles. No se han inventado precios, disponibilidad ni fotografías.
- Los componentes usan copias WebP optimizadas de los recursos; se conservan los originales en `public` para futuras ediciones. Open Graph utiliza `og-image.jpg` (1200 × 630).
- Las ventanas usan el diálogo nativo del navegador para foco, fondo inerte y Escape. Se respeta la preferencia de movimiento reducido.
- El aviso de privacidad guarda únicamente `tajiri_cookie_consent` en localStorage si el visitante lo elige. No hay publicidad ni analítica incorporadas. Las políticas deben mantenerse alineadas con los servicios y procesos reales de la empresa.

## Antes de desplegar

Completa dominio, credenciales y fotografías reales; verifica las políticas RLS en Supabase y la entrega del correo configurado. Ejecuta `npm run check` y `npm audit`. La automatización no valida credenciales, reglas del hosting ni entrega de proveedores externos.
