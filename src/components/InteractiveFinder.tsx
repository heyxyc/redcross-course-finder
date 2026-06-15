import React, { useState } from 'react';
import { Course, COURSES_DATA } from '../types';
import { 
  Clock, 
  Calendar, 
  Check, 
  BookOpen, 
  Heart,
  FileText,
  Users,
  AlertCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface InteractiveFinderProps {
  onSelectCourse: (courseId: string) => void;
  onOpenChat: (initialMessage?: string) => void;
}

export default function InteractiveFinder({ onSelectCourse, onOpenChat }: InteractiveFinderProps) {
  // Assessment Form State
  const [whoIsThisFor, setWhoIsThisFor] = useState<'individual' | 'group'>('individual');
  const [goal, setGoal] = useState<string>('');
  const [audience, setAudience] = useState<string>('');
  const [groupSize, setGroupSize] = useState<string>('');
  const [hasRunMatch, setHasRunMatch] = useState<boolean>(false);

  // We have 3 standard flagship courses shown in the visual card row:
  // 1. Basic Cardiac Life Support + AED Provider Course (TGS-2022015359)
  // 2. Standard First Aid with AED (TGS-2021010208)
  // 3. Basic First Aid + AED (CERT First Aider with CPR+AED) TGS-2022015644
  const sfaCourse = COURSES_DATA.find(c => c.id === 'sfa');
  const bfaCourse = COURSES_DATA.find(c => c.id === 'bfa');
  const bclsCourse = COURSES_DATA.find(c => c.id === 'bcls');

  const mainCourses = [
    {
      id: 'bcls',
      code: 'Basic Cardiac Life Support + AED Provider Course (TGS-2022015359)',
      subtitle: bclsCourse?.subtitle || 'BCLS & AED Certification',
      desc: 'Duties of BCLS provider, Adult & infant CPR, AED usage, conscious & unconscious choking relief for adult & infant.',
      image: bclsCourse?.image || 'https://redcross.sg/images/srca/ad%20landing%20page%20media/2_bcls.png',
      icon: <Heart className="w-5 h-5 text-[#ed1b24]" />,
      bestFor: 'Dentists, clinic nurses, general medical staff, and care roles requiring clinical CPR competency',
      learn: 'Adult & Infant CPR, AED safety, FBAO choking sequences, ventilation logs',
      validity: bclsCourse?.validity || '2 Years',
      duration: bclsCourse?.duration || '9 Hours',
      practical: 'Kneeling mannequin resuscitation assessment',
      certification: 'Yes (Accredited pass-card)',
      fee: bclsCourse?.fullFee || '$140.00'
    },
    {
      id: 'sfa',
      code: 'Standard First Aid with AED (TGS-2021010208)',
      subtitle: sfaCourse?.subtitle || 'SFA Certification',
      desc: 'Learn essentials of first aid, unconscious casualty management, respiratory emergencies, bleeding control, burns, and fractures under National guidelines.',
      image: sfaCourse?.image || 'https://redcross.sg/images/srca/ad%20landing%20page%20media/3_sfa.png',
      icon: <FileText className="w-5 h-5 text-[#ed1b24]" />,
      bestFor: 'Coaches, teachers, sports instructors, physical trainers who require NROC SFA points',
      learn: 'Wound dressings, burns, bone splints, EpiPen, heat stroke recovery',
      validity: sfaCourse?.validity || '2 Years (SRFAC Registry)',
      duration: sfaCourse?.duration || '16 Hours (2 Days)',
      practical: 'Improvised wound wrapping, CPR & AED cycles',
      certification: 'Yes (NROC-approved card)',
      fee: sfaCourse?.fullFee || '$185.00'
    },
    {
      id: 'bfa',
      code: 'Basic First Aid + AED TGS-2022015644',
      subtitle: '(CERT First Aider with CPR+AED)',
      desc: 'Provides core competencies for CERT first-responders: managing bleeding, fractures, sprains, fainting, choking, and performing fast CPR+AED.',
      image: bfaCourse?.image || 'https://redcross.sg/images/srca/ad%20landing%20page%20media/cert_first.png',
      icon: <Users className="w-5 h-5 text-[#ed1b24]" />,
      bestFor: 'Workplaces, company CERT teams, safety personnel, and families seeking front-line lifesaver skills',
      learn: 'CPR+AED, wound dressings, trauma management, improvised carrying',
      validity: bfaCourse?.validity || '2 Years (Accredited)',
      duration: bfaCourse?.duration || '8 Hours',
      practical: 'Practical CPR+AED and basic injury management',
      certification: 'Yes (Accredited pass-card)',
      fee: bfaCourse?.fullFee || '$220.00'
    }
  ];

  // Helper matching states
  const [matchedId, setMatchedId] = useState<string | null>(null);
  const [specialMatchId, setSpecialMatchId] = useState<string | null>(null);

  const handleGetRecommendation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setHasRunMatch(true);

    // Filter matching logic based on selected dropdown goals
    if (goal === 'pet') {
      setMatchedId(null);
      setSpecialMatchId('cdbfaw'); // Cats and Dogs Basic First Aid
    } else if (goal === 'compliance' || audience === 'workplace') {
      if (whoIsThisFor === 'group') {
        setMatchedId(null);
        setSpecialMatchId('ofac'); // Occupational First Aid Course
      } else {
        setMatchedId('sfa'); // Standard First Aid
        setSpecialMatchId(null);
      }
    } else if (goal === 'pediatric' || audience === 'educator') {
      setMatchedId(null);
      setSpecialMatchId('cfa'); // Child First Aid is now a specialized display
    } else if (goal === 'cardiac' || audience === 'nurse') {
      setMatchedId('bcls'); // Basic Cardiac Life Support is flagship
      setSpecialMatchId(null);
    } else if (goal === 'basic') {
      setMatchedId('bfa'); // Basic First Aid + AED is flagship
      setSpecialMatchId(null);
    } else if (goal === 'sports' || audience === 'coach') {
      setMatchedId('sfa'); // Standard First Aid
      setSpecialMatchId(null);
    } else if (goal === 'public' || audience === 'general') {
      setMatchedId('bcls'); // BCLS + AED is excellent flagship option for CPR/AED
      setSpecialMatchId(null);
    } else {
      // Default standard fallback
      setMatchedId('sfa');
      setSpecialMatchId(null);
    }
  };

  const handleResetQuiz = () => {
    setWhoIsThisFor('individual');
    setGoal('');
    setAudience('');
    setGroupSize('');
    setMatchedId(null);
    setSpecialMatchId(null);
    setHasRunMatch(false);
  };

  // Find dynamic special course if applicable
  const specialCourse = specialMatchId ? COURSES_DATA.find(c => c.id === specialMatchId) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in" id="interactive-finder-grid">
      
      {/* 1. Questionnaire Control Panel (Left Pane) */}
      <div id="quiz-control" className="lg:col-span-4 bg-white border border-[#cbd5e1]/50 rounded-2xl p-6 md:p-8 shadow-xs">
        
        {/* Progress Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-red-50 text-[#ed1b24] rounded-full flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 fill-[#ed1b24] text-[#ed1b24]" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg text-[#0b1523] tracking-tight leading-tight">
              Not sure which course fits?
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Answer a few quick questions and we&apos;ll recommend the most suitable course.
            </p>
          </div>
        </div>

        <form onSubmit={handleGetRecommendation} className="space-y-6">
          
          {/* Question 1: Who is this for? */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">
              WHO IS THIS FOR?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setWhoIsThisFor('individual');
                  if (hasRunMatch) setTimeout(() => handleGetRecommendation(), 10);
                }}
                className={`py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border ${
                  whoIsThisFor === 'individual'
                    ? 'border-[#ed1b24] bg-[#fff5f5]/60 text-[#ed1b24] shadow-xs ring-1 ring-[#ed1b24]'
                    : 'border-[#cbd5e1] bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                I&apos;m an individual
              </button>
              <button
                type="button"
                onClick={() => {
                  setWhoIsThisFor('group');
                  if (hasRunMatch) setTimeout(() => handleGetRecommendation(), 10);
                }}
                className={`py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border ${
                  whoIsThisFor === 'group'
                    ? 'border-[#ed1b24] bg-[#fff5f5]/60 text-[#ed1b24] shadow-xs ring-1 ring-[#ed1b24]'
                    : 'border-[#cbd5e1] bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Group / Organisation
              </button>
            </div>
          </div>

          {/* Question 2: What best describes your needs? */}
          <div>
            <label htmlFor="goal-select" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
              WHAT BEST DESCRIBES YOUR NEEDS?
            </label>
            <select
              id="goal-select"
              value={goal}
              onChange={(e) => {
                setGoal(e.target.value);
                setHasRunMatch(true);
              }}
              className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-3 text-xs text-[#0b1523] font-semibold focus:border-[#ed1b24] focus:ring-1 focus:ring-[#ed1b24] outline-none"
              required
            >
              <option value="">Select your needs</option>
              <option value="cardiac">I want to learn CPR and use an AED</option>
              <option value="compliance">I need workplace first aid certification</option>
              <option value="pediatric">I work with children or infants</option>
              <option value="sports">I coach sports or lead outdoor activities</option>
              <option value="basic">I want to be prepared for emergencies at home</option>
              <option value="pet">I care for pets and want emergency response skills</option>
            </select>
          </div>

          {/* Question 3: Who is the training for? */}
          <div>
            <label htmlFor="audience-select" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
              WHO WILL THE TRAINING BE FOR?
            </label>
            <select
              id="audience-select"
              value={audience}
              onChange={(e) => {
                setAudience(e.target.value);
                setHasRunMatch(true);
              }}
              className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-3 text-xs text-[#0b1523] font-semibold focus:border-[#ed1b24] focus:ring-1 focus:ring-[#ed1b24] outline-none"
            >
              <option value="">Select the audience</option>
              <option value="workplace">Company CERT, Industrial Workers, Safety managers</option>
              <option value="educator">Infant caregivers, preschool educators, teachers</option>
              <option value="coach">Fitness trainers, sports coaches, NROC guides</option>
              <option value="nurse">Clinical dentists, nurses, ambulance operators</option>
              <option value="general">Mothers, household guardians, general public</option>
              <option value="pet-owners">Pet parents, dog groomers, animal rescuers</option>
            </select>
          </div>

          {/* Question 4: How many participants? */}
          <div>
            <label htmlFor="group-size-select" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
              HOW MANY PARTICIPANTS?
            </label>
            <select
              id="group-size-select"
              value={groupSize}
              onChange={(e) => {
                setGroupSize(e.target.value);
                setHasRunMatch(true);
              }}
              className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-3 text-xs text-[#0b1523] font-semibold focus:border-[#ed1b24] focus:ring-1 focus:ring-[#ed1b24] outline-none"
            >
              <option value="">Select group size</option>
              <option value="1">1 Person (Individual intake)</option>
              <option value="1-4">2 to 4 candidates (Public batches)</option>
              <option value="5-9">5 to 9 candidates (Corporate cohort)</option>
              <option value="10+">10 or more (Custom private academy run)</option>
            </select>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={handleGetRecommendation}
              className="flex-1 py-3 px-4 bg-[#ed1b24] hover:bg-[#cc121a] text-white font-extrabold rounded-xl text-xs transition duration-150 cursor-pointer text-center"
            >
              Recommend Course
            </button>
            {hasRunMatch && (
              <button
                type="button"
                onClick={handleResetQuiz}
                title="Reset Quiz"
                className="p-3 bg-slate-100 hover:bg-slate-200 text-gray-600 rounded-xl transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Dynamic bottom advisor info */}
        <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
          <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">
            * All Singapore Red Cross Academy certificates strictly carry SRFAC (Singapore Resuscitation and First Aid Council) accreditation & conform to national guidelines.
          </p>
        </div>
      </div>

      {/* 2. Interactive Matrix Spec Visual Block (Right Pane - Matches Screenshot perfectly!) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Extra Alert Callout: If a special match occurred outside of the main 3 courses */}
        {hasRunMatch && specialCourse && (
          <div className="bg-[#fffefe] border border-red-200/80 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in duration-200 shadow-2xs">
            <div className="space-y-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black bg-[#ed1b24] text-white tracking-widest uppercase">
                INTELLIGENT DYNAMIC MATCH
              </span>
              <h4 className="text-base font-extrabold text-[#0b1523] tracking-tight">
                Recommended Match: {specialCourse.name} ({specialCourse.code})
              </h4>
              <p className="text-xs text-[#555e6b] font-medium leading-tight">
                Our database located a specialized training course uniquely matching your learning path requirements.
              </p>
            </div>
            <button
              onClick={() => onSelectCourse(specialCourse.id)}
              className="py-2.5 px-4 bg-[#ed1b24] text-white text-xs font-bold rounded-lg hover:bg-red-700 transition shrink-0 cursor-pointer"
            >
              See Syllabus & Details →
            </button>
          </div>
        )}

        {/* Dynamic Banner Indicator */}
        {hasRunMatch && matchedId && (
          <div className="bg-emerald-50 border border-emerald-200/80 text-emerald-800 rounded-2xl p-4 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-1">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Your profile selection perfectly matches the <strong>{mainCourses.find(c => c.id === matchedId)?.code}</strong> segment highlighted below!
            </span>
          </div>
        )}

        {/* Unified Course Specification matrix - guarantees cards and writeups perfectly line up */}
        <div className="bg-white border border-[#cbd5e1]/50 rounded-2xl overflow-hidden shadow-2xs">
          
          <div className="p-6 border-b border-gray-100 bg-slate-50/40">
            <h4 className="font-extrabold text-[#0b1523] text-base leading-tight">
              Popular Course Choice Comparison
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              Select any course card header below to inspect full curriculum or entry rules.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs sm:text-sm min-w-[760px] table-fixed">
              <thead>
                <tr className="bg-slate-50/50">
                  {/* Left Label Column */}
                  <th className="p-4 w-44 font-bold text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider align-middle">
                    Course Spec
                  </th>

                  {/* Flagship courses mapping column headers with real aligned cards */}
                  {mainCourses.map((c) => {
                    const isMatchedIdx = hasRunMatch && matchedId === c.id;

                    return (
                      <th 
                        key={c.id}
                        onClick={() => onSelectCourse(c.id)}
                        className={`p-4 border-l border-[#cbd5e1]/40 align-top transition-all duration-300 relative cursor-pointer group ${
                          isMatchedIdx 
                            ? 'bg-[#ed1b24]/5' 
                            : 'hover:bg-slate-50/30'
                        }`}
                      >
                        {/* Perfect Alignment Container */}
                        <div className={`bg-white border rounded-xl overflow-hidden flex flex-col text-left transition-all duration-300 relative h-full ${
                          isMatchedIdx 
                            ? 'border-[#ed1b24] ring-1 ring-[#ed1b24] shadow-sm' 
                            : 'border-[#cbd5e1]/40 group-hover:border-[#cbd5e1]'
                        }`}>
                          {/* Match badge */}
                          {isMatchedIdx && (
                            <span className="absolute top-2.5 right-2.5 z-10 bg-[#ed1b24] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-wider shadow-xs">
                              BEST MATCH
                            </span>
                          )}

                          {/* Thumbnail */}
                          <div className="relative h-28 bg-slate-50 overflow-hidden shrink-0">
                            <img 
                              src={c.image} 
                              alt={c.code}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                              referrerPolicy="no-referrer"
                            />
                            {/* SVG overlay */}
                            <div className="absolute -bottom-2.5 left-2.5 w-7 h-7 bg-white border border-[#e2e8f0] rounded-full flex items-center justify-center shadow-xs">
                              {c.icon}
                            </div>
                          </div>

                          {/* Details writeup - aligned perfectly */}
                          <div className="p-4 pt-5 flex-1 flex flex-col justify-between gap-2">
                            <div>
                              <h5 className="font-extrabold text-[#0b1523] text-sm tracking-tight leading-tight group-hover:text-[#ed1b24] transition-colors">
                                {c.code}
                              </h5>
                              <span className="text-[10px] font-bold text-slate-400 block tracking-tight uppercase mt-0.5">
                                {c.subtitle}
                              </span>
                              <p className="text-[11px] text-[#555e6b] font-medium leading-normal mt-1.5 line-clamp-3">
                                {c.desc}
                              </p>
                            </div>

                            <div className="pt-1.5 flex items-center justify-between text-[11px] font-bold">
                              <span className="text-[#ed1b24] inline-flex items-center gap-0.5">
                                Learn More <span>→</span>
                              </span>
                              <span className="text-slate-750 bg-slate-100 px-1.5 py-0.5 rounded">
                                {c.fee}
                              </span>
                            </div>
                          </div>

                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#cbd5e1]/30">
                {/* 1. Best for */}
                <tr className="hover:bg-slate-50/20">
                  <td className="p-4 px-6 bg-slate-50/50 font-bold text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider">
                    Best for
                  </td>
                  {mainCourses.map((c) => (
                    <td 
                      key={c.id} 
                      className={`p-4 text-xs font-medium text-slate-700 leading-relaxed border-l border-[#cbd5e1]/30 ${
                        hasRunMatch && matchedId === c.id ? 'bg-[#ed1b24]/3' : ''
                      }`}
                    >
                      {c.bestFor}
                    </td>
                  ))}
                </tr>

                {/* 2. Learn writeup */}
                <tr className="hover:bg-slate-50/20">
                  <td className="p-4 px-6 bg-slate-50/50 font-bold text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider">
                    Learn
                  </td>
                  {mainCourses.map((c) => (
                    <td 
                      key={c.id} 
                      className={`p-4 text-xs font-medium text-slate-600 leading-relaxed border-l border-[#cbd5e1]/30 ${
                        hasRunMatch && matchedId === c.id ? 'bg-[#ed1b24]/3' : ''
                      }`}
                    >
                      {c.learn}
                    </td>
                  ))}
                </tr>

                {/* 3. Certificate validity */}
                <tr className="hover:bg-slate-50/20">
                  <td className="p-4 px-6 bg-slate-50/50 font-bold text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider">
                    Certificate Validity
                  </td>
                  {mainCourses.map((c) => (
                    <td 
                      key={c.id} 
                      className={`p-4 text-xs font-bold text-[#ed1b24] border-l border-[#cbd5e1]/30 ${
                        hasRunMatch && matchedId === c.id ? 'bg-[#ed1b24]/3' : ''
                      }`}
                    >
                      {c.validity}
                    </td>
                  ))}
                </tr>

                {/* 4. Duration */}
                <tr className="hover:bg-slate-50/20">
                  <td className="p-4 px-6 bg-slate-50/50 font-bold text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider">
                    Duration
                  </td>
                  {mainCourses.map((c) => (
                    <td 
                      key={c.id} 
                      className={`p-4 text-xs font-extrabold text-slate-800 border-l border-[#cbd5e1]/30 ${
                        hasRunMatch && matchedId === c.id ? 'bg-[#ed1b24]/3' : ''
                      }`}
                    >
                      {c.duration}
                    </td>
                  ))}
                </tr>

                {/* 5. Practical Assessment */}
                <tr className="hover:bg-slate-50/20">
                  <td className="p-4 px-6 bg-slate-50/50 font-bold text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider">
                    Practical Assessment
                  </td>
                  {mainCourses.map((c) => (
                    <td 
                      key={c.id} 
                      className={`p-4 text-xs font-medium text-slate-700 border-l border-[#cbd5e1]/30 ${
                        hasRunMatch && matchedId === c.id ? 'bg-[#ed1b24]/3' : ''
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-emerald-800">
                        <span className="text-emerald-500 font-extrabold text-sm">✓</span>
                        <span>{c.practical}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 6. Certification Passed */}
                <tr className="hover:bg-slate-50/20">
                  <td className="p-4 px-6 bg-slate-50/50 font-bold text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider">
                    Certification Passed
                  </td>
                  {mainCourses.map((c) => (
                    <td 
                      key={c.id} 
                      className={`p-4 text-xs font-medium text-slate-700 border-l border-[#cbd5e1]/30 ${
                        hasRunMatch && matchedId === c.id ? 'bg-[#ed1b24]/3' : ''
                      }`}
                    >
                      {c.certification}
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
          {/* Disclaimer Banner below table */}
          <div className="p-4 bg-slate-50 border-t border-[#cbd5e1]/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500 font-medium">
            <span>* All reflected course prices are before prevailing GST.</span>
            <span className="text-gray-400">Singapore Red Cross Academy © 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
}
