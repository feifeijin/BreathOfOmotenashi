'use client';

import { useState, useRef } from 'react';
import { sendChat, fetchTTS } from '@/lib/api';
import VoiceWave from '@/components/VoiceWave';

type Status = 'idle' | 'loading' | 'playing';

interface Props {
  shrineId: string;
  shrineName: string;
}

export default function ShrineVoiceGuide({ shrineId, shrineName }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function handleStart() {
    setError(null);
    setStatus('loading');

    try {
      // 1. Generate shrine introduction via chat
      const { reply } = await sendChat(
        `${shrineName}について、訪日外国人向けに日本語で簡潔に音声ガイドしてください。3〜4文で、歴史・見どころ・おすすめポイントを含めてください。`,
      );

      // 2. Convert to speech
      const audioBlob = await fetchTTS(reply);
      const audioUrl = URL.createObjectURL(audioBlob);

      // 3. Play audio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setStatus('idle');
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      audio.onerror = () => {
        setError('音声の再生に失敗しました');
        setStatus('idle');
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      await audio.play();
      setStatus('playing');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'ガイドの生成に失敗しました');
      setStatus('idle');
    }
  }

  function handleStop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setStatus('idle');
  }

  return (
    <div className="mt-3">
      {status === 'idle' && (
        <button
          onClick={handleStart}
          className="w-full py-3 px-4 rounded-xl text-sm font-medium tracking-wide transition-colors flex items-center justify-center gap-2"
          style={{
            background: "rgba(0,200,160,0.12)",
            border: "1px solid rgba(0,200,160,0.3)",
            color: "#00c8a0",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>record_voice_over</span>
          音声ガイドを開始する
        </button>
      )}

      {status === 'loading' && (
        <div className="flex items-center gap-2 text-sm py-3" style={{ color: "#4a7080" }}>
          <span className="material-symbols-outlined animate-pulse" style={{ fontSize: 18, color: "#00c8ff" }}>mic</span>
          <span>ガイドを準備中...</span>
        </div>
      )}

      {status === 'playing' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#00c8a0" }}>
            <span className="material-symbols-outlined animate-pulse" style={{ fontSize: 20 }}>mic</span>
            <span>AIガイドが話しています...</span>
            <VoiceWave active={true} />
          </div>
          <button
            onClick={handleStop}
            className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
            style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#ef4444",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>stop</span>
            ガイドを終了する
          </button>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
