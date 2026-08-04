'use client';

import { FormEvent, useEffect, useState } from 'react';

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string | null;
};

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth', { cache: 'no-store', credentials: 'same-origin' });
        const result = await response.json();
        setAuthenticated(result.authenticated === true);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    const loadGallery = async () => {
      try {
        const response = await fetch('/api/admin/gallery', { cache: 'no-store', credentials: 'same-origin' });
        if (response.ok) {
          const result = await response.json();
          setItems(result.items || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadGallery();
  }, [authenticated]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Credenciales inválidas.');
      }

      setAuthenticated(true);
      setUsername('');
      setPassword('');
      setMessage('Autenticación exitosa. Ya puedes subir imágenes.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Error de autenticación.');
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    setBusy(true);
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      setAuthenticated(false);
      setItems([]);
      setMessage('Sesión cerrada.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Error cerrando sesión.');
    } finally {
      setBusy(false);
    }
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    if (!title.trim() || !date || !imageFile) {
      setMessage('Completa el título, la fecha y selecciona una imagen.');
      setBusy(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('date', date);
    formData.append('image', imageFile);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'No se pudo subir la imagen.');
      }

      setMessage('Imagen cargada correctamente.');
      setTitle('');
      setDescription('');
      setDate('');
      setImageFile(null);

      setItems((current) => [result.item, ...current]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Error al subir la imagen.');
    } finally {
      setBusy(false);
    }
  };

  if (checkingAuth) {
    return <p className="text-center text-base text-[#4a2b22]/80">Verificando acceso...</p>;
  }

  if (!authenticated) {
    return (
      <div className="space-y-6">
        <div className="rounded-[1.5rem] border border-[#4a2b22]/10 bg-[#fff8f0] p-6">
          <h2 className="text-xl font-semibold text-[#4a2b22]">Ingresar como admin</h2>
          <p className="mt-2 text-sm leading-6 text-[#4a2b22]/80">
            Introduce el usuario y la contraseña para acceder al panel oculto.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-[#4a2b22]">
              Usuario
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#4a2b22]/20 bg-white px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#8f1111]"
                type="text"
                autoComplete="username"
                placeholder="admin"
              />
            </label>
            <label className="block text-sm font-medium text-[#4a2b22]">
              Contraseña
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#4a2b22]/20 bg-white px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#8f1111]"
                type="password"
                autoComplete="current-password"
                placeholder="●●●●●●●●"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#4a2b22] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3b1e17] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? 'Ingresando...' : 'Ingresar'}
            </button>
            {message ? <p className="text-sm text-[#8f1111]">{message}</p> : null}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[1.5rem] border border-[#4a2b22]/10 bg-[#fff8f0] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#4a2b22]">Subir nueva imagen</h2>
          <p className="mt-2 text-sm leading-6 text-[#4a2b22]/80">
            Completa el formulario y sube la imagen a Cloudinary. El registro se guardará en Supabase.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={busy}
          className="rounded-full border border-[#4a2b22]/20 bg-white px-4 py-3 text-sm font-semibold text-[#4a2b22] transition hover:bg-[#f3f1ea] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cerrar sesión
        </button>
      </div>

      <form onSubmit={handleUpload} className="grid gap-6 rounded-[1.5rem] border border-[#4a2b22]/10 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-[#4a2b22]">
            Título
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#4a2b22]/20 bg-[#fff8f0] px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#8f1111]"
              type="text"
              placeholder="Ej. Festival de la Leche"
            />
          </label>

          <label className="block text-sm font-medium text-[#4a2b22]">
            Fecha
            <input
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#4a2b22]/20 bg-[#fff8f0] px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#8f1111]"
              type="date"
            />
          </label>
        </div>

        <label className="block text-sm font-medium text-[#4a2b22]">
          Descripción (opcional)
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 min-h-[140px] w-full rounded-2xl border border-[#4a2b22]/20 bg-[#fff8f0] px-4 py-3 text-sm text-[#4a2b22] outline-none transition focus:border-[#8f1111]"
            placeholder="Descripción breve para la imagen (opcional)."
          />
        </label>

        <label className="block text-sm font-medium text-[#4a2b22]">
          Subir imagen
          <input
            onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            className="mt-2 w-full rounded-2xl border border-[#4a2b22]/20 bg-[#fff8f0] px-4 py-3 text-sm text-[#4a2b22] file:mr-4 file:rounded-full file:border-0 file:bg-[#4a2b22] file:px-4 file:py-2 file:text-sm file:text-white"
            type="file"
            accept="image/*"
          />
        </label>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#4a2b22] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3b1e17] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? 'Subiendo...' : 'Subir imagen'}
        </button>

        {message ? <p className="text-sm text-[#8f1111]">{message}</p> : null}
      </form>

      <section className="space-y-4">
        <div className="rounded-[1.5rem] border border-[#4a2b22]/10 bg-[#fff8f0] p-6">
          <h3 className="text-lg font-semibold text-[#4a2b22]">Últimas imágenes cargadas</h3>
          <p className="mt-2 text-sm leading-6 text-[#4a2b22]/80">
            Revisa las imágenes recientes que ya se encuentran en la base de datos.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[1.5rem] border border-[#4a2b22]/10 bg-white p-6 text-sm text-[#4a2b22]/80">
            No hay imágenes cargadas todavía.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[1.5rem] border border-[#4a2b22]/10 bg-white shadow-sm">
                <img src={item.image_url} alt={item.title} className="h-52 w-full object-cover" />
                <div className="p-4">
                  <h4 className="text-base font-semibold text-[#4a2b22]">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[#4a2b22]/80">{item.description}</p>
                  {item.date ? (
                    <p className="mt-3 text-xs uppercase tracking-[0.25em] text-[#4a2b22]/50">{new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
