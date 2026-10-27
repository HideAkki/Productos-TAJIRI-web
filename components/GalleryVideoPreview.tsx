'use client';
/* Las portadas se obtienen directamente del mismo CDN público que los vídeos. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { Play, Video } from 'lucide-react';
import { getVideoPosterUrl } from '@/lib/gallery-media';

export default function GalleryVideoPreview({ src }: { src: string }) {
  const poster = getVideoPosterUrl(src);
  const [posterFailed, setPosterFailed] = useState(false);
  const [frameAvailable, setFrameAvailable] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // También detectar errores que ocurrieron antes de hidratar los eventos.
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) setPosterFailed(true);
  }, [poster]);
  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#f3d48a]/30 to-[#4a2b22]/10 text-[#4a2b22]" aria-hidden="true">
        <Video className="h-10 w-10" />
        <span className="text-sm font-medium">Abrir vídeo</span>
      </div>
      {poster && !posterFailed ? (
        <img ref={imageRef} src={poster} alt="" loading="lazy" decoding="async"
          className="relative h-full w-full object-contain transition duration-300 group-hover:scale-105"
          onError={() => setPosterFailed(true)} />
      ) : (
        <video src={src} preload="metadata" muted playsInline aria-hidden="true"
          onLoadedMetadata={event => {
            const video = event.currentTarget;
            if (Number.isFinite(video.duration) && video.duration > 0) video.currentTime = Math.min(0.1, video.duration / 2);
          }}
          onLoadedData={() => setFrameAvailable(true)}
          onError={() => setFrameAvailable(false)}
          className={`relative h-full w-full object-contain transition duration-300 group-hover:scale-105 ${frameAvailable ? 'opacity-100' : 'opacity-0'}`} />
      )}
      <span aria-hidden="true" className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-black/75 px-3 py-2 text-xs font-semibold text-white">
        <Play className="h-4 w-4" fill="currentColor" /> Vídeo
      </span>
    </>
  );
}
