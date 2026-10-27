-- Ejecutar en SQL Editor del proyecto existente de Supabase.
-- Concede al visitante únicamente lectura de los campos de la galería.
-- No crea tablas, modifica filas ni concede permisos de escritura.
begin;

grant usage on schema public to anon;
grant select (id, title, description, image_url, date)
  on public.gallery to anon;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'gallery'
      and policyname = 'tajiri_gallery_public_read'
  ) then
    create policy tajiri_gallery_public_read
      on public.gallery
      for select
      to anon
      using (true);
  end if;
end
$$;

commit;
