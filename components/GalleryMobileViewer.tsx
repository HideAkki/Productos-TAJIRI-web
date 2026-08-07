'use client';

import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, MoreVertical } from 'lucide-react';

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  date: string;
};

type GalleryMobileViewerProps = {
  selectedItem: GalleryItem;
  currentIndex: number;
  itemsLength: number;
  isVideo: boolean;
  showUI: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onInteraction: () => void;
  zoom: number;
  setZoom: (value: number) => void;
  pan: { x: number; y: number };
  setPan: (value: { x: number; y: number }) => void;
  resetView: () => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function GalleryMobileViewer({
  selectedItem,
  currentIndex,
  itemsLength,
  isVideo,
  showUI,
  onClose,
  onNext,
  onPrev,
  onInteraction,
  zoom,
  setZoom,
  pan,
  setPan,
  resetView,
}: GalleryMobileViewerProps) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const lastTapRef = useRef(0);
  const touchState = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    startTime: 0,
    pinchDistance: 0,
    initialZoom: zoom,
    zoomCenter: { x: 0, y: 0 },
  });
  const prevIndexRef = useRef(currentIndex);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const slideDirection = useMemo(() => (direction === 'next' ? 1 : -1), [direction]);

  useEffect(() => {
    setDirection(currentIndex >= prevIndexRef.current ? 'next' : 'prev');
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  const handleTap = () => {
    onInteraction();
  };

  const handleDoubleTap = (event: TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    const touch = event.touches[0];
    const rect = viewerRef.current?.getBoundingClientRect();
    if (!rect || !touch) return;

    const tapX = touch.clientX - rect.left - rect.width / 2;
    const tapY = touch.clientY - rect.top - rect.height / 2;

    if (now - lastTapRef.current < 300) {
      if (zoom > 1) {
        resetView();
      } else {
        setZoom(2);
        setPan({ x: -tapX, y: -tapY });
      }
    }
    lastTapRef.current = now;
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    onInteraction();
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      touchState.current.startX = touch.clientX;
      touchState.current.startY = touch.clientY;
      touchState.current.lastX = touch.clientX;
      touchState.current.lastY = touch.clientY;
      touchState.current.startTime = Date.now();
      touchState.current.initialZoom = zoom;
    }

    if (event.touches.length === 2) {
      const first = event.touches.item(0);
      const second = event.touches.item(1);
      if (!first || !second) return;
      const dx = first.clientX - second.clientX;
      const dy = first.clientY - second.clientY;
      touchState.current.pinchDistance = Math.hypot(dx, dy);
      touchState.current.initialZoom = zoom;
      touchState.current.zoomCenter = {
        x: (first.clientX + second.clientX) / 2,
        y: (first.clientY + second.clientY) / 2,
      };
    }
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!viewerRef.current) return;
    if (event.touches.length === 2) {
      event.preventDefault();
      const first = event.touches.item(0);
      const second = event.touches.item(1);
      if (!first || !second) return;
      const dx = first.clientX - second.clientX;
      const dy = first.clientY - second.clientY;
      const distance = Math.hypot(dx, dy);
      const ratio = distance / touchState.current.pinchDistance || 1;
      setZoom(clamp(touchState.current.initialZoom * ratio, 1, 3));
      return;
    }

    if (event.touches.length === 1 && zoom > 1) {
      event.preventDefault();
      const touch = event.touches[0];
      const deltaX = touch.clientX - touchState.current.lastX;
      const deltaY = touch.clientY - touchState.current.lastY;
      touchState.current.lastX = touch.clientX;
      touchState.current.lastY = touch.clientY;
      setPan({ x: pan.x + deltaX, y: pan.y + deltaY });
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length > 0) return;

    const deltaX = touchState.current.lastX - touchState.current.startX;
    const deltaY = touchState.current.lastY - touchState.current.startY;
    const elapsed = Date.now() - touchState.current.startTime;
    const isSwipe = Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) && elapsed < 300;

    if (isSwipe && zoom <= 1) {
      if (deltaX < 0) {
        onNext();
      } else {
        onPrev();
      }
      return;
    }

    const isTap = Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && elapsed < 250;
    const touch = event.changedTouches[0];
    const rect = viewerRef.current?.getBoundingClientRect();

    if (isTap && touch && rect) {
      const now = Date.now();
      const isDoubleTap = now - lastTapRef.current < 300;
      lastTapRef.current = now;

      if (isDoubleTap) {
        const tapX = touch.clientX - rect.left - rect.width / 2;
        const tapY = touch.clientY - rect.top - rect.height / 2;
        if (zoom > 1) {
          resetView();
        } else {
          setZoom(2);
          setPan({ x: -tapX, y: -tapY });
        }
        return;
      }

      if (!showUI) {
        onInteraction();
        return;
      }

      const touchXRatio = (touch.clientX - rect.left) / rect.width;
      if (touchXRatio < 0.2) {
        onPrev();
        return;
      }
      if (touchXRatio > 0.8) {
        onNext();
        return;
      }
      onInteraction();
    }
  };

  const titleLabel = selectedItem.title || 'Imagen';
  const infoLabel = selectedItem.date ? new Date(selectedItem.date).toLocaleDateString('es-ES', { year: 'numeric' }) : '2025';

  return (
    <AnimatePresence>
      <motion.div
        ref={viewerRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleTap}
      >
        <div className="absolute inset-0 bg-black" />

        <div className="pointer-events-none absolute inset-0 bg-black/20" />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <motion.div
            className="relative flex h-full w-full items-center justify-center"
            initial={{ x: slideDirection * 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -slideDirection * 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {selectedItem.image_url ? (
              isVideo ? (
                <video
                  src={selectedItem.image_url}
                  controls
                  controlsList="nodownload"
                  className="h-full w-full max-w-full object-contain"
                />
              ) : (
                <motion.img
                  key={selectedItem.id}
                  src={selectedItem.image_url}
                  alt={selectedItem.title}
                  className="max-h-full max-w-full object-contain"
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                    transition: 'transform 0.16s ease-out',
                  }}
                  draggable={false}
                />
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.35em] text-white/80">
                Imagen no disponible
              </div>
            )}
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-[max(env(safe-area-inset-left),16px)] pt-[max(env(safe-area-inset-top),16px)]">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="pointer-events-auto flex items-center justify-center rounded-full bg-black/40 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-xl">
            <span>{String(currentIndex + 1).padStart(2, '0')} / {String(itemsLength).padStart(2, '0')}</span>
          </div>
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15"
            aria-label="Opciones"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-[max(env(safe-area-inset-left),16px)] pb-[max(env(safe-area-inset-bottom),16px)]">
          <div className="mx-auto w-full max-w-[90%] rounded-[24px] bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-center text-[10px] uppercase tracking-[0.35em] text-white/70 backdrop-blur-xl">
            <span>{titleLabel}</span>
            <span className="mx-2 inline-block h-1 w-1 rounded-full bg-white/40" />
            <span>Productos TAJIRI</span>
            <span className="mx-2 inline-block h-1 w-1 rounded-full bg-white/40" />
            <span>{infoLabel}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            if (!showUI) {
              onInteraction();
            }
            if (zoom <= 1) return;
            resetView();
          }}
          className="pointer-events-auto absolute inset-x-0 bottom-24 z-20 mx-auto hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl text-sm transition hover:bg-white/15 sm:flex"
          aria-label="Restablecer zoom"
        >
          {zoom > 1 ? 'x' : '+'}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
