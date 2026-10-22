import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Award,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { CareerPath } from '../types';

export const CareerGuidanceScreen: React.FC = () => {
  const { careerPaths, playAudioCue, currentUser } = useApp();
  const [selectedCareer, setSelectedCareer] = useState<CareerPath>(careerPaths[0]);

  return (
    <div className="min-h-screen bg-[#0b0e14] px-8 py-6 text-white select-none pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Compass className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">Career Guidance & Industry Pathways</h1>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/50 px-2 py-0.5 rounded font-mono uppercase">
                AI MATCHED TO {currentUser.gradeOrTarget.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-gray-400">Discover future professions, top universities, key skill requirements, and market salary packages</p>
          </div>
        </div>

        {/* Top Match Pill */}
        <div className="bg-[#121620] border border-emerald-500/40 px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-gray-200">Top Match: <strong className="text-white">{careerPaths[0].title.split('&')[0]}</strong></span>
        </div>
      </div>

      {/* Main 2-Column: Pathways List (Left) + Detailed Deep-Dive (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List of Career Pathways */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Recommended Future Pathways
          </h2>

          {careerPaths.map(career => {
            const isSelected = selectedCareer.id === career.id;
            return (
              <button
                key={career.id}
                onClick={() => {
                  playAudioCue('select');
                  setSelectedCareer(career);
                }}
                className={`tv-focusable w-full text-left p-4.5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#162030] border-[#00a8e1] ring-2 ring-[#00d2ff] shadow-xl shadow-cyan-500/20'
                    : 'bg-[#121620]/90 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                      {career.stream}
                    </span>
                    <span className="text-xs font-mono font-black text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                      {career.matchScore}% Match
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white mb-1.5 line-clamp-1">
                    {career.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {career.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-800/80 flex items-center justify-between text-xs">
                  <span className="text-gray-400">{career.salaryRange}</span>
                  <span className="text-emerald-400 font-bold">{career.growth}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Roadmap, Colleges & Skills (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl space-y-6">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {selectedCareer.stream}
                </span>
                <h2 className="text-2xl font-black text-white mt-1">{selectedCareer.title}</h2>
                <p className="text-xs text-gray-400 mt-1 max-w-xl">{selectedCareer.description}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-3xl font-black text-[#00d2ff] font-mono">
                  {selectedCareer.matchScore}%
                </span>
                <span className="block text-[10px] font-bold uppercase text-gray-400">
                  AI Aptitude Match
                </span>
              </div>
            </div>

            {/* Compensation & Growth Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/40 border border-gray-800 p-4 rounded-2xl flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Estimated Compensation</span>
                  <p className="text-sm font-black text-white">{selectedCareer.salaryRange}</p>
                </div>
              </div>

              <div className="bg-black/40 border border-gray-800 p-4 rounded-2xl flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Market Outlook</span>
                  <p className="text-sm font-black text-emerald-400">{selectedCareer.growth}</p>
                </div>
              </div>
            </div>

            {/* Top Colleges Finder */}
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 mb-3">
                <GraduationCap className="w-4 h-4" />
                <h3 className="font-bold text-xs uppercase tracking-wider">Top Institutions for this Path</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {selectedCareer.topColleges.map((college, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 text-xs text-center font-bold text-gray-200"
                  >
                    {college}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Skills Roadmap */}
            <div>
              <div className="flex items-center space-x-2 text-purple-400 mb-3">
                <Award className="w-4 h-4" />
                <h3 className="font-bold text-xs uppercase tracking-wider">Required Technical Masteries</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedCareer.keySkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-semibold text-purple-200"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Alexa Career Advice Prompt */}
            <div className="p-4 bg-gradient-to-r from-cyan-950/40 to-blue-950/20 border border-cyan-500/30 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-300 block mb-0.5">Want personalized advice?</span>
                <p className="text-xs text-gray-300">
                  Say: "Alexa, ask SmartLearn what college score I need for {selectedCareer.topColleges[0]}"
                </p>
              </div>
              <button
                onClick={() => playAudioCue('alexa')}
                className="tv-focusable bg-[#00a8e1] hover:bg-[#0092c7] text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Ask Alexa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
