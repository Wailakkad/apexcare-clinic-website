import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

const fakeResponses: Record<string, string> = {
  appointment:
    "You can schedule an appointment by clicking the 'Schedule your visit' button on our page, or by calling us at +1 (555) 019-2834. We offer flexible hours to accommodate your busy schedule.",
  price:
    "Our pricing varies depending on the treatment plan. We offer competitive rates and accept most major insurance plans. Please schedule a consultation for a personalized quote.",
  hours:
    "Our clinic is open Monday through Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays.",
  location:
    "We are located at 742 Evergreen Terrace, Medical District, NY 10021. We're conveniently situated in the heart of the medical district with easy access to public transportation.",
  service:
    "We offer a comprehensive range of services including family medicine, cardiology, pediatrics, ultrasound & lab diagnostics, dental care, and online consultations. Each service is tailored to your specific needs.",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(fakeResponses)) {
    if (lower.includes(keyword)) return response;
  }
  const fallbacks = [
    "Thank you for your message. I'm your Clinic Assistant. How can I help you with appointments, services, or general inquiries today?",
    "I'd be happy to assist you. Feel free to ask about our services, clinic hours, or booking an appointment.",
    "Thanks for reaching out! Let me know if you need information about pricing, location, or any of our medical services.",
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function getTypingDuration(): number {
  return 800 + Math.random() * 400;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", sender: "ai", text: "Hello! I'm your Clinic Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 450);
    }
  }, [isOpen]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMessage: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(text);
      const aiMessage: Message = { id: (Date.now() + 1).toString(), sender: "ai", text: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, getTypingDuration());
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[150] w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#3B5BDB] to-[#1e40af] text-white flex items-center justify-center shadow-lg cursor-pointer"
        whileHover={{ scale: 1.08, boxShadow: "0 12px 32px rgba(59,91,219,0.35)" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-[150] w-[360px] h-[520px] bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-[60px] shrink-0 bg-gray-50 flex items-center justify-between px-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B5BDB] to-[#1e40af] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-apex-navy block leading-tight">Clinic Assistant</span>
                  <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-gray-300/80 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#3B5BDB] text-white rounded-[18px] rounded-br-[4px]"
                        : "bg-gray-100 text-apex-navy rounded-[18px] rounded-bl-[4px]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-[18px] rounded-bl-[4px] px-5 py-3.5 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-400 inline-block"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="h-[70px] shrink-0 border-t border-gray-100 flex items-center gap-3 px-4">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                placeholder="Type a message..."
                className="flex-1 h-[42px] bg-gray-100 rounded-full px-4 text-sm text-apex-navy outline-none border-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#3B5BDB]/30 transition-all duration-300"
              />
              <motion.button
                onClick={handleSend}
                className="w-[42px] h-[42px] rounded-full bg-[#3B5BDB] text-white flex items-center justify-center shrink-0 cursor-pointer"
                whileHover={{ y: -2, backgroundColor: "#2e4abf" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
