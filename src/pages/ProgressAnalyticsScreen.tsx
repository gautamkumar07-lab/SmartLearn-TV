import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  BookOpen,
  Play,
  FileCheck
} from 'lucide-react';

export const ProgressAnalyticsScreen: React.FC = () => {
  const {
    currentUser,
    weeklyHours,
    subjectMastery,
    weakTopics,
    playAudioCue,
    setActivePage,
    setCurrentVideo,
    videos
  } = useApp();

  const maxWeeklyHours = Math.max(...weeklyHours.map(w => w.hours));

  const handleFixWeakTopic = (videoId: string) => {
    playAudioCue('select');
    const targetVideo = videos.find(v => v.id === videoId) || videos[0];
    setCurrentVideo(targetVideo);
    setActivePage('learning');
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] px-8 py-6 text-white select-none pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-[#00a8e1] flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">Progress Analytics</h1>
              <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/50 px-2 py-0.5 rounded font-mono uppercase">
                AI DIAGNOSTICS
              </span>
            </div>
            <p className="text-xs text-gray-400">Weekly TV study hours, subject mastery breakdown & weak area recommendations</p>
          </div>
        </div>

        {/* Quick Report Download / Sync Status */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#121620] border border-gray-800 px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-gray-300">Report Synced to Cloud</span>
          </div>
        </div>
      </div>

      {/* Row 1: Weekly Study Hours Bar Chart & High Level KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Weekly Hours Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-300">
                Weekly Fire TV Study Hours
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              Total: 31.8 hrs (Avg 4.5h / day)
            </span>
          </div>

          {/* Bar Chart Bars */}
          <div className="flex items-end justify-between h-48 px-4 pt-6">
            {weeklyHours.map((item, idx) => {
              const heightPercent = Math.round((item.hours / maxWeeklyHours) * 100);
              const isToday = item.day === 'Sun';

              return (
                <div key={idx} className="flex flex-col items-center flex-1 max-w-[50px] group">
                  <span className="text-[10px] font-mono text-gray-400 group-hover:text-cyan-300 mb-2 transition">
                    {item.hours}h
                  </span>

                  <div className="w-full bg-gray-800/60 rounded-t-xl h-36 flex items-end p-1">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday
                          ? 'bg-gradient-to-t from-[#00a8e1] to-[#00d2ff] shadow-[0_0_12px_#00d2ff]'
                          : 'bg-cyan-800/70 group-hover:bg-[#00a8e1]'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  <span className={`text-xs font-bold mt-2 ${isToday ? 'text-cyan-400 font-black' : 'text-gray-400'}`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right KPI Card */}
        <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 mb-4 pb-2 border-b border-gray-800">
              <Award className="w-4 h-4" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Overall Performance</h3>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-gray-400">Target Readiness</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-2xl font-black text-white">78.4%</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +5.2% this week
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-400">Total Doubts Resolved</span>
                <p className="text-xl font-black text-cyan-300 mt-1">142 AI Queries</p>
              </div>

              <div>
                <span className="text-xs text-gray-400">Quiz Accuracy</span>
                <p className="text-xl font-black text-[#ff9900] mt-1">84% Correct Rate</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <span className="text-[11px] text-gray-400">
              Personalized for: <span className="text-white font-semibold">{currentUser.gradeOrTarget}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Subject Mastery Progress & Weak Topic AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Mastery Progress Bars */}
        <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
            <div className="flex items-center space-x-2 text-cyan-400">
              <BookOpen className="w-4 h-4" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Subject Mastery Radar</h3>
            </div>
            <span className="text-xs text-gray-400 font-mono">5 Curricula</span>
          </div>

          <div className="space-y-4">
            {subjectMastery.map((sub, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-200">{sub.subject}</span>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <span>{sub.hoursSpent} hrs</span>
                    <span className="font-mono text-cyan-300 font-bold">{sub.masteryPercentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${sub.masteryPercentage}%`,
                      backgroundColor: sub.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topic AI Recommendations */}
        <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
            <div className="flex items-center space-x-2 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-bold text-xs uppercase tracking-wider">
                Weak Topics Identified by AI
              </h3>
            </div>
            <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded font-mono">
              Action Required
            </span>
          </div>

          <div className="space-y-3">
            {weakTopics.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-cyan-500/40 transition"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase text-amber-400">
                    {item.subject} • Accuracy: {item.accuracy}%
                  </span>
                  <button
                    onClick={() => handleFixWeakTopic(item.recommendedVideoId)}
                    className="tv-focusable text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Fix Topic</span>
                    <Play className="w-3 h-3 fill-cyan-400" />
                  </button>
                </div>

                <h4 className="text-xs font-bold text-white mb-1">{item.topic}</h4>
                <p className="text-[11px] text-gray-400 leading-snug">{item.recommendedAction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
