# Productos Tajiri

Proyecto web con Next.js, Tailwind CSS, Framer Motion y Lucide React.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm start`
- `npm run lint`

## Notas

Esta es una configuración inicial con el App Router de Next.js y un ejemplo de animación con Tailwind y Framer Motion.

## Configuración de Galería con Supabase y Cloudinary

1. Crea una tabla en Supabase llamada `gallery` con esta estructura:

   - `id`: `bigint` autoincremental o `uuid` según prefieras
   - `title`: `text`
   - `description`: `text`
   - `date`: `date`
   - `image_url`: `text`
   - `created_at`: `timestamp` con valor por defecto `now()` (opcional)

2. Ejecuta la consulta SQL en el editor de Supabase o usa el archivo `supabase/gallery-table.sql`.

3. Define estas variables de entorno en tu proyecto:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_UPLOAD_PRESET`

4. La galería se muestra de forma pública y solo necesita acceso de lectura a Supabase.

**Seguridad:** No incluyas credenciales ni secretos en el repositorio. Añade `.env.local` a tu archivo `.gitignore` y almacena valores sensibles en variables de entorno en tu servidor/CI. Si has subido por error secretos (API keys, contraseñas), revócalos y regenera nuevas claves inmediatamente.
