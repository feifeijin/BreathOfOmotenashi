'use client';

import { useEffect, useRef, useState } from 'react';
import { getAgoraToken, startVoiceAgent, stopVoiceAgent } from '@/lib/api';

type Status = 'idle' | 'connecting' | 'active' | 'stopping';

export default function SpiritGuidePage() {
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

  async function handleVoiceButton() {
    setError(null);

    if (status === 'active') {
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
      } finally {
        setStatus('idle');
      }
      return;
    }

    setStatus('connecting');

    try {
      const channel = `spirit-guide-${Date.now()}`;
      const uid = Math.floor(Math.random() * 90000) + 10000;

      const tokenData = await getAgoraToken(channel, uid);
      const agentData = await startVoiceAgent({
        channel_name: channel,
        uid,
        shrine_id: 'fushimi-inari',
      });
      requestIdRef.current = agentData.request_id;

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
      setError(err instanceof Error ? err.message : 'Voice connection failed');
      setStatus('idle');
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#101d22] text-white">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-35"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD2bwdgFf7T_UsCGyArJ6nquHeIhaX6WQxA8-LzrxR4qqyNFmjib3MXMt4XPTeS6KWikl0xMGSV0Xqq58g0QGv9S0q8CUTV3HRVoIsOhw2hDkKMgMC9QgBczpwMjQizOPXRyO-W-85KhYNLEY4Unk2Pe2BIEMDaodIBiy5Gd8vK-I7GUTyBtifWoLI2_IuRWx369Yb1Oo-V3pQTk5iI_SDnJejQ9YlaQ8yt4r1CanEFONVNwdHhD5MplzFEv7Uy4ax-eXZXngfkRyE")',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#101d22]/80 via-[#101d22]/90 to-[#101d22]/95" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-6">
        <h1 className="mb-3 text-2xl font-bold tracking-tight">Spirit Guide</h1>
        <p className="mb-10 text-center text-sm text-slate-300">
          {status === 'idle' && 'Tap to start voice guide (Agora + MiniMax/TEN)'}
          {status === 'connecting' && 'Connecting voice session...'}
          {status === 'active' && 'Voice guide is live'}
          {status === 'stopping' && 'Stopping voice session...'}
        </p>

        <button
          onClick={handleVoiceButton}
          disabled={status === 'connecting' || status === 'stopping'}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-[#13b6ec] text-[#101d22] shadow-[0_0_36px_rgba(19,182,236,0.45)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={status === 'active' ? 'Stop voice guide' : 'Start voice guide'}
        >
          <span className="material-symbols-outlined text-5xl">
            {status === 'active' ? 'mic_off' : 'mic'}
          </span>
        </button>

        {error && <p className="mt-6 text-center text-sm text-red-300">{error}</p>}
      </section>
    </main>
  );
}
