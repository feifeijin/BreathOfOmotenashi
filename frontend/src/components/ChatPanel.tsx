'use client';

import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chatStore';
import { sendChat, fetchTTS } from '@/lib/api';

export default function ChatPanel() {
  const { messages, isLoading, addMessage, setLoading } = useChatStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');

    addMessage({ role: 'user', content: userMsg });
    setLoading(true);

    try {
      const history = messages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const { reply } = await sendChat(userMsg, history);
      addMessage({ role: 'assistant', content: reply });
    } catch (e) {
      addMessage({
        role: 'assistant',
        content: '申し訳ございません。エラーが発生しました。',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTTS = async (text: string) => {
    try {
      const blob = await fetchTTS(text);
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch {
      console.error('TTS failed');
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 min-h-[480px] max-h-[60vh] overflow-y-auto">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <span className="text-5xl">🌸</span>
            <p className="text-gray-500 text-sm">
              いらっしゃいませ！<br />何かお手伝いできることはありますか？
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <span className="mr-2 mt-1 text-lg">🌸</span>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-red-500 text-white rounded-tr-sm'
                  : 'bg-gray-50 text-gray-800 rounded-tl-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.role === 'assistant' && (
                <button
                  onClick={() => handleTTS(msg.content)}
                  className="mt-2 text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  🔊 読み上げ
                </button>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <span className="mr-2 mt-1 text-lg">🌸</span>
            <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-4 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="メッセージを入力..."
          className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-200 transition"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white rounded-xl px-5 py-3 text-sm font-medium transition"
        >
          送信
        </button>
      </div>
    </div>
  );
}
