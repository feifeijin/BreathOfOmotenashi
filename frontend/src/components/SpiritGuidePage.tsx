'use client';

import { useState } from 'react';

export default function SpiritGuidePage() {
  const [isListening, setIsListening] = useState(true);
  const [userQuery, setUserQuery] = useState('Who is worshipped here?');
  const [aiResponse, setAiResponse] = useState('This shrine is dedicated to Inari, the deity of rice and prosperity.');

  return (
    <html className="dark" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Breath of Omotenashi - Spirit Guide</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          body {
            min-height: max(884px, 100dvh);
          }
          .spirit-orb {
            background: radial-gradient(circle, rgba(19,182,236,0.8) 0%, rgba(19,182,236,0.2) 60%, transparent 80%);
            box-shadow: 0 0 60px rgba(19,182,236,0.4), inset 0 0 20px rgba(255,255,255,0.5);
          }
          .spirit-pulse {
            animation: pulse-glow 3s infinite ease-in-out;
          }
          @keyframes pulse-glow {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 80px rgba(19,182,236,0.6); }
            100% { transform: scale(0.95); opacity: 0.8; }
          }
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out;
          }
        `}</style>
      </head>
      <body className="bg-[#f6f8f8] dark:bg-[#101d22] font-sans text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-hidden relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD2bwdgFf7T_UsCGyArJ6nquHeIhaX6WQxA8-LzrxR4qqyNFmjib3MXMt4XPTeS6KWikl0xMGSV0Xqq58g0QGv9S0q8CUTV3HRVoIsOhw2hDkKMgMC9QgBczpwMjQizOPXRyO-W-85KhYNLEY4Unk2Pe2BIEMDaodIBiy5Gd8vK-I7GUTyBtifWoLI2_IuRWx369Yb1Oo-V3pQTk5iI_SDnJejQ9YlaQ8yt4r1CanEFONVNwdHhD5MplzFEv7Uy4ax-eXZXngfkRyE")',
            filter: 'blur(2px)'
          }}
        />
        
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#101d22]/80 via-[#101d22]/90 to-[#101d22]/95" />
        
        {/* Header */}
        <header className="relative z-10 flex items-center justify-between p-4 pt-6">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Spirit Guide</h2>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Live</span>
            </div>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">more_vert</span>
          </button>
        </header>
        
        {/* Main Content Area */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20 w-full max-w-md mx-auto">
          {/* Spirit Orb Visualizer */}
          <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
            {/* Outer rings */}
            <div className="absolute inset-0 rounded-full border border-[#13b6ec]/20 scale-125 opacity-30" />
            <div className="absolute inset-0 rounded-full border border-[#13b6ec]/10 scale-150 opacity-20" />
            
            {/* Core Orb */}
            <div className="w-48 h-48 rounded-full spirit-orb spirit-pulse relative z-10 backdrop-blur-sm border border-[#13b6ec]/30 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-50 mix-blend-overlay" />
            </div>
            
            {/* Particles (Simulated) */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#13b6ec] rounded-full opacity-60 animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-0 w-1 h-1 bg-[#13b6ec]/80 rounded-full opacity-50" />
          </div>
          
          {/* Conversation Text */}
          <div className="w-full space-y-6 text-center">
            {/* AI Response */}
            <div className="animate-fade-in-up">
              <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight drop-shadow-lg">
                "{aiResponse}"
              </h1>
            </div>
            
            {/* User Query (Transcribed) */}
            <div className="opacity-70 transform transition-all duration-300">
              <p className="text-slate-300 text-lg font-medium italic">
                "{userQuery}"
              </p>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="mt-12 flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex gap-1 h-4 items-center">
              <div className="w-1 h-2 bg-[#13b6ec] rounded-full animate-pulse" />
              <div className="w-1 h-4 bg-[#13b6ec] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-2 bg-[#13b6ec] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-[#13b6ec] text-sm font-semibold tracking-wide">
              {isListening ? 'Listening...' : 'Processing...'}
            </p>
          </div>
        </main>
        
        {/* Controls / Action Area */}
        <div className="relative z-10 w-full px-6 pb-6 pt-2">
          <div className="flex items-center justify-center gap-6">
            <button className="w-14 h-14 rounded-full bg-slate-800/80 text-slate-300 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all backdrop-blur-md border border-white/5">
              <span className="material-symbols-outlined text-2xl">keyboard</span>
            </button>
            <button 
              className="w-20 h-20 rounded-full bg-[#13b6ec] text-[#101d22] flex items-center justify-center shadow-[0_0_30px_rgba(19,182,236,0.3)] hover:scale-105 transition-transform hover:shadow-[0_0_40px_rgba(19,182,236,0.5)]"
              onClick={() => setIsListening(!isListening)}
            >
              <span className="material-symbols-outlined text-4xl">
                {isListening ? 'mic' : 'mic_off'}
              </span>
            </button>
            <button className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 hover:text-red-300 transition-all backdrop-blur-md border border-red-500/10">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <nav className="relative z-20 flex gap-2 border-t border-[#233f48] bg-[#192d33]/90 backdrop-blur-xl px-4 pb-6 pt-3">
          <a className="flex flex-1 flex-col items-center justify-end gap-1 text-[#92bbc9] hover:text-[#13b6ec] transition-colors group" href="#">
            <div className="group-hover:text-[#13b6ec] transition-colors flex h-8 items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">explore</span>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">Explore</p>
          </a>
          <a className="flex flex-1 flex-col items-center justify-end gap-1 text-[#13b6ec]" href="#">
            <div className="flex h-8 items-center justify-center relative">
              <div className="absolute inset-0 bg-[#13b6ec]/20 rounded-full blur-md" />
              <span className="material-symbols-outlined text-[24px] fill-current">auto_awesome</span>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">Guide</p>
          </a>
          <a className="flex flex-1 flex-col items-center justify-end gap-1 text-[#92bbc9] hover:text-[#13b6ec] transition-colors group" href="#">
            <div className="group-hover:text-[#13b6ec] transition-colors flex h-8 items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">map</span>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">Map</p>
          </a>
          <a className="flex flex-1 flex-col items-center justify-end gap-1 text-[#92bbc9] hover:text-[#13b6ec] transition-colors group" href="#">
            <div className="group-hover:text-[#13b6ec] transition-colors flex h-8 items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">person</span>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">Profile</p>
          </a>
        </nav>
      </body>
    </html>
  );
}
