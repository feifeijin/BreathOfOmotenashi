import ChatPanel from '@/components/ChatPanel';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50">
      {/* Header */}
      <header className="border-b border-red-100 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">🌸</span>
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-tight">
              Breath of Omotenashi
            </h1>
            <p className="text-xs text-gray-400">おもてなしAIアシスタント</p>
          </div>
        </div>
      </header>

      {/* Chat */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <ChatPanel />
      </div>
    </main>
  );
}
