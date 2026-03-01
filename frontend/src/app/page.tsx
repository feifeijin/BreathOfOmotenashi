import ChatPanel from '@/components/ChatPanel';
import ShrineVoiceGuide from '@/components/ShrineVoiceGuide';

const SHRINES = [
  { id: 'fushimi-inari', name: '伏見稲荷大社', location: '京都', emoji: '🦊' },
  { id: 'meiji-jingu', name: '明治神宮', location: '東京', emoji: '🌿' },
  { id: 'kasuga-taisha', name: '春日大社', location: '奈良', emoji: '🦌' },
  { id: 'izumo-taisha', name: '出雲大社', location: '島根', emoji: '⛩' },
  { id: 'itsukushima', name: '厳島神社', location: '広島', emoji: '🌊' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-100">
      {/* Header */}
      <header className="border-b border-amber-900/30 bg-stone-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-3xl">⛩</span>
          <div>
            <h1 className="font-bold text-amber-100 text-xl leading-tight tracking-wide">
              Breath of Omotenashi
            </h1>
            <p className="text-xs text-stone-400">訪日外国人向けAI神社音声ガイド</p>
          </div>
        </div>
      </header>

      {/* Shrine Grid */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-sm uppercase tracking-widest text-stone-500 mb-6">
          神社を選んで、精霊の声を聞く
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHRINES.map((shrine) => (
            <div
              key={shrine.id}
              className="rounded-2xl border border-stone-700/50 bg-stone-900/60 p-5 hover:border-amber-700/50 transition-colors"
            >
              <div className="text-4xl mb-3">{shrine.emoji}</div>
              <h3 className="font-semibold text-amber-100 text-base">{shrine.name}</h3>
              <p className="text-xs text-stone-500 mb-3">{shrine.location}</p>
              <ShrineVoiceGuide shrineId={shrine.id} shrineName={shrine.name} />
            </div>
          ))}
        </div>
      </section>

      {/* Chat Panel */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-sm uppercase tracking-widest text-stone-500 mb-4">
          テキストで質問する
        </h2>
        <ChatPanel />
      </section>
    </main>
  );
}
