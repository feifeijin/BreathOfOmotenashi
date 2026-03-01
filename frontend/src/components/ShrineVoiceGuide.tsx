'use client';

import { useState, useRef, useEffect } from 'react';
import { getAgoraToken, startVoiceAgent, stopVoiceAgent } from '@/lib/api';
import VoiceWave from '@/components/VoiceWave';

type Status = 'idle' | 'connecting' | 'active' | 'stopping';

interface Props {
  shrineId: string;
  shrineName: string;
}

export default function ShrineVoiceGuide({ shrineId, shrineName }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef<string | null>(null);
  const clientRef = useRef<import('agora-rtc-sdk-ng').IAgoraRTCClient | null>(null);

  useEffect(() => {
    return () => {
      if (clientRef.current) {
        clientRef.current.leave().catch(() => {});
      }
    };
  }, []);

  async function handleStart() {
    setError(null);
    setStatus('connecting');

    try {
      const channel = `shrine-${shrineId}-${Date.now()}`;
      const uid = Math.floor(Math.random() * 90000) + 10000;

      // 1. Get Agora token
      const tokenData = await getAgoraToken(channel, uid);

      // 2. Start TEN Agent
      const agentData = await startVoiceAgent({ channel_name: channel, uid, shrine_id: shrineId });
      requestIdRef.current = agentData.request_id;

      // 3. Join Agora channel (lazy import for SSR safety)
      const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;
      const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      clientRef.current = client;

      client.on('user-published', async (user, mediaType) => {
        if (mediaType === 'audio') {
          await client.subscribe(user, mediaType);
          user.audioTrack?.play();
        }
      });

      await client.join(tokenData.app_id, channel, tokenData.token, uid);
      const micTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await client.publish(micTrack);

      setStatus('active');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '接続に失敗しました');
      setStatus('idle');
    }
  }

  async function handleStop() {
    setStatus('stopping');
    try {
      if (requestIdRef.current) {
        await stopVoiceAgent({ request_id: requestIdRef.current });
        requestIdRef.current = null;
      }
      if (clientRef.current) {
        await clientRef.current.leave();
        clientRef.current = null;
      }
    } catch {
      // silently ignore stop errors
    } finally {
      setStatus('idle');
    }
  }

  return (
    <div className="mt-3">
      {status === 'idle' && (
        <button
          onClick={handleStart}
          className="w-full py-2 px-4 rounded-lg bg-stone-900 hover:bg-stone-700 text-amber-100 text-sm font-medium tracking-wide transition-colors border border-amber-900/40"
        >
          ⛩ 音声ガイドを開始する
        </button>
      )}

      {status === 'connecting' && (
        <div className="flex items-center gap-2 text-stone-400 text-sm py-2">
          <span className="animate-pulse">◉</span>
          <span>接続中...</span>
        </div>
      )}

      {status === 'active' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-600 text-sm font-medium">
            <span className="animate-pulse">🎙</span>
            <span>AIガイドが話しています...</span>
            <VoiceWave active={true} />
          </div>
          <button
            onClick={handleStop}
            className="w-full py-2 px-4 rounded-lg bg-red-900/80 hover:bg-red-800 text-red-100 text-sm font-medium transition-colors border border-red-700/40"
          >
            ■ ガイドを終了する
          </button>
        </div>
      )}

      {status === 'stopping' && (
        <div className="text-stone-400 text-sm py-2">終了中...</div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
