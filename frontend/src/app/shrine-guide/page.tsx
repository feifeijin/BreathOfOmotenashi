'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ShrineBottomSheet from '@/components/ShrineBottomSheet';
import MapBackground from '@/components/MapBackground';

const DEFAULT_SHRINE = {
  id: "fushimi-inari",
  name: "伏見稲荷大社",
  nameEn: "Fushimi Inari",
  icon: "temple_buddhist",
  x: 62,
  y: 72
};

export default function ShrineGuidePage() {
  const router = useRouter();
  const [shrine] = useState(DEFAULT_SHRINE);

  return (
    <div className="relative mx-auto overflow-hidden" style={{ maxWidth: 430, height: "100dvh", background: "#0b1a2b" }}>
      {/* Background */}
      <MapBackground />
      
      {/* Header */}
      <div
        className="absolute top-0 z-20 w-full flex items-center justify-between"
        style={{ padding: "12px 16px" }}
      >
        <button 
          onClick={() => router.back()}
          className="text-stone-300 leading-none"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>arrow_back</span>
        </button>
        <span className="text-white font-semibold text-lg">Shrine Guide</span>
        <div style={{ width: 28 }} />
      </div>

      {/* Shrine Bottom Sheet */}
      <ShrineBottomSheet shrine={shrine} onClose={() => {}} />
    </div>
  );
}
