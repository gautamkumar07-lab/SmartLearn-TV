import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Target
} from 'lucide-react';

export const StudyPlannerScreen: React.FC = () => {
  const {
    tasks,
    toggleTask,
    addTask,
    examCountdowns,
    playAudioCue,
    addXP
  } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Physics');

  // Pomodoro Focus Timer for Fire TV
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [isFocusActive, setIsFocusActive] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (isFocusActive && focusSeconds > 0) {
      timer = setInterval(() => {
        setFocusSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsFocusActive(false);
            playAudioCue('success');
            addXP(75);
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isFocusActive, focusSeconds, playAudioCue, addXP]);

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, selectedSubject);
    setNewTaskTitle('');
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] px-8 py-6 text-white select-none pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">Study Planner & Schedules</h1>
              <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/50 px-2 py-0.5 rounded font-mono uppercase">
                EXAM PREP MODE
              </span>
            </div>
            <p className="text-xs text-gray-400">Daily TV checklist, exam countdown timers, and Fire TV focus mode</p>
          </div>
        </div>

        {/* Focus Mode Quick Pill */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-400">
            {tasks.filter(t => t.completed).length} / {tasks.length} Completed Today
          </span>
        </div>
      </div>

      {/* Row 1: Upcoming National Exam Countdowns */}
      <div className="mb-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Upcoming Target Exam Countdowns
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {examCountdowns.map(exam => (
            <div
              key={exam.id}
              className="bg-[#121620]/90 border border-gray-800 rounded-2xl p-4.5 shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white line-clamp-1">{exam.examName}</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded">
                    {exam.targetScore}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-[#00d2ff]">{exam.daysRemaining}</span>
                  <span className="text-xs text-gray-400 font-bold uppercase">Days Left</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{exam.date}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-gray-400">Readiness</span>
                  <span className="font-mono text-emerald-400 font-bold">{exam.readinessPercentage}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full"
                    style={{ width: `${exam.readinessPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Today's Tasks (2 cols) + Fire TV Focus Mode (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Schedule & Tasks (2 cols) */}
        <div className="lg:col-span-2 bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-300">
              Today's TV Study Schedule
            </h3>
            <span className="text-xs text-cyan-400 font-bold">Use Remote 'OK' to Check Off</span>
          </div>

          {/* Quick Task Creation Bar */}
          <div className="flex items-center space-x-2 mb-4 bg-black/40 p-2 rounded-2xl border border-gray-800">
            <input
              type="text"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreateTask()}
              placeholder="Add study task (e.g., 'Solve 10 Organic Chemistry reactions')..."
              className="flex-1 bg-transparent px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="bg-gray-800 text-xs text-gray-300 rounded-xl px-2 py-1.5 border border-gray-700 focus:outline-none"
            >
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="AI & CS">AI & CS</option>
            </select>
            <button
              onClick={handleCreateTask}
              className="tv-focusable bg-[#00a8e1] hover:bg-[#0092c7] px-3.5 py-1.5 rounded-xl text-xs font-bold text-white flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* Tasks List */}
          <div className="space-y-2.5">
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`tv-focusable p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  task.completed
                    ? 'bg-gray-900/40 border-gray-800/60 opacity-60'
                    : 'bg-gray-900/90 border-gray-800 hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500 shrink-0" />
                  )}
                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        task.completed ? 'line-through text-gray-400' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-[10px] text-gray-400 mt-0.5">
                      <span className="font-bold text-cyan-400 uppercase">{task.subject}</span>
                      <span>•</span>
                      <span>{task.duration}</span>
                      <span>•</span>
                      <span>Scheduled: {task.time}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    task.priority === 'high'
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fire TV Focus / Pomodoro Mode (1 col) */}
        <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between text-center">
          <div>
            <div className="flex items-center justify-center space-x-2 text-cyan-400 mb-4 pb-2 border-b border-gray-800">
              <Target className="w-4 h-4" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Fire TV Focus Mode</h3>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Blocks distractions and plays ambient study soundscapes on your TV speakers
            </p>

            {/* Circular Timer Display */}
            <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center bg-black/60 rounded-full border-4 border-cyan-500/30 shadow-inner">
              <div>
                <span className="text-4xl font-mono font-black text-cyan-300 tracking-wider">
                  {formatTimer(focusSeconds)}
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                  {isFocusActive ? 'Deep Focus Running' : '25 Min Session'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => {
                  playAudioCue('select');
                  setIsFocusActive(!isFocusActive);
                }}
                className={`tv-focusable px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-lg ${
                  isFocusActive
                    ? 'bg-amber-500 text-black shadow-amber-500/20'
                    : 'bg-[#00a8e1] text-white shadow-cyan-500/30'
                }`}
              >
                {isFocusActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isFocusActive ? 'Pause Session' : 'Start Focus'}</span>
              </button>

              <button
                onClick={() => {
                  playAudioCue('click');
                  setIsFocusActive(false);
                  setFocusSeconds(25 * 60);
                }}
                className="tv-focusable p-2.5 rounded-xl bg-gray-800 text-gray-400 hover:text-white cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2 text-[11px] text-gray-500">
              Earn +75 XP for each completed 25-minute TV focus session.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
