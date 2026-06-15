import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, HelpCircle, Sparkles, AlertCircle, RefreshCw, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
  onInitialMessageCleared?: () => void;
}

const QUICK_PROMPTS = [
  "Which course is needed for sports coaching (NROC)?",
  "Can I do Occupational First Aid without GCE Sec 2?",
  "I am pregnant. Can I take the practical CPR exam?",
  "What is BCLS+AED and who needs it?"
];

export default function AIChatAdvisor({ 
  isOpen, 
  onClose, 
  initialMessage,
  onInitialMessageCleared 
}: AIChatAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I am your official Singapore Red Cross Academy (SRCA) AI Training Advisor. Ask me anything about course requirements, syllabus guidelines, physical assessor exams, WSH safety compliance, or eligibility protocols!"
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle triggered initial message injections (e.g. from recommended cards links)
  useEffect(() => {
    if (initialMessage && isOpen) {
      sendMessageDirectly(initialMessage);
      if (onInitialMessageCleared) {
        onInitialMessageCleared(); // Reset in parent state so it doesn't trigger repeatedly
      }
    }
  }, [initialMessage, isOpen]);

  // Scroll to bottom when messages list updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessageDirectly = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    // Append user message immediately
    const userMessage: Message = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to contact advisor. Check your internet connection.");
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response
      }]);
    } catch (err: any) {
      console.error(err);
      setApiError(err?.message || "Something went wrong communicating with the AI service. Please confirm your local keys.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessageDirectly(inputText);
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I am your official Singapore Red Cross Academy (SRCA) AI Training Advisor. Ask me anything about course requirements, syllabus guidelines, physical assessor exams, WSH safety compliance, or eligibility protocols!"
      }
    ]);
    setInputText('');
    setApiError(null);
  };

  if (!isOpen) return null;

  return (
    <div id="ai-chat-advisor-drawer" className="fixed bottom-6 right-6 z-50 w-full max-w-[430px] h-[580px] bg-white border border-[#cbd5e1] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-350">
      
      {/* Header section (styled primary Singapore red gradient or color) */}
      <div className="bg-[#ed1b24] p-4 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-1">
              SRCA AI Course Advisor
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </h4>
            <p className="text-[10px] text-white/80 font-medium">Accredited advice on first aid intakes</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleResetChat}
            className="p-1.5 hover:bg-white/10 rounded-lg text-white/90 transition"
            title="Reset Advisor Chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg text-white/90 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Canvas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 relative">
        
        {/* Course advice disclaimer banner */}
        <div className="p-2.5 bg-[#fff8e8] border border-amber-200 rounded-lg text-[10px] text-amber-800 leading-normal flex gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>Our AI queries align dynamically with active National First Aid Council (NFAC) and safety assessment criteria. Please check actual schedule vacancies upon checkout.</span>
        </div>

        {messages.map((m, idx) => (
          <div key={idx} className={`flex items-start gap-2.5 ${m.role === 'user' ? 'justify-end' : ''}`}>
            
            {/* Avatar block for assistant */}
            {m.role !== 'user' && (
              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0 border border-red-200">
                <Bot className="w-4 h-4 text-[#ed1b24]" />
              </div>
            )}

            {/* Message bubble */}
            <div className={`p-3 rounded-2xl text-xs sm:text-sm max-w-[80%] leading-relaxed ${
              m.role === 'user'
                ? 'bg-[#ed1b24] text-white rounded-tr-none'
                : 'bg-white text-[#1e293b] border border-gray-100 shadow-2xs rounded-tl-none'
            }`}>
              <p className="whitespace-pre-line">{m.content}</p>
            </div>

            {/* User avatar */}
            {m.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border border-gray-300">
                <User className="w-4 h-4 text-slate-600" />
              </div>
            )}

          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-[#ed1b24]" />
            </div>
            <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-none text-xs text-gray-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-1 text-[10px]">AI Advisor consulting standards...</span>
            </div>
          </div>
        )}

        {/* API Error indicator */}
        {apiError && (
          <div className="p-3 bg-[#fff1f1] border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2 max-w-[95%]">
            <AlertCircle className="w-4 h-4 text-[#ed1b24] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Chat Advisor Error:</p>
              <p className="mt-0.5">{apiError}</p>
              <p className="mt-1 text-[10px] text-gray-500 font-medium">To fix: Be sure your local GEMINI_API_KEY secret is loaded in AI Studio Settings.</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts (horizontal marquee) */}
      <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 select-none overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => sendMessageDirectly(prompt)}
            className="inline-block py-1.5 px-3 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-full text-[10px] sm:text-xs font-semibold text-slate-600 hover:text-[#ed1b24] cursor-pointer transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Inputs tray */}
      <form onSubmit={handleFormSubmit} className="p-3 border-t border-gray-200 bg-white flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about compliance standard, GCE level, child CPR..."
          disabled={isLoading}
          className="flex-1 rounded-xl border border-[#cbd5e1] py-2.5 px-3 text-xs sm:text-sm outline-none focus:border-[#ed1b24] focus:ring-1 focus:ring-[#ed1b24] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="bg-[#ed1b24] hover:bg-[#cc121a] text-white p-2.5 rounded-xl transition duration-200 shrink-0 disabled:opacity-40 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
