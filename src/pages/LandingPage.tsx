import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Tv,
  Mic,
  Bot,
  BrainCircuit,
  Sparkles,
  ArrowRight,
  Play,
  Shield,
  BarChart3,
  Globe,
  Award,
  CheckCircle2,
  Zap,
  Users,
  Compass,
  Download,
  Star,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActivePage, playAudioCue, setIsAlexaListening } = useApp();

  const handleLaunchApp = () => {
    playAudioCue('select');
    setActivePage('home');
  };

  const handleGoAuth = () => {
    playAudioCue('select');
    setActivePage('auth');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-cyan-500 selection:text-black">
      {/* Top Marketing Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#07090e]/80 backdrop-blur-xl border-b border-gray-800/80 px-6 lg:px-16 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00a8e1] to-[#00d2ff] flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">SmartLearn</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-black tracking-widest bg-[#ff9900] text-black">
                  TV & WEB
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">AI-Powered Living Room Learning</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-300">
            <a href="#features" className="hover:text-cyan-400 transition">Features</a>
            <a href="#curriculum" className="hover:text-cyan-400 transition">Curriculum</a>
            <a href="#ai-voice" className="hover:text-cyan-400 transition">Alexa & Bedrock</a>
            <a href="#pricing" className="hover:text-cyan-400 transition">Pricing</a>
            <button
              onClick={() => setActivePage('parent')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Parents
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleGoAuth}
              className="text-xs font-bold text-gray-300 hover:text-white px-4 py-2 rounded-xl transition cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={handleLaunchApp}
              className="bg-gradient-to-r from-[#00a8e1] to-[#00d2ff] hover:from-[#0092c7] hover:to-[#00bde6] text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center space-x-1.5 cursor-pointer hover:scale-105 transition-all"
            >
              <span>Launch TV App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 lg:px-16 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#00a8e1]/15 via-[#ff9900]/10 to-[#00d2ff]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Pill Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-300 mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>Built for Amazon Fire TV & Modern Web Browsers</span>
            <span className="text-gray-500">•</span>
            <span className="text-white font-bold">AWS Bedrock & Alexa Verified</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Transform Your Television Into an{' '}
            <span className="bg-gradient-to-r from-[#00d2ff] via-[#00a8e1] to-[#ff9900] bg-clip-text text-transparent">
              AI Learning Hub
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            SmartLearn TV turns living rooms into personalized classrooms. Learn using your 
            <strong className="text-cyan-300"> Fire TV Remote</strong>, ask doubts with 
            <strong className="text-cyan-300"> Alexa Voice</strong>, conquer quizzes, and receive 
            step-by-step whiteboard derivations powered by generative AI.
          </p>

          {/* Primary Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={handleLaunchApp}
              className="w-full sm:w-auto bg-[#00a8e1] hover:bg-[#0092c7] text-white font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-xl shadow-cyan-500/30 flex items-center justify-center space-x-3 cursor-pointer hover:scale-105 transition-all"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Enter Fire TV Experience</span>
            </button>

            <button
              onClick={() => {
                playAudioCue('alexa');
                setIsAlexaListening(true);
              }}
              className="w-full sm:w-auto bg-gray-900/90 hover:bg-gray-800 text-cyan-300 border border-cyan-500/40 font-bold text-sm px-7 py-4 rounded-2xl shadow-lg flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <Mic className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span>Try Alexa Voice Demo</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8 border-t border-gray-800/80 text-center">
            <div>
              <p className="text-3xl font-black text-white font-mono">1.2M+</p>
              <span className="text-xs text-gray-400">Doubts Solved by AI</span>
            </div>
            <div>
              <p className="text-3xl font-black text-cyan-400 font-mono">100%</p>
              <span className="text-xs text-gray-400">TV Remote D-Pad Ready</span>
            </div>
            <div>
              <p className="text-3xl font-black text-[#ff9900] font-mono">6 Languages</p>
              <span className="text-xs text-gray-400">English, Hindi, Punjabi & More</span>
            </div>
            <div>
              <p className="text-3xl font-black text-emerald-400 font-mono">4.9 / 5.0</p>
              <span className="text-xs text-gray-400">Amazon Appstore Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Television Interface Showcase Preview */}
      <section className="py-16 px-6 lg:px-16 bg-[#0a0d14]/70 border-y border-gray-800/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#ff9900] uppercase tracking-wider block mb-2">
              Next-Gen 10-Foot UI
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Built Specifically for the Big Screen
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              No mouse or touch required. Seamless spatial D-pad navigation, high-contrast typography, and instant audio chimes.
            </p>
          </div>

          {/* Television Frame Mockup */}
          <div className="relative mx-auto rounded-3xl p-3 bg-gradient-to-b from-gray-700 via-gray-900 to-black shadow-2xl border-4 border-gray-800 max-w-5xl">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#0b0e14] border border-gray-800 flex flex-col justify-between p-6">
              {/* Fake TV App Top Bar */}
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00a8e1] flex items-center justify-center font-black text-xs text-white">
                    SL
                  </div>
                  <span className="font-extrabold text-sm text-white">SmartLearn TV</span>
                  <span className="text-[9px] bg-[#ff9900] text-black font-black px-1.5 py-0.5 rounded">
                    FIRE TV
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span className="text-cyan-400 font-bold">Home</span>
                  <span>Learn</span>
                  <span>AI Assistant</span>
                  <span>Quizzes</span>
                  <span>Planner</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-cyan-400">
                  <Mic className="w-3.5 h-3.5" />
                  <span>Alexa Ready</span>
                </div>
              </div>

              {/* Hero Spotlight inside Mockup */}
              <div className="grid grid-cols-3 gap-6 my-auto items-center">
                <div className="col-span-2 space-y-3">
                  <span className="text-[10px] uppercase font-bold text-[#ff9900] bg-[#ff9900]/10 px-2.5 py-1 rounded border border-[#ff9900]/30">
                    Featured JEE Masterclass
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Electromagnetic Induction & Faraday’s Laws
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    Master induced EMF formulas, magnetic flux variations, and Lenz’s Law with 4K 3D animations and AI whiteboard support.
                  </p>
                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={handleLaunchApp}
                      className="bg-[#00a8e1] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 cursor-pointer shadow-lg shadow-cyan-500/30"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch on TV</span>
                    </button>
                    <button
                      onClick={() => setActivePage('quiz')}
                      className="bg-gray-800 text-gray-200 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 cursor-pointer"
                    >
                      <BrainCircuit className="w-3.5 h-3.5 text-amber-400" />
                      <span>Take Quiz</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#121620] border border-cyan-500/30 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-2">
                    <Bot className="w-4 h-4" />
                    <span>AI Doubt Solver</span>
                  </div>
                  <p className="text-[11px] text-gray-300 italic mb-2">
                    "Alexa, why does Lenz's law ensure conservation of energy?"
                  </p>
                  <div className="p-2 bg-black/60 rounded-lg font-mono text-[10px] text-cyan-300">
                    ε = - dΦ / dt
                  </div>
                </div>
              </div>

              {/* Fake TV Bottom Hint */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-800/80 pt-2">
                <span>Use Fire TV Remote D-Pad (Arrow Keys) & Center OK</span>
                <span>Press 'A' for Alexa Voice Commands</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
            Comprehensive Learning Ecosystem
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Everything Students Need to Excel
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-[#121620]/90 border border-gray-800 hover:border-cyan-500/50 rounded-3xl p-7 transition group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Bot className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Amazon Bedrock AI Tutor</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Real-time doubt solving with step-by-step mathematical derivations, formatted equations, and audio playback.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#121620]/90 border border-gray-800 hover:border-cyan-500/50 rounded-3xl p-7 transition group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Mic className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Alexa Voice Navigation</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Ask questions hands-free: "Alexa, quiz me in Physics", "Alexa, what is my study schedule?", or "Alexa, explain Quantum Tunneling".
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#121620]/90 border border-gray-800 hover:border-cyan-500/50 rounded-3xl p-7 transition group">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Interactive Speed Quizzes</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              TV remote-friendly MCQs and True/False questions with live countdown timers, instant feedback, and XP rewards.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-[#121620]/90 border border-gray-800 hover:border-cyan-500/50 rounded-3xl p-7 transition group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Progress & Weak-Area Analytics</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Visual weekly study hours bar charts, subject mastery radars, and AI diagnosis that flags weak topics with 1-click revision videos.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-[#121620]/90 border border-gray-800 hover:border-cyan-500/50 rounded-3xl p-7 transition group">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7 text-rose-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Parental Guard & Screen Limits</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              4-digit PIN-protected dashboard for parents. Set daily TV screen limits, enforce bedtime curfews, and audit AI doubts.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-[#121620]/90 border border-gray-800 hover:border-cyan-500/50 rounded-3xl p-7 transition group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Download className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Offline Storage & Multi-Language</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Save video modules to Fire TV internal storage for offline viewing. Seamlessly toggle English, Hindi, and Punjabi in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section id="curriculum" className="py-20 px-6 lg:px-16 bg-[#0a0d14]/70 border-t border-gray-800/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
              Personalized Learning Journeys
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Designed for Every Learner
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#121620] border border-gray-800 p-6 rounded-2xl">
              <span className="text-2xl mb-3 block">🎒</span>
              <h4 className="font-bold text-base text-white mb-1">School Students</h4>
              <p className="text-xs text-gray-400">Class 6–12 CBSE, ICSE, and State Boards with visual concept breakdowns.</p>
            </div>

            <div className="bg-[#121620] border border-gray-800 p-6 rounded-2xl">
              <span className="text-2xl mb-3 block">🎯</span>
              <h4 className="font-bold text-base text-white mb-1">Competitive Aspirants</h4>
              <p className="text-xs text-gray-400">JEE Main/Advanced, NEET UG, and UPSC Civil Services exam countdowns.</p>
            </div>

            <div className="bg-[#121620] border border-gray-800 p-6 rounded-2xl">
              <span className="text-2xl mb-3 block">🌾</span>
              <h4 className="font-bold text-base text-white mb-1">Rural Learners</h4>
              <p className="text-xs text-gray-400">Low-bandwidth offline mode and regional Indian languages (Hindi, Punjabi).</p>
            </div>

            <div className="bg-[#121620] border border-gray-800 p-6 rounded-2xl">
              <span className="text-2xl mb-3 block">💼</span>
              <h4 className="font-bold text-base text-white mb-1">Working Professionals</h4>
              <p className="text-xs text-gray-400">AI Engineering, Data Science, and Cloud Architecture certifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Open Source Tier */}
      <section id="pricing" className="py-24 px-6 lg:px-16 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
            Accessible Education
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Transparent, Student-First Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1 */}
          <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Community Open Source</span>
              <div className="my-4">
                <span className="text-4xl font-black text-white">$0</span>
                <span className="text-xs text-gray-400"> / Free Forever</span>
              </div>
              <ul className="text-xs text-gray-300 space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Full access to all 12 Fire TV screens</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Local AI doubt solver & whiteboard</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Interactive quizzes & leaderboard</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleLaunchApp}
              className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 font-bold text-xs uppercase tracking-wider text-white cursor-pointer"
            >
              Launch Free
            </button>
          </div>

          {/* Plan 2: Pro */}
          <div className="bg-gradient-to-b from-[#162030] to-[#121620] border-2 border-[#00a8e1] rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-cyan-500/20 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff9900] text-black text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Aspirant Pass</span>
              <div className="my-4">
                <span className="text-4xl font-black text-white">₹499</span>
                <span className="text-xs text-gray-400"> ($6) / month</span>
              </div>
              <ul className="text-xs text-gray-200 space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Unlimited Amazon Bedrock AI queries</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>National JEE / NEET mock test series</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Offline 4K video lesson downloads</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Parental analytics & weekly PDF reports</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleLaunchApp}
              className="w-full py-3.5 rounded-xl bg-[#00a8e1] hover:bg-[#0092c7] font-black text-xs uppercase tracking-wider text-white cursor-pointer shadow-lg shadow-cyan-500/30"
            >
              Start 7-Day Free Trial
            </button>
          </div>

          {/* Plan 3: Family */}
          <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Household TV Pass</span>
              <div className="my-4">
                <span className="text-4xl font-black text-white">₹899</span>
                <span className="text-xs text-gray-400"> ($11) / month</span>
              </div>
              <ul className="text-xs text-gray-300 space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Up to 5 student profiles per TV</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Multi-TV sync (Living Room & Bedroom)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Priority Alexa voice response latency</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleLaunchApp}
              className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 font-bold text-xs uppercase tracking-wider text-white cursor-pointer"
            >
              Get Family Pass
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-[#05070a] py-14 px-6 lg:px-16 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#00a8e1] flex items-center justify-center">
              <Tv className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-base text-white">SmartLearn TV</span>
            <span className="text-[10px] text-gray-500">© 2026 SmartLearn TV Education. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => setActivePage('landing')} className="hover:text-white transition">Landing</button>
            <button onClick={() => setActivePage('home')} className="hover:text-white transition">TV Dashboard</button>
            <button onClick={() => setActivePage('ai-assistant')} className="hover:text-white transition">AI Assistant</button>
            <button onClick={() => setActivePage('settings')} className="hover:text-white transition">Settings</button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 flex items-center space-x-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
