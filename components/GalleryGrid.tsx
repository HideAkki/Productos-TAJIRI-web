'use client';

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Maximize2, Minimize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import GalleryMobileViewer from '@/components/GalleryMobileViewer';

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  date: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const isVideoUrl = (url?: string | null) => {
  if (!url) return false;
  const normalized = url.split('?')[0].split('#')[0].toLowerCase();
  return [
    '.mp4',
    '.webm',
    '.ogg',
    '.mov',
    '.m4v',
    '.avi',
    '.mkv',
  ].some((extension) => normalized.endsWith(extension)) || normalized.includes('/video/upload/');
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [hideInfo, setHideInfo] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const isVideo = Boolean(selectedItem && isVideoUrl(selectedItem.image_url));

  const formattedDate = useMemo(() => {
    if (!selectedItem?.date) return '';
    return new Date(selectedItem.date).toLocaleDateString('es-ES', {
      year: 'numeric',
    });
  }, [selectedItem]);

  const openItem = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
    setHideInfo(false);
    setShowUI(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const closeViewer = () => {
    setSelectedItem(null);
    setShowUI(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const goToItem = (index: number) => {
    const safeIndex = (index + items.length) % items.length;
    const nextItem = items[safeIndex];
    if (nextItem) {
      openItem(nextItem, safeIndex);
    }
  };

  const changeZoom = (delta: number) => {
    if (isVideo) return;
    setZoom((current) => clamp(current + delta, 1, 3));
  };

  const resetView = () => {
    if (isVideo) return;
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (isVideo) return;
    event.preventDefault();
    changeZoom(event.deltaY > 0 ? -0.2 : 0.2);
  };

  const handleDoubleClick = () => {
    if (isVideo) return;
    if (zoom > 1) {
      resetView();
    } else {
      setZoom(2);
      setPan({ x: 0, y: 0 });
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (zoom <= 1 || isVideo) return;
    setIsDragging(true);
    dragStartRef.current = { x: event.clientX - pan.x, y: event.clientY - pan.y };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || zoom <= 1 || isVideo) return;
    setPan({ x: event.clientX - dragStartRef.current.x, y: event.clientY - dragStartRef.current.y });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeViewer();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToItem(currentIndex + 1);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToItem(currentIndex - 1);
      }

      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        changeZoom(0.2);
      }

      if (event.key === '-') {
        event.preventDefault();
        changeZoom(-0.2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, currentIndex, items.length]);

  useEffect(() => {
    if (!selectedItem) return;
    setShowUI(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [selectedItem?.id]);

  useEffect(() => {
    if (!selectedItem || !showUI) return;
    const timer = window.setTimeout(() => setShowUI(false), 3000);
    return () => window.clearTimeout(timer);
  }, [selectedItem?.id, showUI, currentIndex, zoom, pan.x, pan.y]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const handleResize = () => setIsMobile(query.matches);
    handleResize();
    query.addEventListener('change', handleResize);
    return () => {
      query.removeEventListener('change', handleResize);
    };
  }, []);

  const viewerContent = selectedItem ? (
    isMobile ? (
      <GalleryMobileViewer
        selectedItem={selectedItem}
        currentIndex={currentIndex}
        itemsLength={items.length}
        isVideo={isVideo}
        showUI={showUI}
        onClose={closeViewer}
        onNext={() => goToItem(currentIndex + 1)}
        onPrev={() => goToItem(currentIndex - 1)}
        onInteraction={() => setShowUI(true)}
        zoom={zoom}
        setZoom={setZoom}
        pan={pan}
        setPan={setPan}
        resetView={resetView}
      />
    ) : (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onClick={closeViewer}
        onMouseMove={() => setShowUI(true)}
      >
        <motion.div
          className="relative mx-auto flex h-[92vh] w-full max-w-[96vw] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.45)] sm:h-[94vh] sm:max-w-[92vw] lg:max-w-[88vw]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 overflow-hidden">
            {selectedItem.image_url && !isVideo ? (
              <img
                src={selectedItem.image_url}
                alt={selectedItem.title}
                className="h-full w-full scale-110 object-cover blur-[38px] opacity-70"
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_35%),linear-gradient(180deg,_rgba(255,255,255,0.04)_0%,_rgba(0,0,0,0.72)_100%)]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.55)_100%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_0_60px_rgba(0,0,0,0.35)]" />
          </div>

          <div className="absolute left-3 top-4 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-xl sm:left-5 sm:px-4">
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/70">{selectedItem.title}</p>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/70">{formattedDate || '2025'}</p>
          </div>

          <div className="absolute right-3 top-4 z-30 flex items-center gap-2 sm:right-5">
            <button
              type="button"
              onClick={() => {
                setHideInfo((current) => !current);
                setShowUI(true);
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-[#c1121f]"
              aria-label={hideInfo ? 'Mostrar información' : 'Ocultar información'}
            >
              {hideInfo ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={closeViewer}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-[#c1121f]"
              aria-label="Cerrar imagen"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute left-3 top-1/2 z-20 -translate-y-1/2 sm:left-6">
            <button
              type="button"
              onClick={() => goToItem(currentIndex - 1)}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-[#c1121f] sm:h-14 sm:w-14 ${showUI ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <div className="absolute right-3 top-1/2 z-20 -translate-y-1/2 sm:right-6">
            <button
              type="button"
              onClick={() => goToItem(currentIndex + 1)}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-[#c1121f] sm:h-14 sm:w-14 ${showUI ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-16 sm:px-16 sm:py-20">
            <div
              className="flex h-full w-full items-center justify-center overflow-hidden rounded-[22px]"
              onWheel={handleWheel}
              onDoubleClick={handleDoubleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {selectedItem.image_url ? (
                isVideo ? (
                  <video
                    src={selectedItem.image_url}
                    controls
                    controlsList="nodownload"
                    className="max-h-full max-w-full rounded-[18px] object-contain shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                  />
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedItem.id}
                      src={selectedItem.image_url}
                      alt={selectedItem.title}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      className="max-h-[84vh] max-w-full rounded-[18px] object-contain shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-transform duration-300"
                      style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        cursor: zoom > 1 ? 'grab' : 'default',
                      }}
                    />
                  </AnimatePresence>
                )
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.35em] text-white/80">
                  Imagen no disponible
                </div>
              )}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 px-3 pb-3 sm:px-4 sm:pb-4">
            <div className={`transition-all duration-200 ${showUI ? 'opacity-100 translate-y-0' : 'pointer-events-none translate-y-3 opacity-0'}`}>
              <div className="rounded-[24px] border border-white/10 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6 sm:py-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/70">{formattedDate || '2025'}</p>
                    <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl">{selectedItem.title}</h2>
                    {selectedItem.description ? (
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">{selectedItem.description}</p>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2 px-3 transition-all duration-200 sm:bottom-8 ${showUI ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
            <button
              type="button"
              onClick={() => changeZoom(0.2)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-[#c1121f]"
              aria-label="Aumentar zoom"
              disabled={isVideo}
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => changeZoom(-0.2)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-[#c1121f]"
              aria-label="Disminuir zoom"
              disabled={isVideo}
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleDoubleClick}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-[#c1121f]"
              aria-label="Restablecer zoom"
              disabled={isVideo}
            >
              {zoom > 1 ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  ) : null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const isVideoItem = isVideoUrl(item.image_url);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => openItem(item, index)}
              className="group overflow-hidden rounded-[2rem] border border-[#f3d48a]/10 bg-[#f6eddf] p-0 shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition hover:shadow-[0_28px_50px_rgba(0,0,0,0.14)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f5efe7]">
                {item.image_url ? (
                  isVideoItem ? (
                    <video
                      src={item.image_url}
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.35em] text-[#4a2b22]/60">
                    Imagen no disponible
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {viewerContent}
    </>
  );
}
