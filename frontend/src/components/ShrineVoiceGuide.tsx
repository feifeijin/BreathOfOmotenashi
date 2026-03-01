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

      {status === 'connecting' && (
        <div className="flex items-center gap-2 text-sm py-2" style={{ color: "#4a7080" }}>
          <span className="material-symbols-outlined animate-pulse" style={{ fontSize: 18, color: "#00c8ff" }}>mic</span>
          <span>接続中...</span>
        </div>
      )}

      {status === 'active' && (
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

      {status === 'stopping' && (
        <div className="text-sm py-2" style={{ color: "#4a7080" }}>終了中...</div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
