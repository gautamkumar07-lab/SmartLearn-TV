import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Play,
  BrainCircuit,
  Bot,
  Flame,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  Download,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { LessonVideo } from '../types';

export const HomeScreen: React.FC = () => {
  const {
    currentUser,
    videos,
    setCurrentVideo,
    setActivePage,
    playAudioCue,
    setIsAlexaListening,
    downloadedVideos,
    toggleDownloadVideo,
    t
  } = useApp();

  const [heroVideo, setHeroVideo] = useState<LessonVideo>(videos[0]);

  const handlePlayVideo = (video: LessonVideo) => {
    playAudioCue('select');
    setCurrentVideo(video);
    setActivePage('learning');
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] pb-24 text-white select-none">
      {/* Hero Spotlight Billboard */}
      <div className="relative w-full h-[540px] overflow-hidden">
        {/* Background Thumbnail with dramatic Fire TV gradient vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
          style={{ backgroundImage: `url(${heroVideo.thumbnail})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e14] via-[#0b0e14]/85 to-transparent w-3/4" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl px-10 pt-16 flex flex-col justify-end h-full pb-12">
          {/* Tagline Badge */}
          <div className="flex items-center space-x-3 mb-3">
            <span className="px-2.5 py-1 rounded bg-[#ff9900] text-black text-xs font-black tracking-wider uppercase">
              TOP AI RECOMMENDATION
            </span>
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{heroVideo.subject} • {heroVideo.topic}</span>
            </span>
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-600/40 font-mono">
              {heroVideo.level}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3 line-clamp-2">
            {heroVideo.title}
          </h1>

          <p className="text-gray-300 text-sm md:text-base max-w-2xl mb-6 line-clamp-2 leading-relaxed">
            {heroVideo.summary}
          </p>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-5 text-xs text-gray-300 mb-6">
            <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
              <span>★</span>
              <span>{heroVideo.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{heroVideo.duration} mins</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-400">By</span>
              <span className="font-semibold text-white">{heroVideo.instructor}</span>
            </div>
            <div className="flex items-center space-x-1 text-cyan-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+150 XP on completion</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handlePlayVideo(heroVideo)}
              className="tv-focusable bg-[#00a8e1] hover:bg-[#0092c7] text-white px-7 py-3 rounded-xl font-bold text-sm flex items-center space-x-2.5 shadow-xl shadow-[#00a8e1]/40 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{heroVideo.progressPercent > 0 ? `Resume (${heroVideo.progressPercent}%)` : 'Watch Lesson'}</span>
            </button>

            <button
              onClick={() => {
                playAudioCue('select');
                setActivePage('quiz');
              }}
              className="tv-focusable bg-gray-900/90 hover:bg-gray-800 text-white border border-gray-700 px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 cursor-pointer"
            >
              <BrainCircuit className="w-4 h-4 text-[#ff9900]" />
              <span>Take Topic Quiz</span>
            </button>

            <button
              onClick={() => {
                playAudioCue('select');
                setActivePage('ai-assistant');
              }}
              className="tv-focusable bg-gray-900/90 hover:bg-gray-800 text-cyan-300 border border-cyan-500/40 px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-[#00d2ff]" />
              <span>Ask AI Doubts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Body Rows */}
      <div className="px-10 -mt-6 relative z-20 space-y-9">
        {/* User Daily Summary Card Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#121620]/90 backdrop-blur-md border border-gray-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-3.5 p-2">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500 animate-pulse" />
            </div>
            <div>
              <span className="text-xs text-gray-400 uppercase font-semibold">Active Streak</span>
              <p className="text-lg font-black text-white">{currentUser.streakDays} Days Strong</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-2 border-l border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Clock className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <span className="text-xs text-gray-400 uppercase font-semibold">Today's Study</span>
              <p className="text-lg font-black text-white">{currentUser.todayMinutes} / 120 Mins</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-2 border-l border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <span className="text-xs text-gray-400 uppercase font-semibold">Weekly Goal</span>
              <p className="text-lg font-black text-white">18.5 / {currentUser.weeklyGoalHours} Hours</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 border-l border-gray-800">
            <div>
              <span className="text-xs text-gray-400 uppercase font-semibold">Fire TV Alexa</span>
              <p className="text-xs text-cyan-300 font-medium">Say: "Alexa, quiz me"</p>
            </div>
            <button
              onClick={() => {
                playAudioCue('alexa');
                setIsAlexaListening(true);
              }}
              className="tv-focusable bg-[#00a8e1] hover:bg-[#00d2ff] p-2.5 rounded-xl text-black cursor-pointer font-bold transition"
            >
              <Bot className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Row 1: Continue Learning */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{t('continueLearning')}</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                {videos.filter(v => v.progressPercent > 0).length} In Progress
              </span>
            </div>
            <button
              onClick={() => {
                playAudioCue('select');
                setActivePage('learning');
              }}
              className="tv-focusable text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer font-semibold"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.slice(0, 3).map(video => (
              <div
                key={video.id}
                onClick={() => handlePlayVideo(video)}
                onMouseEnter={() => setHeroVideo(video)}
                className="tv-focusable group bg-[#161b22] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:border-[#00a8e1] transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[11px] font-mono text-white">
                    {video.duration}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#00a8e1] text-[10px] font-bold text-white uppercase">
                    {video.subject}
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gray-700">
                    <div
                      className="h-full bg-[#00d2ff]"
                      style={{ width: `${video.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 line-clamp-1 mb-1">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{video.topic}</span>
                    <span className="font-semibold text-cyan-400">{video.progressPercent}% Completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Recommended Curricula & Smart Learning Path */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">{t('recommended')}</h2>
              <p className="text-xs text-gray-400">Tailored to your target: {currentUser.gradeOrTarget}</p>
            </div>
            <button
              onClick={() => {
                playAudioCue('select');
                setActivePage('learning');
              }}
              className="tv-focusable text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer font-semibold"
            >
              <span>Explore Subjects</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.slice(2, 6).map(video => {
              const isDownloaded = downloadedVideos.includes(video.id);
              return (
                <div
                  key={video.id}
                  className="tv-focusable bg-[#161b22] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#00a8e1] transition-all flex flex-col justify-between"
                >
                  <div
                    onClick={() => handlePlayVideo(video)}
                    className="cursor-pointer"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-cyan-300 font-bold">
                        {video.level}
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-gray-300">
                        {video.duration}
                      </div>
                    </div>

                    <div className="p-3.5">
                      <span className="text-[10px] uppercase font-bold text-[#ff9900] tracking-wider block mb-1">
                        {video.subject}
                      </span>
                      <h4 className="font-bold text-xs text-white line-clamp-2 mb-2 leading-snug">
                        {video.title}
                      </h4>
                    </div>
                  </div>

                  <div className="px-3.5 pb-3 pt-1 border-t border-gray-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handlePlayVideo(video)}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-cyan-400" />
                      <span>Watch</span>
                    </button>

                    <button
                      onClick={() => toggleDownloadVideo(video.id)}
                      className="p-1 rounded-md text-gray-400 hover:text-white cursor-pointer"
                      title={isDownloaded ? 'Downloaded to Fire TV' : 'Download for Offline Study'}
                    >
                      {isDownloaded ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Download className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 3: AI Daily Doubt Challenge & Voice Prompts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-transparent border border-cyan-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-2 text-cyan-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-black tracking-wider uppercase">AI Daily TV Challenge</span>
            </div>
            <h3 className="text-xl font-black text-white mb-2">
              "How does Lenz's Law guarantee the principle of Conservation of Energy?"
            </h3>
            <p className="text-xs text-gray-300 mb-5 leading-relaxed">
              Answer using your remote D-Pad or voice to earn +100 XP and unlock the 'Faraday Master' achievement badge.
            </p>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  playAudioCue('select');
                  setActivePage('quiz');
                }}
                className="tv-focusable bg-[#00a8e1] hover:bg-[#00d2ff] text-black px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Solve on Fire TV
              </button>

              <button
                onClick={() => {
                  playAudioCue('alexa');
                  setIsAlexaListening(true);
                }}
                className="tv-focusable bg-gray-900 border border-cyan-500/40 text-cyan-300 hover:text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>

          {/* Quick Remote Navigation Tips */}
          <div className="bg-[#121620]/90 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-amber-400 mb-2">
                <HelpCircle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Fire TV Remote Shortcuts</span>
              </div>
              <ul className="text-xs text-gray-300 space-y-2 mt-3">
                <li className="flex items-center justify-between">
                  <span>Voice Alexa:</span>
                  <span className="font-mono text-cyan-400 bg-black/40 px-2 py-0.5 rounded">Key 'A'</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>D-Pad Direction:</span>
                  <span className="font-mono text-cyan-400 bg-black/40 px-2 py-0.5 rounded">Arrow Keys</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Select / Confirm:</span>
                  <span className="font-mono text-cyan-400 bg-black/40 px-2 py-0.5 rounded">Enter / OK</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Go Back / Exit:</span>
                  <span className="font-mono text-cyan-400 bg-black/40 px-2 py-0.5 rounded">Esc / Back</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-gray-800 text-[11px] text-gray-400">
              Compatible with 1080p, 4K UHD Fire TV Stick & Omni Series.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
