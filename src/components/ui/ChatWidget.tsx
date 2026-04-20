"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type LeadStage = "collecting_name" | "collecting_email" | "qualified" | "unqualified";

const SUGGESTED = [
  "What services do you offer?",
  "How much does a website cost?",
  "How fast can you build?",
  "Tell me about Convergeo",
  "View all projects",
];

const WHATSAPP_HANDOFF = encodeURIComponent(
  "Hi Kaluba, I was chatting with Speedo on vergeo.company and would like to continue our conversation with you."
);
const WHATSAPP_URL = `${SITE_CONFIG.socials.whatsapp}?text=${WHATSAPP_HANDOFF}`;

const UNSATISFIED_THRESHOLD = 4;

export function ChatWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm **Speedo**, Vergeo Group's AI assistant 👋\n\nI can help with pricing, services, project timelines and more. What's your name so I can assist you better?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [leadStage, setLeadStage] = useState<LeadStage>("collecting_name");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [exchangeCount, setExchangeCount] = useState(0);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (exchangeCount >= UNSATISFIED_THRESHOLD && !showWhatsApp) {
      setShowWhatsApp(true);
    }
  }, [exchangeCount, showWhatsApp]);

  const handleSuggestedClick = (text: string) => {
    if (text === "View all projects") {
      router.push("/projects");
      setOpen(false);
      return;
    }
    send(text);
  };

  const renderContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setExchangeCount((c) => c + 1);

    // Lead qualification: collect name first
    if (leadStage === "collecting_name") {
      const name = text.trim().split(" ")[0];
      setLeadName(name);
      setLeadStage("collecting_email");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Nice to meet you, **${name}**! 🎉\n\nTo make sure I can follow up with tailored info, what's your email address?`,
          },
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    // Collect email
    if (leadStage === "collecting_email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(text.trim())) {
        const emailOk = text.trim();
        setLeadEmail(emailOk);
        setLeadStage("qualified");
        void fetch("/api/chat/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, name: leadName, email: emailOk }),
        }).catch(() => {});
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `Perfect! I've noted your details, **${leadName}**. 📋\n\nKaluba will receive a notification about your inquiry. Now, how can I help you today?`,
            },
          ]);
          setLoading(false);
        }, 600);
        return;
      } else {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "That doesn't look like a valid email. Could you double-check and try again?",
            },
          ]);
          setLoading(false);
        }, 400);
        return;
      }
    }

    // Normal AI response
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId,
          leadName,
          leadEmail,
          history: messages,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, I couldn't process that. Please try again or switch to WhatsApp.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection issue — please try WhatsApp for a faster response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 group transition-all duration-300 ${open ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"}`}
        aria-label="Open Speedo chat"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full p-4 shadow-2xl">
            <MessageCircle size={24} />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        </div>
        <div className="absolute right-16 bottom-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Chat with Speedo
        </div>
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{ height: "580px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 rounded-t-3xl bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
              <Image src="/Vergeo5.png" alt="Speedo" fill className="object-cover" />
            </div>
            <div>
              <p className="text-white font-black text-sm">Speedo</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-blue-200 text-xs font-bold">Vergeo AI Assistant · Online</p>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10">
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black mr-2 mt-1 shrink-0">
                  S
                </div>
              )}
              <div
                className={`max-w-[78%] text-sm px-4 py-3 rounded-2xl leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-br-sm"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                }`}
                dangerouslySetInnerHTML={{ __html: renderContent(m.content) }}
              />
            </div>
          ))}

          {/* Suggested prompts — only on first message */}
          {messages.length === 1 && (
            <div className="space-y-1.5 pt-1 pl-9">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestedClick(s)}
                  className="block w-full text-left text-xs text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 rounded-xl px-3.5 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-bold"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* WhatsApp handoff banner */}
          {showWhatsApp && (
            <div className="mx-1 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 pl-9">
              <p className="text-xs font-black text-green-700 dark:text-green-400 mb-2">
                Want a direct answer from Kaluba?
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-green-500 text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-green-600 transition-colors"
              >
                <ExternalLink size={12} /> Continue on WhatsApp
              </a>
            </div>
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black mr-2 shrink-0">
                S
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 focus-within:border-blue-400 dark:focus-within:border-blue-600 transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
              placeholder={leadStage === "collecting_name" ? "Type your name..." : leadStage === "collecting_email" ? "Type your email..." : "Ask Speedo anything..."}
              className="flex-1 text-sm outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="w-8 h-8 bg-blue-600 disabled:bg-gray-200 dark:disabled:bg-white/10 rounded-xl flex items-center justify-center text-white disabled:text-gray-400 transition-all hover:bg-blue-700 disabled:cursor-not-allowed"
            >
              <Send size={14} />
            </button>
          </div>
          <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-2 font-medium">
            Speedo by Vergeo AI ·{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-green-500 hover:underline font-bold">
              WhatsApp instead
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
