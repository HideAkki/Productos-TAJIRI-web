'use client';

import { useEffect, useRef, useState } from 'react';

const selectFemaleVoice = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((voice) =>
    /female|woman|mujer|femenina|sofia|sara|luz|clara|helena|mariana/i.test(
      `${voice.name} ${voice.voiceURI} ${voice.lang}`
    )
  );

  return preferred || voices.find((voice) => /es(-|_)?.*/i.test(voice.lang)) || voices[0] || null;
};

const splitIntoSpeechChunks = (text: string) => {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return [];

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const chunks: string[] = [];

  sentences.forEach((sentence) => {
    const words = sentence.split(' ');
    let current = '';

    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length <= 140) {
        current = candidate;
        return;
      }

      if (current) {
        chunks.push(current);
      }
      current = word;
    });

    if (current) {
      chunks.push(current);
    }
  });

  return chunks.filter(Boolean);
};

export default function VoiceReader() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceName, setVoiceName] = useState<string | null>(null);
  const queueRef = useRef<string[]>([]);
  const pauseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const handleVoicesChanged = () => {
      const voice = selectFemaleVoice();
      setVoiceName(voice?.name || null);
    };

    handleVoicesChanged();
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      if (pauseTimerRef.current) {
        window.clearTimeout(pauseTimerRef.current);
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakNextChunk = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const nextChunk = queueRef.current.shift();
    if (!nextChunk) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(nextChunk);
    utterance.lang = 'es-ES';
    utterance.rate = 1;

    const voice = selectFemaleVoice();
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      if (queueRef.current.length > 0) {
        if (pauseTimerRef.current) {
          window.clearTimeout(pauseTimerRef.current);
        }
        pauseTimerRef.current = window.setTimeout(() => {
          speakNextChunk();
        }, 450);
      } else {
        setIsSpeaking(false);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const speakPage = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const contentElement = document.querySelector('main');
    const text = contentElement?.innerText?.trim() || contentElement?.textContent?.trim() || '';
    if (!text) return;

    window.speechSynthesis.cancel();
    if (pauseTimerRef.current) {
      window.clearTimeout(pauseTimerRef.current);
    }

    const chunks = splitIntoSpeechChunks(text);
    if (!chunks.length) return;

    queueRef.current = chunks;
    speakNextChunk();
  };

  const stopSpeaking = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (pauseTimerRef.current) {
      window.clearTimeout(pauseTimerRef.current);
    }
    queueRef.current = [];
    setIsSpeaking(false);
  };

  return (
    <div className="sticky top-[72px] z-40 border-b border-[#4a2b22]/10 bg-[#fff8f0]/95 px-6 py-3 shadow-sm backdrop-blur-sm sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[#4a2b22]/80">
          {isSpeaking ? 'Reproduciendo audio...' : 'Texto a voz disponible'}
          {voiceName ? ` · Voz: ${voiceName}` : ''}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={speakPage}
            className="rounded-full bg-[#4a2b22] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4a2b22]/10 transition hover:bg-[#6a3b2f]"
          >
            Leer página
          </button>
          <button
            type="button"
            onClick={stopSpeaking}
            className="rounded-full border border-[#4a2b22] px-4 py-2 text-sm font-semibold text-[#4a2b22] transition hover:bg-[#f3e6d9]"
          >
            Detener
          </button>
        </div>
      </div>
    </div>
  );
}
