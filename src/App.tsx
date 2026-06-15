import { useState } from 'react';
import { 
  Compass, 
  Layers, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  BookOpen, 
  AlertTriangle, 
  Calendar,
  ChevronRight,
  Search,
  Scale,
  X
} from 'lucide-react';

import { Course, COURSES_DATA } from './types';
import InteractiveFinder from './components/InteractiveFinder';
import ComparisonMatrix from './components/ComparisonMatrix';
import AIChatAdvisor from './components/AIChatAdvisor';

export default function App() {
  const [activeTab, setActiveTab] = useState<'recommendation' | 'compare'>('recommendation');
  
  // Highlight/Details modal drawers
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  // State to manage AI Chat widget
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInitialMsg, setChatInitialMsg] = useState<string>('');

  const selectedCourse = COURSES_DATA.find(c => c.id === selectedCourseId);

  const triggerOpenChatWithMsg = (initialMsg?: string) => {
    if (initialMsg) {
      setChatInitialMsg(initialMsg);
    }
    setIsChatOpen(true);
  };

  const clearInitialChatMsg = () => {
    setChatInitialMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between animate-fade-in" id="app-viewport">
      {/* Visual Top Decorative Red Bar */}
      <div className="h-1.5 w-full bg-[#ed1b24]" />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10 md:py-14 space-y-10">
        
        {/* Visual Header Block (Matches Screenshot exactly) */}
        <header className="text-center space-y-4 max-w-3xl mx-auto" id="app-header">
          <span className="text-[#ed1b24] text-xs md:text-sm font-extrabold tracking-widest uppercase block animate-pulse">
            OUR COURSES
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#0b1523] tracking-tight leading-none font-sans">
            Find The Right Course For You
          </h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Answer a few quick questions to get a personalized recommendation or compare courses side by side.
          </p>
        </header>

        {/* Dynamic Navigation Subtabs (Visual replica of the Screenshot design options bar) */}
        <div className="flex justify-center" id="navigation-subtabs-block">
          <div className="inline-flex py-1.5 px-2 bg-white border border-[#cbd5e1]/60 rounded-2xl shadow-2xs gap-2 md:gap-4">
            
            {/* Tab 1: Interactive Recommender */}
            <button
              onClick={() => setActiveTab('recommendation')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer border ${
                activeTab === 'recommendation'
                  ? 'border-black text-[#ed1b24] bg-white shadow-2xs'
                  : 'border-transparent text-gray-500 hover:text-[#ed1b24] hover:bg-red-50/10'
              }`}
            >
              <Search className="w-4 h-4 shrink-0 text-[#ed1b24]" />
              Get Course Recommendation
            </button>

            {/* Tab 2: Compare courses */}
            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer border ${
                activeTab === 'compare'
                  ? 'border-black text-[#ed1b24] bg-white shadow-2xs'
                  : 'border-transparent text-gray-500 hover:text-[#ed1b24] hover:bg-red-50/10'
              }`}
            >
              <Scale className="w-4 h-4 shrink-0 text-red-500" />
              Compare All 8 Courses
            </button>

          </div>
        </div>

        {/* Tab content area with template layouts */}
        <main className="transition-all duration-300">
          {activeTab === 'recommendation' && (
            <InteractiveFinder 
              onSelectCourse={(courseId) => setSelectedCourseId(courseId)}
              onOpenChat={triggerOpenChatWithMsg}
            />
          )}

          {activeTab === 'compare' && (
            <ComparisonMatrix 
              selectedCourseId={selectedCourseId}
              onSelectCourse={(courseId) => setSelectedCourseId(courseId)}
              onOpenChat={triggerOpenChatWithMsg}
            />
          )}
        </main>

        {/* Advisory Bottom Banner Row (Visual replica matching bottom bar in screenshot) */}
        <div className="bg-[#fff5f5]/30 rounded-2xl p-5 md:px-8 md:py-6 border border-[#fecaca]/70 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="p-3 bg-white text-[#ed1b24] rounded-full border border-red-100 flex items-center justify-center shadow-2xs shrink-0">
              <MessageCircle className="w-6 h-6 text-[#ed1b24]" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0b1523] text-base">Still unsure?</h4>
              <p className="text-xs text-gray-500 mt-1">Chat with our training advisors for personalised guidance, custom syllabus requests, or corporate quotes.</p>
            </div>
          </div>
          <button
            onClick={() => triggerOpenChatWithMsg("Hello! Can you help me find the best course for my career?")}
            className="px-6 py-3 bg-white border border-[#ed1b24] hover:bg-[#fff9f9] text-[#ed1b24] font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-2 group whitespace-nowrap"
          >
            Chat With Us
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

      </div>

      {/* Floating Chat Advisor button (when chat is closed) */}
      {!isChatOpen && (
        <button
          onClick={() => triggerOpenChatWithMsg()}
          id="floating-chat-trigger"
          className="fixed bottom-6 right-6 z-40 bg-[#ed1b24] hover:bg-[#cc121a] text-white p-4 rounded-full shadow-lg transition duration-300 hover:scale-105 cursor-pointer flex items-center justify-center gap-2 group"
          title="Open AI Course Advisor"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-px group-hover:max-w-xs overflow-hidden transition-all duration-300 font-bold text-[10px] tracking-wider uppercase whitespace-nowrap block">
            Ask AI Advisor
          </span>
        </button>
      )}

      {/* Sidebar AI Chat Widget */}
      <AIChatAdvisor 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialMessage={chatInitialMsg}
        onInitialMessageCleared={clearInitialChatMsg}
      />

      {/* SIDE-MODAL / DRAWER FOR DETAILED SYLLABUS SPECIFICATION */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-2xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col scale-in">
            {/* Header banner */}
            <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-[#f8fafc]">
              <div>
                <span className="inline-block py-0.5 px-2 bg-red-100 text-[#ed1b24] text-[10px] font-extrabold rounded-md uppercase tracking-wider mb-2">
                  {selectedCourse.code} Module Details
                </span>
                <h3 className="text-xl font-extrabold text-[#0b1523] tracking-tight">{selectedCourse.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedCourseId(null)}
                className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-700 transition"
                title="Close overlay"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable contents */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed text-[#555e6b]">
              
              {/* KPIs indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-red-50/20 p-4 border border-[#ffd8d8]/55 rounded-xl text-center">
                <div className="p-1">
                  <span className="block text-[10px] font-bold text-[#8a3c3f] uppercase tracking-wider mb-1">Duration</span>
                  <strong className="text-xs sm:text-sm font-extrabold text-[#ed1b24] flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedCourse.duration}
                  </strong>
                </div>
                <div className="p-1 border-t sm:border-t-0 sm:border-l border-[#ffd8d8]/50">
                  <span className="block text-[10px] font-bold text-[#8a3c3f] uppercase tracking-wider mb-1">Validity</span>
                  <strong className="text-xs sm:text-sm font-extrabold text-[#ed1b24] flex items-center justify-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedCourse.validity}
                  </strong>
                </div>
                <div className="p-1 border-t sm:border-t-0 sm:border-l border-[#ffd8d8]/50">
                  <span className="block text-[10px] font-bold text-[#8a3c3f] uppercase tracking-wider mb-1">Target Roles</span>
                  <strong className="text-[10px] font-extrabold text-[#ed1b24] truncate block px-1" title={selectedCourse.bestFor}>
                    {selectedCourse.bestFor.split(',')[0]}
                  </strong>
                </div>
                <div className="p-1 border-t sm:border-t-0 sm:border-l border-[#ffd8d8]/50">
                  <span className="block text-[10px] font-bold text-[#8a3c3f] uppercase tracking-wider mb-1">Ages</span>
                  <strong className="text-[10px] font-extrabold text-[#ed1b24] truncate block px-1">
                    {selectedCourse.ageGroups}
                  </strong>
                </div>
              </div>

              {/* Core Syllabus topics */}
              <div className="space-y-3">
                <h5 className="font-extrabold text-[#0b1523] text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#ed1b24]" />
                  Active Course Curriculum Syllabus:
                </h5>
                <ul className="space-y-2.5 pl-2">
                  {selectedCourse.curriculum.map((topic, i) => (
                    <li key={i} className="flex gap-2 items-start text-xs sm:text-sm text-gray-600 font-medium">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites and entry requirements warning */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/50 rounded-xl space-y-1.5">
                <h5 className="font-extrabold text-amber-800 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                  Entry &amp; Academic Prerequisites Check
                </h5>
                <p className="text-xs text-amber-700 leading-relaxed font-semibold">
                  Required credentials: {selectedCourse.prerequisites}
                </p>
                <p className="text-[11px] text-amber-600 leading-relaxed font-medium">
                  Note: For practical physical assessments, you will kneel beside floor manikins to simulate real rescue operations. Physical wellness exemptions can be requested.
                </p>
              </div>

              {/* Target Candidate Overview */}
              <div className="space-y-1.5 pt-2">
                <h5 className="font-extrabold text-[#0b1523] text-sm">Target Candidate Profiles:</h5>
                <p className="text-xs text-[#555e6b] leading-relaxed">
                  {selectedCourse.targetAudience} — Ideal matching course designed for {selectedCourse.bestFor}.
                </p>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="p-4 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={() => setSelectedCourseId(null)}
                className="py-2 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-lg text-xs transition text-center cursor-pointer"
              >
                Close details
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCourseId(null);
                  triggerOpenChatWithMsg(`I want to ask a question about taking ${selectedCourse.name} (${selectedCourse.code}). Can you help me check prerequisites?`);
                }}
                className="py-2 px-5 bg-[#ed1b24] hover:bg-[#cc121a] text-white font-extrabold rounded-lg text-xs transition text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Ask Advisor About Registration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corporate footer info */}
      <footer className="text-center py-6 text-[11px] text-[#88929e] bg-white border-t border-gray-100 mt-10">
        <p>© 2026 Singapore Red Cross Academy (SRCA) — Interactive Course Alignment Hub.</p>
        <p className="mt-1">All educational prerequisites and guidelines adhere to Ministry of Manpower (MOM) and National First Aid Council (NFAC).</p>
      </footer>
    </div>
  );
}
