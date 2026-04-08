"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED = [
  "What services do you offer?",
  "How much does a store cost?",
  "Join the platform waitlist",
  "How fast can you build?",
  "View all projects",
];

export function ChatWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Vergeo's assistant. I can answer questions about services, pricing, and availability — or connect you directly with Kaluba. You can also reach him at vergeo.company/contact. What can I help with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSuggestedClick = (text: string) => {
    if (text === "View all projects") {
      router.push("/projects");
      setOpen(false);
      return;
    }
    send(text);
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId,
          history: messages,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, something went wrong. Please WhatsApp me directly." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Reach me on WhatsApp: +267761359005" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all duration-200 ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        style={{ height: "520px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 rounded-t-2xl bg-blue-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
              V
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Vergeo Assistant</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <p className="text-blue-100 text-xs">Online · replies instantly</p>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] text-sm px-4 py-2.5 rounded-2xl leading-relaxed ${
                  m.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {/* Suggested questions — only show after first assistant message with no user input yet */}
          {messages.length === 1 && (
            <div className="space-y-2 pt-1">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestedClick(s)}
                  className="block w-full text-left text-xs text-blue-600 border border-blue-200 rounded-xl px-3 py-2 hover:bg-blue-50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                <Loader2 size={14} className="animate-spin text-gray-400" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-blue-400 transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
              placeholder="Ask anything..."
              className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="text-blue-600 hover:text-blue-700 disabled:opacity-30 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            Powered by Vergeo AI · <a href="https://wa.me/267761359005" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">WhatsApp instead</a>
          </p>
        </div>
      </div>
    </>
  );
}
