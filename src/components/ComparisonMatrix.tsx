import React, { useState } from 'react';
import { Course, COURSES_DATA } from '../types';
import { Search, Info, HelpCircle, ShieldAlert, BadgeCent, Globe, Milestone } from 'lucide-react';

interface ComparisonMatrixProps {
  selectedCourseId: string | null;
  onSelectCourse: (id: string | null) => void;
  onOpenChat: (msg?: string) => void;
}

export default function ComparisonMatrix({ selectedCourseId, onSelectCourse, onOpenChat }: ComparisonMatrixProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Suffix/custom names specifically for the high-fidelity catalog screenshot rendering
  const getDisplayDetails = (course: Course) => {
    switch (course.id) {
      case 'bcls':
        return {
          code: 'BCLS+AED',
          outline: 'Duties of BCLS provider, Adult & infant CPR, AED use, FBAO choking, resuscitation cycles.',
          prereq: 'GCE Sec 2 / ESS WPLN L5 Recommended. Fit to practice.'
        };
      case 'bfa':
        return {
          code: 'BFA+AED',
          outline: 'Workplace first aid, Common medical conditions (fainting, heat injuries, burns, bleedings, sprains), Improvised Carrying.',
          prereq: 'Literacy: Secondary Two / ESS Level 5. Fitness: Physically & medically fit.'
        };
      case 'cfa':
        return {
          code: 'CFAC',
          outline: 'SFA + Child-specific care + full BCLS skills. Child illness (asthma, fever, vomiting, rashes).',
          prereq: 'Prior reading of SFA & BCLS manuals required. Secondary Two recommendation.'
        };
      case 'sfa':
        return {
          code: 'SFAC',
          outline: 'Essentials of First Aid, Unconscious casualty, Respiratory, Shock/Bleeding, Musculoskeletal, Burn injuries, CPR(HO)+AED.',
          prereq: 'P1-P5: Prior SFA manual reading, Secondary Two, Fit with no pre-existing knee or spinal issues.'
        };
      case 'ofac':
        return {
          code: 'OFAC',
          outline: 'WSH Regulations & compliance, Industrial Toxicology, Safety & Accident Prevention, CPR(HO) + AED.',
          prereq: 'Education: Sec Two / ESS Level 5 (MOM mandate), Passport Photo, physically fit.'
        };
      case 'cpr_ho':
        return {
          code: 'CPR(Hands-Only)+AED Provider',
          outline: 'Continuous Hands-Only chest compressions on floor manikin, basic AED cycle, 995 rescue lines.',
          prereq: 'None. Open to public / caregivers.'
        };
      case 'cdbfaw':
        return {
          code: 'CDBFAW',
          outline: 'Pet vital checks, pet choking, wrapping animal limbs, domestic poisoning safety cycles.',
          prereq: 'None. No academic restraint.'
        };
      default:
        return {
          code: course.code,
          outline: course.curriculum.join(', '),
          prereq: course.prerequisites
        };
    }
  };

  // Filter full table datasets (excluding junior which is completely gone from COURSES_DATA)
  const filteredCourses = COURSES_DATA.filter(course => {
    const details = getDisplayDetails(course);
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      details.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      details.outline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      details.prereq.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in" id="comparison-matrix-viewport">
      
      {/* Search Input Filter Panel above Table */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white border border-[#cbd5e1]/55 p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2.5 text-slate-700">
          <span className="w-2 h-2 rounded-full bg-[#ed1b24]" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">FIND YOUR COURSE HERE</span>
        </div>
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search codes, hours, pricing, outline or prerequisites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-[#cbd5e1] pl-10 pr-4 py-3 text-xs md:text-sm outline-none focus:border-[#ed1b24] focus:ring-1 focus:ring-[#ed1b24] placeholder-gray-400 font-semibold"
          />
        </div>
      </div>

      {/* Main card matching layout in screenshot */}
      <div className="bg-white border border-[#cbd5e1]/50 rounded-2xl shadow-xs overflow-hidden">
        
        {/* Card Header matches visual style of screenshots exactly */}
        <div className="p-6 md:p-8 border-b border-[#cbd5e1]/40 bg-slate-50/50">
          <span className="text-[10px] bg-red-100/70 text-[#ed1b24] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
            Consolidated Course Comparison Matrix
          </span>
          <h2 className="text-xl md:text-2xl font-black text-[#0b1523] tracking-tight mt-2.5 leading-none">
            Singapore Red Cross Academy Course Catalog
          </h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Verify official accreditation, legal hours, target groups, languages, and pricing specs for both Full courses and Refresher intakes.
          </p>
        </div>

        {/* Dynamic Table containing all 7 courses with proper column allocation */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#cbd5e1]/50">
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider select-none">
                  Course Title &amp; Code
                </th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider select-none">
                  Target Audience / Language
                </th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider select-none whitespace-nowrap">
                  Duration (Full/Refresher)
                </th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider select-none whitespace-nowrap">
                  Course Fees (Excl. GST)
                </th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider select-none">
                  CPR Component
                </th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider select-none">
                  Validity
                </th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider select-none">
                  Coverage Outline Syllabus
                </th>
                <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-wider select-none">
                  Prerequisites / Access Rules
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cbd5e1]/30">
              {filteredCourses.map((course) => {
                const details = getDisplayDetails(course);
                const isSelected = selectedCourseId === course.id;

                return (
                  <tr 
                    key={course.id}
                    onClick={() => onSelectCourse(course.id)}
                    className={`hover:bg-slate-50/50 transition duration-150 cursor-pointer ${
                      isSelected ? 'bg-red-50/20' : ''
                    }`}
                  >
                    {/* Column 1: Code and name */}
                    <td className="py-5 px-6">
                      <strong className="text-sm md:text-base font-black text-[#ed1b24] block leading-tight group-hover:underline">
                        {details.code}
                      </strong>
                      <span className="text-[11px] text-gray-500 font-semibold block mt-1 leading-snug">
                        {course.name}
                      </span>
                    </td>

                    {/* Column 2: Target Audience & Languages */}
                    <td className="py-5 px-6 leading-relaxed text-xs text-slate-700 min-w-[180px]">
                      <p className="font-medium text-slate-800">{course.targetAudience}</p>
                    </td>
                    
                    {/* Column 3: Duration (Full/Refresher) */}
                    <td className="py-5 px-6 font-bold text-slate-800 whitespace-nowrap text-center sm:text-left">
                      <div>
                        <span className="block font-extrabold text-[#0b1523]">{course.duration} <span className="text-[10px] text-gray-400 font-bold">(Full)</span></span>
                        {course.refresherDuration ? (
                          <span className="block text-xs text-slate-500 mt-0.5">{course.refresherDuration} <span className="text-[10px] text-gray-400 font-semibold">(Refresher)</span></span>
                        ) : (
                          <span className="block text-[10px] text-gray-400 font-medium italic mt-0.5">Refresher N/A</span>
                        )}
                      </div>
                    </td>

                    {/* Column 4: Fees (Full/Refresher) */}
                    <td className="py-5 px-6 font-extrabold text-slate-800 whitespace-nowrap">
                      <div>
                        <span className="block text-[#ed1b24] text-sm font-black">{course.fullFee} <span className="text-[10px] text-gray-400 font-bold">(Full)</span></span>
                        {course.refresherFee ? (
                          <span className="block text-slate-600 text-xs mt-0.5">{course.refresherFee} <span className="text-[10px] text-gray-400 font-semibold">(Refresher)</span></span>
                        ) : (
                          <span className="block text-[10px] text-gray-400 font-medium italic mt-0.5">Refresher N/A</span>
                        )}
                      </div>
                    </td>

                    {/* Column 5: CPR Component */}
                    <td className="py-5 px-6 text-slate-700 text-xs font-semibold leading-relaxed min-w-[150px]">
                      {course.cprComponent}
                    </td>

                    {/* Column 6: Validity */}
                    <td className="py-5 px-6 text-slate-700 text-xs font-extrabold whitespace-nowrap">
                      <span className="bg-red-50 text-[#ed1b24] py-1 px-2.5 rounded-md border border-red-100">
                        {course.validity}
                      </span>
                    </td>

                    {/* Column 7: Coverage Outline */}
                    <td className="py-5 px-6 text-slate-600 text-xs leading-relaxed max-w-sm font-medium">
                      {details.outline}
                    </td>

                    {/* Column 8: Prerequisites */}
                    <td className="py-5 px-6 text-xs text-slate-500 font-semibold leading-relaxed max-w-xs">
                      {details.prereq.split('\n')[0]}
                      {course.id === 'sfa' && (
                        <span className="block text-[10px] text-[#ed1b24] font-bold mt-1">★ Click details to see full P1-P5 guidelines &amp; RSFAC criteria</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400 text-xs sm:text-sm font-semibold">
                    No matching courses found in the Singapore Red Cross Academy registration catalog.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Disclaimer Banner below table */}
        <div className="p-4 bg-slate-50 border-t border-[#cbd5e1]/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500 font-medium font-sans">
          <span>* All reflected course prices are before prevailing GST.</span>
          <span className="text-gray-400">Singapore Red Cross Academy © 2026</span>
        </div>
      </div>

      {/* Helper Info Footer with Consolidated attendance requirements from PDF page 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#fffefe] border border-[#cbd5e1]/55 rounded-xl p-5 space-y-2 text-xs text-slate-600">
          <h5 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1 text-[#ed1b24]">
            <ShieldAlert className="w-4 h-4 text-[#ed1b24]" />
            Attendance &amp; Conduct Rules
          </h5>
          <p className="leading-relaxed font-medium">
            <strong>100% attendance</strong> is mandatory for all certified courses to qualify for assessment. Trainees are allowed up to <strong>three attempts</strong> for both written and practical exams.
          </p>
        </div>

        <div className="bg-[#fffefe] border border-[#cbd5e1]/55 rounded-xl p-5 space-y-2 text-xs text-slate-600">
          <h5 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1 text-[#ed1b24]">
            <Milestone className="w-4 h-4 text-[#ed1b24]" />
            SFA / OFAC Registration Advisory
          </h5>
          <p className="leading-relaxed font-medium">
            Registration is recommended <strong>three months before certification expiry</strong> to facilitate uninterrupted compliance with workplace safety guidelines.
          </p>
        </div>
      </div>

    </div>
  );
}
