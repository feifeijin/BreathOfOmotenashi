'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MapBackground from '@/components/MapBackground';
import ShrineMarker from '@/components/ShrineMarker';
import BottomTabBar from '@/components/BottomTabBar';
import MapControls from '@/components/MapControls';
import ShrineBottomSheet from '@/components/ShrineBottomSheet';

export const KYOTO_SHRINES = [
  { id: "fushimi-inari", name: "伏見稲荷大社", nameEn: "Fushimi Inari",  icon: "temple_buddhist", x: 62, y: 72 },
  { id: "arashiyama",    name: "嵐山",         nameEn: "Arashiyama",     icon: "landscape",       x: 27, y: 53 },
  { id: "kinkakuji",     name: "金閣寺",       nameEn: "Kinkaku-ji",     icon: "temple_buddhist", x: 38, y: 22 },
  { id: "kiyomizudera",  name: "清水寺",       nameEn: "Kiyomizudera",   icon: "water_drop",      x: 72, y: 35 },
  { id: "heian-jingu",   name: "平安神宮",     nameEn: "Heian Jingu",    icon: "temple_hindu",    x: 52, y: 38 },
];

export default function ExplorePage() {
  const router = useRouter();
  const [activeShrine, setActiveShrine] = useState<typeof KYOTO_SHRINES[0] | null>(null);

  return (
    <div
      className="relative mx-auto overflow-hidden"
      style={{ maxWidth: 430, height: "100dvh", background: "#0b1a2b" }}
    >
      {/* Header */}
      <div
        className="absolute top-0 z-20 w-full flex items-center justify-between"
        style={{ padding: "12px 16px" }}
      >
        <button className="text-stone-300 leading-none">
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>menu</span>
        </button>
        <span className="text-white font-semibold text-lg">Kyoto, Japan</span>
        <button
          className="flex items-center justify-center rounded-full"
          style={{
            width: 36,
            height: 36,
            background: "rgba(0,200,255,0.15)",
            color: "#00c8ff",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>filter_list</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="absolute z-20" style={{ top: 64, left: 16, right: 16 }}>
        <div
          className="flex items-center gap-2 rounded-full"
          style={{
            background: "rgba(7,16,24,0.85)",
            border: "1px solid #1a3a4a",
            padding: "10px 20px",
          }}
        >
          <span className="material-symbols-outlined" style={{ color: "#4a6070", fontSize: 18 }}>search</span>
          <input
            type="text"
            placeholder="Find hidden shrines & spirits..."
            className="bg-transparent outline-none flex-1 placeholder:text-[#4a6070]"
            style={{ fontSize: 14, color: "#c0d0e0" }}
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="absolute inset-0">
        <MapBackground />

        {/* Shrine Markers */}
        <div className="absolute inset-0">
          {KYOTO_SHRINES.map((shrine) => (
            <ShrineMarker
              key={shrine.id}
              {...shrine}
              isActive={activeShrine?.id === shrine.id}
              onClick={() => setActiveShrine(shrine)}
            />
          ))}
        </div>

        {/* User Location Dot */}
        <div
          className="absolute flex flex-col items-center"
          style={{ left: "48%", top: "62%", transform: "translate(-50%, -50%)" }}
        >
          <span style={{ fontSize: 10, color: "white", lineHeight: 1 }}>▲</span>
          <div
            className="rounded-full"
            style={{
              width: 12,
              height: 12,
              background: "white",
              boxShadow: "0 0 8px rgba(255,255,255,0.8)",
            }}
          />
        </div>

        {/* Map Controls */}
        <div className="absolute" style={{ left: 16, bottom: 112 }}>
          <MapControls />
        </div>
      </div>

      {/* FAB Mic Button */}
      <button
        className="absolute flex items-center justify-center rounded-full fab-pulse z-30"
        style={{
          right: 20,
          bottom: 96,
          width: 60,
          height: 60,
          background: "#00c8ff",
        }}
        onClick={() => router.push('/guide')}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 26, color: "white" }}>mic</span>
      </button>

      {/* Bottom Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <BottomTabBar />
      </div>

      {/* Bottom Sheet */}
      <ShrineBottomSheet shrine={activeShrine} onClose={() => setActiveShrine(null)} />
    </div>
  );
}
