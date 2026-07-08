import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { askEleganceAI } from "@/lib/chatbot-action";

type GeminiMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

export function FloatingButtons() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "ai" | "me"; text: string }[]>([
    {
      from: "ai",
      text: "Welcome to Dilip Furniture. I'm Elegance AI, your premium virtual assistant. How may I assist you with our luxury collections today?",
    },
  ]);
  const [history, setHistory] = useState<GeminiMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat window on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input;
    setMessages((m) => [...m, { from: "me", text }]);
    setInput("");
    setLoading(true);

    // Append user input to history
    const updatedHistory: GeminiMessage[] = [
      ...history,
      { role: "user", parts: [{ text }] }
    ];
    setHistory(updatedHistory);

    try {
      const res = await askEleganceAI({ data: { history: updatedHistory } });
      const reply = res.reply;
      
      // Update local history and UI messages
      setHistory((h) => [...h, { role: "model", parts: [{ text: reply }] }]);
      setMessages((m) => [...m, { from: "ai", text: reply }]);
    } catch (err) {
      console.error("AI chatbot error:", err);
      setMessages((m) => [
        ...m,
        { from: "ai", text: "I'm having trouble connecting to my service right now. Please reach out directly on WhatsApp!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <a
        href="https://wa.me/918595598458"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 size-14 rounded-full bg-[#25D366] grid place-items-center shadow-luxury hover:scale-105 transition"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <svg viewBox="0 0 24 24" className="size-6 text-white relative" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.668 5.481l-.999 3.648 3.82-1.028zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.148-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
      </a>

      <button
        onClick={() => setChatOpen((o) => !o)}
        aria-label="Chat"
        className="fixed bottom-6 right-24 z-40 size-14 rounded-full bg-foreground text-background grid place-items-center shadow-luxury hover:scale-105 transition"
      >
        <MessageCircle className="size-5" />
      </button>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[480px] bg-background rounded-lg shadow-luxury border border-border flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border flex items-center justify-between gradient-warm">
              <div>
                <h3 className="font-display text-lg leading-none">Dilip Concierge</h3>
                <p className="text-[11px] text-muted-foreground mt-1">Elegance AI · Online</p>
              </div>
              <button onClick={() => setChatOpen(false)}><X className="size-4" /></button>
            </div>
            
            {/* Scrollable messages container */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/35 scroll-smooth"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm break-words whitespace-pre-wrap leading-relaxed shadow-sm ${
                      m.from === "me" 
                        ? "bg-foreground text-background rounded-br-sm" 
                        : "bg-background border border-border rounded-bl-sm text-foreground/90"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-background border border-border rounded-bl-sm rounded-2xl px-4 py-2 text-xs text-muted-foreground">
                    <span className="inline-flex gap-1.5 items-center">
                      <span className="size-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                      <span className="size-1.5 bg-muted-foreground rounded-full animate-bounce delay-75"></span>
                      <span className="size-1.5 bg-muted-foreground rounded-full animate-bounce delay-150"></span>
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask Elegance AI about products or pricing..."
                className="flex-1 bg-secondary rounded-full px-4 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-ring text-foreground"
              />
              <button onClick={send} className="size-9 rounded-full bg-foreground text-background grid place-items-center hover:bg-accent hover:text-accent-foreground transition shrink-0">
                <Send className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
