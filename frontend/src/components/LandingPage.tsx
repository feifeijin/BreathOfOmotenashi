'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-slate-50 dark:bg-[#101d22]">
          {/* Main Content Area with Full Screen Background Image */}
          <div className="relative flex-1 flex flex-col justify-end min-h-[90vh]">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCyjIIHtCvF9vHBn8-Egza6mRE_SGwLVXqonVL6VPTauikVrIU-qWRJqWxouya4fMXO6NZ30y2pBYtjhbiqEd6iV-dBzTp5zAF8VCs8qlrjcvey1IoOdEMeTiVHe-JYBzmxkQyYncbWpALY63MM2tZySbyocedb1xx3u6wjL_etiStGS03W_SFGvqlcrLqtWHRjWLKLU-cb_RnARThNHfNeI8PQKezRqlGvUNU_43ig5-GTz-fa1Yrm7InQZZKk4TPHNpQ05dFEkhU")'
              }}
              data-alt="Mystical Japanese shrine in a lush forest with soft sunlight filtering through trees"
              data-location="Kyoto, Japan"
            />
            
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 mystical-gradient z-10" />
            
            {/* Top Navigation / Header (Floating) */}
            <div className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-center bg-gradient-to-b from-[#101d22]/80 to-transparent">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#13b6ec] text-3xl">temple_buddhist</span>
                <span className="text-white font-bold text-lg tracking-wide">OMOTENASHI</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                <span className="material-symbols-outlined text-white">notifications</span>
              </div>
            </div>
            
            {/* Content Container */}
            <div className="relative z-20 px-6 pb-8 pt-20 flex flex-col items-center text-center">
              {/* Glowing AI Orb Representation */}
              <div className="mb-6 relative group">
                <div className="absolute -inset-4 bg-[#13b6ec]/20 rounded-full blur-xl animate-pulse" />
                <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-[#13b6ec]/80 to-[#D4AF37]/60 flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(19,182,236,0.5)]">
                  <span className="material-symbols-outlined text-white text-3xl">smart_toy</span>
                </div>
              </div>
              
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#13b6ec] animate-pulse" />
                <span className="text-xs font-medium text-[#13b6ec] uppercase tracking-wider">AI Guide Active</span>
              </div>
              
              <h1 className="text-white text-4xl font-extrabold leading-tight mb-4 drop-shadow-lg">
                Discover Hidden <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13b6ec] to-[#D4AF37]">Japan</span>
              </h1>
              
              <p className="text-slate-300 text-base font-normal leading-relaxed mb-8 max-w-[300px]">
                Your personal AI guide to mystical shrines and unseen wonders. Experience the true spirit of Omotenashi.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={() => router.push('/explore')}
                  className="relative w-full overflow-hidden rounded-xl bg-[#13b6ec] hover:bg-[#13b6ec]/90 transition-all duration-300 group h-14 flex items-center justify-center shadow-[0_0_20px_rgba(19,182,236,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="flex items-center gap-2 text-[#101d22] font-bold text-lg tracking-wide">
                    <span className="material-symbols-outlined">explore</span>
                    Start Exploring
                  </span>
                </button>
                
                <button className="w-full rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors h-14 flex items-center justify-center backdrop-blur-md">
                  <span className="flex items-center gap-2 text-white font-medium text-base">
                    <span className="material-symbols-outlined">play_circle</span>
                    Watch Trailer
                  </span>
                </button>
              </div>
              
              {/* Featured Card (Teaser) */}
              <div className="mt-8 w-full">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Trending Near You</span>
                  <a className="text-[#13b6ec] text-xs font-medium" href="#">View All</a>
                </div>
                <div className="bg-[#16262c]/80 backdrop-blur-md border border-white/5 p-3 rounded-xl flex gap-4 items-center">
                  <div 
                    className="h-16 w-16 rounded-lg bg-cover bg-center shrink-0"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTRt58XA20u1srdACMCDZGCoHKE3gzOd3tgIFma9tcjhLtQLYqDfboexc5_4_CUbWhjFBnj9jaZe9ckUQ-4yLWs2IQ6QmWNIbmNp0guSCatx99kDkfxPfF9sfO7bBjOtAD0j-n4EjKOZTzVLOz6_WF_chUvpEHdM29iBwmjHex45DSmLOlA1Nc3o-bEYNZMpLFos-EnPb2LGeJK1OUC0uSq-1dEZAFjOzeoGqQRUIXblrjtYwCm9YpmfGcJxQaNKRLcvYLpItrXHc")'
                    }}
                    data-alt="Red Torii gates path in Fushimi Inari Taisha"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-bold text-sm">Fushimi Inari Taisha</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[#D4AF37] text-[14px]">star</span>
                      <span className="text-white/70 text-xs">4.9 (2.3k reviews)</span>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/60 text-lg">arrow_forward_ios</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Navigation Bar */}
          <div className="bg-[#0d181c] border-t border-white/5 px-6 pb-6 pt-3">
            <div className="flex justify-between items-center">
              <a className="flex flex-col items-center justify-center gap-1 min-w-[64px] group" href="#">
                <div className="text-[#13b6ec] transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-[28px]">map</span>
                </div>
                <p className="text-[#13b6ec] text-[10px] font-bold tracking-wide">Discover</p>
              </a>
              
              <a className="flex flex-col items-center justify-center gap-1 min-w-[64px] group" href="#">
                <div className="text-slate-400 group-hover:text-slate-200 transition-colors transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-[28px]">route</span>
                </div>
                <p className="text-slate-400 group-hover:text-slate-200 text-[10px] font-medium tracking-wide">My Journey</p>
              </a>
              
              <a className="flex flex-col items-center justify-center gap-1 min-w-[64px] group" href="#">
                <div className="text-slate-400 group-hover:text-slate-200 transition-colors transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-[28px]">bookmarks</span>
                </div>
                <p className="text-slate-400 group-hover:text-slate-200 text-[10px] font-medium tracking-wide">Saved</p>
              </a>
              
              <a className="flex flex-col items-center justify-center gap-1 min-w-[64px] group" href="#">
                <div className="text-slate-400 group-hover:text-slate-200 transition-colors transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-[28px]">settings</span>
                </div>
                <p className="text-slate-400 group-hover:text-slate-200 text-[10px] font-medium tracking-wide">Settings</p>
              </a>
            </div>
          </div>
        </div>
    </>
  );
}
