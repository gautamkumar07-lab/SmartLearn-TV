import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LessonVideo } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Volume2,
  VolumeX,
  Maximize,
  Download,
  CheckCircle,
  Sparkles,
  Bot,
  BrainCircuit,
  FileText,
  Clock,
  BookOpen
} from 'lucide-react';

export const LearningCenterScreen: React.FC = () => {
  const {
    videos,
    currentVideo,
    setCurrentVideo,
    playAudioCue,
    setActivePage,
    downloadedVideos,
    toggleDownloadVideo,
    addXP
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'transcript' | 'playlist'>('notes');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const subjects = ['All', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'Computer Science', 'Polity & Governance'];

  const filteredVideos = selectedSubject === 'All'
    ? videos
    : videos.filter(v => v.subject.toLowerCase() === selectedSubject.toLowerCase());

  const togglePlay = () => {
    playAudioCue('select');
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const seek = (seconds: number) => {
    playAudioCue('click');
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
      // Give XP when watching more than 10 seconds
      if (Math.floor(videoRef.current.currentTime) === 15) {
        addXP(25);
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectVideo = (vid: LessonVideo) => {
    playAudioCue('select');
    setCurrentVideo(vid);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setTimeout(() => {
        videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
      }, 300);
    }
  };

  const isDownloaded = downloadedVideos.includes(currentVideo.id);

  return (
    <div className="min-h-screen bg-[#0b0e14] px-8 py-6 text-white select-none pb-24">
      {/* Subject Filter Bar */}
      <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar pb-4 mb-6">
        {subjects.map(sub => {
          const isSelected = selectedSubject === sub;
          return (
            <button
              key={sub}
              onClick={() => {
                playAudioCue('click');
                setSelectedSubject(sub);
              }}
              className={`tv-focusable px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#00a8e1] text-white shadow-md shadow-[#00a8e1]/40'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {sub}
            </button>
          );
        })}
      </div>

      {/* Main 2-Column TV Layout: Video Player + Interactive Companion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 16:9 Video Player (2 Cols on Large) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl group">
            <video
              ref={videoRef}
              src={currentVideo.videoUrl}
              poster={currentVideo.thumbnail}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
              playsInline
            />

            {/* Fire TV On-Screen Playback Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5 pointer-events-none group-hover:pointer-events-auto">
              {/* Top Video Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-[#00a8e1] text-[10px] font-bold text-white uppercase">
                    {currentVideo.subject}
                  </span>
                  <span className="text-xs text-gray-300 font-medium">{currentVideo.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono bg-black/60 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/40">
                    4K ULTRA HD
                  </span>
                </div>
              </div>

              {/* Bottom Video Controls */}
              <div className="space-y-3">
                {/* Progress Bar */}
                <div className="w-full bg-gray-700/80 rounded-full h-1.5 overflow-hidden cursor-pointer">
                  <div
                    className="bg-[#00d2ff] h-full"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : currentVideo.progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  {/* Left Controls: Play, Rewind, Forward, Time */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="tv-focusable w-9 h-9 rounded-lg bg-[#00a8e1] hover:bg-[#0092c7] text-white flex items-center justify-center cursor-pointer shadow-md"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                    </button>

                    <button
                      onClick={() => seek(-10)}
                      className="tv-focusable p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 cursor-pointer"
                      title="Rewind 10s"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => seek(10)}
                      className="tv-focusable p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 cursor-pointer"
                      title="Fast Forward 10s"
                    >
                      <FastForward className="w-4 h-4" />
                    </button>

                    <span className="text-xs font-mono text-gray-300 ml-2">
                      {formatTime(currentTime)} / {formatTime(duration || currentVideo.durationSeconds)}
                    </span>
                  </div>

                  {/* Right Controls: Speed, Volume, Download, Fullscreen */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        const speeds = [1, 1.25, 1.5, 2];
                        const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                        setPlaybackSpeed(nextSpeed);
                        if (videoRef.current) videoRef.current.playbackRate = nextSpeed;
                      }}
                      className="tv-focusable px-2.5 py-1 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-xs font-mono font-bold text-cyan-400 cursor-pointer"
                    >
                      {playbackSpeed}x
                    </button>

                    <button
                      onClick={() => {
                        setIsMuted(!isMuted);
                        if (videoRef.current) videoRef.current.muted = !isMuted;
                      }}
                      className="tv-focusable p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => {
                        if (videoRef.current?.requestFullscreen) videoRef.current.requestFullscreen();
                      }}
                      className="tv-focusable p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 cursor-pointer"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Metadata & Quick Action Bar */}
          <div className="bg-[#121620]/90 border border-gray-800 rounded-2xl p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs text-[#ff9900] font-bold mb-1">
                  <span>{currentVideo.subject}</span>
                  <span>•</span>
                  <span>{currentVideo.topic}</span>
                </div>
                <h1 className="text-xl font-black text-white">{currentVideo.title}</h1>
                <p className="text-xs text-gray-400 mt-1">Instructor: {currentVideo.instructor} • Level: {currentVideo.level}</p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => toggleDownloadVideo(currentVideo.id)}
                  className={`tv-focusable flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    isDownloaded
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                      : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:text-white'
                  }`}
                >
                  {isDownloaded ? <CheckCircle className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{isDownloaded ? 'Downloaded to Fire TV' : 'Save Offline'}</span>
                </button>

                <button
                  onClick={() => {
                    playAudioCue('select');
                    setActivePage('quiz');
                  }}
                  className="tv-focusable bg-[#ff9900] hover:bg-amber-500 text-black px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <BrainCircuit className="w-4 h-4" />
                  <span>Start Quiz</span>
                </button>

                <button
                  onClick={() => {
                    playAudioCue('select');
                    setActivePage('ai-assistant');
                  }}
                  className="tv-focusable bg-[#00a8e1] hover:bg-[#0092c7] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask AI Doubts</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Summary Notes, Video Transcript & Playlist */}
        <div className="space-y-4">
          {/* Tab Selector */}
          <div className="grid grid-cols-3 gap-1 bg-[#121620] p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => {
                playAudioCue('click');
                setActiveTab('notes');
              }}
              className={`tv-focusable py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'notes' ? 'bg-[#00a8e1] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Notes</span>
            </button>

            <button
              onClick={() => {
                playAudioCue('click');
                setActiveTab('transcript');
              }}
              className={`tv-focusable py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'transcript' ? 'bg-[#00a8e1] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Transcript</span>
            </button>

            <button
              onClick={() => {
                playAudioCue('click');
                setActiveTab('playlist');
              }}
              className={`tv-focusable py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'playlist' ? 'bg-[#00a8e1] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curriculum</span>
            </button>
          </div>

          {/* Tab Content Box */}
          <div className="bg-[#121620]/90 border border-gray-800 rounded-2xl p-4 h-[440px] overflow-y-auto no-scrollbar">
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-cyan-400 border-b border-gray-800 pb-2">
                  <Sparkles className="w-4 h-4" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">AI Concept Summary</h3>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-gray-800">
                  {currentVideo.summary}
                </p>

                <div>
                  <h4 className="text-xs font-bold text-gray-200 mb-2">Key Learning Milestones</h4>
                  <ul className="text-xs text-gray-400 space-y-2">
                    {currentVideo.tags.map((tag, i) => (
                      <li key={i} className="flex items-center space-x-2 bg-gray-900/60 p-2 rounded-lg border border-gray-800/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff]" />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                    Fire TV Alexa Tip:
                  </span>
                  <p className="text-xs text-gray-300">
                    Press Alexa on your remote and ask: "Alexa, summarize this lesson in 3 sentences."
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'transcript' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-300 border-b border-gray-800 pb-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">Interactive Transcript</h3>
                </div>

                {currentVideo.transcript.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-gray-900/60 hover:bg-gray-800 border border-gray-800/60 cursor-pointer transition text-xs flex items-start space-x-2.5"
                  >
                    <span className="font-mono text-cyan-400 font-bold shrink-0">{item.time}</span>
                    <p className="text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'playlist' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-gray-300">Subject Playlist</h3>
                  <span className="text-[10px] text-gray-400">{filteredVideos.length} Lessons</span>
                </div>

                {filteredVideos.map(vid => {
                  const isCurrent = vid.id === currentVideo.id;
                  return (
                    <div
                      key={vid.id}
                      onClick={() => handleSelectVideo(vid)}
                      className={`tv-focusable p-2.5 rounded-xl border flex items-center space-x-3 cursor-pointer transition ${
                        isCurrent
                          ? 'bg-[#162030] border-[#00a8e1]'
                          : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0">
                        <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                        {isCurrent && (
                          <div className="absolute inset-0 bg-[#00a8e1]/60 flex items-center justify-center">
                            <Play className="w-3 h-3 fill-white text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{vid.title}</h4>
                        <span className="text-[10px] text-gray-400">{vid.duration} • {vid.level}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
