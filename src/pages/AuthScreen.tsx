import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile } from '../types';
import { Tv, QrCode, Smartphone, Users, KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { users, currentUser, setCurrentUser, setActivePage, playAudioCue } = useApp();
  const [activationCode] = useState('SLTV-9342');
  const [activeTab, setActiveTab] = useState<'profiles' | 'activate' | 'email'>('profiles');
  const [email, setEmail] = useState('aarav.sharma@jee.edu');
  const [password, setPassword] = useState('••••••••');
  const [activated, setActivated] = useState(false);

  const handleSelectProfile = (user: UserProfile) => {
    playAudioCue('select');
    setCurrentUser(user);
    setActivePage('home');
  };

  const handleSimulateActivation = () => {
    playAudioCue('success');
    setActivated(true);
    setTimeout(() => {
      setActivePage('home');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] flex flex-col justify-center items-center px-6 py-10 relative overflow-hidden select-none">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#00a8e1]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center space-x-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00a8e1] to-[#00d2ff] flex items-center justify-center">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-black text-white">SmartLearn TV</span>
          <span className="text-xs px-2 py-0.5 rounded font-black tracking-widest bg-[#ff9900] text-black">
            SIGN IN
          </span>
        </div>
        <p className="text-sm text-gray-400">Choose how you want to sign in to your Amazon Fire TV</p>
      </div>

      {/* Tab Switcher */}
      <div className="relative z-10 flex space-x-2 bg-gray-900/80 p-1.5 rounded-2xl border border-gray-800 mb-8">
        <button
          onClick={() => {
            playAudioCue('click');
            setActiveTab('profiles');
          }}
          className={`tv-focusable px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
            activeTab === 'profiles'
              ? 'bg-[#00a8e1] text-white shadow-lg shadow-[#00a8e1]/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Quick Profiles (Demo)</span>
        </button>

        <button
          onClick={() => {
            playAudioCue('click');
            setActiveTab('activate');
          }}
          className={`tv-focusable px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
            activeTab === 'activate'
              ? 'bg-[#00a8e1] text-white shadow-lg shadow-[#00a8e1]/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>TV Code / Mobile Pair</span>
        </button>

        <button
          onClick={() => {
            playAudioCue('click');
            setActiveTab('email');
          }}
          className={`tv-focusable px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
            activeTab === 'email'
              ? 'bg-[#00a8e1] text-white shadow-lg shadow-[#00a8e1]/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Direct Login</span>
        </button>
      </div>

      {/* Content based on Active Tab */}
      <div className="relative z-10 w-full max-w-4xl">
        {activeTab === 'profiles' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-gray-200">Who is learning on this Fire TV today?</h2>
              <p className="text-xs text-gray-400 mt-1">Select a personalized profile to load customized AI curricula</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {users.map(user => {
                const isSelected = currentUser.id === user.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => handleSelectProfile(user)}
                    className={`tv-focusable text-left p-5 rounded-2xl bg-[#121620]/90 border transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'border-[#00a8e1] ring-2 ring-[#00d2ff] bg-[#162030]'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full rounded-2xl object-cover ring-2 ring-[#00a8e1]/40 group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-[#ff9900] text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                          Lv.{user.level}
                        </div>
                      </div>
                      <h3 className="font-bold text-base text-white text-center group-hover:text-cyan-300">
                        {user.name}
                      </h3>
                      <p className="text-xs text-cyan-400 font-semibold text-center mt-1">
                        {user.gradeOrTarget}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                      <span>{user.xp} XP</span>
                      <span className="text-amber-400 font-bold">🔥 {user.streakDays}d Streak</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'activate' && (
          <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
            {activated ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-white mb-2">Fire TV Successfully Paired!</h3>
                <p className="text-sm text-gray-400">Syncing learning paths and AI doubt histories...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col items-center text-center p-6 bg-black/40 rounded-2xl border border-gray-800">
                  <div className="p-4 bg-white rounded-2xl mb-4 shadow-xl">
                    <QrCode className="w-32 h-32 text-black" />
                  </div>
                  <span className="text-xs text-gray-400 font-mono">Scan with Phone Camera</span>
                </div>

                <div>
                  <span className="text-xs font-bold text-[#ff9900] tracking-wider uppercase block mb-1">
                    Easy Amazon Activation
                  </span>
                  <h3 className="text-xl font-black text-white mb-3">Pair your TV in 30 Seconds</h3>
                  <ol className="text-xs text-gray-300 space-y-2 mb-6">
                    <li>1. Visit <span className="text-cyan-400 font-mono font-bold">amazon.com/code</span> or <span className="text-cyan-400 font-mono font-bold">smartlearntv.com/activate</span></li>
                    <li>2. Sign in with your Amazon / Student account</li>
                    <li>3. Enter the 6-character activation code:</li>
                  </ol>

                  <div className="bg-black/60 border-2 border-cyan-500/50 rounded-2xl py-3 px-6 text-center mb-6">
                    <span className="text-3xl font-mono font-black tracking-widest text-[#00d2ff]">
                      {activationCode}
                    </span>
                  </div>

                  <button
                    onClick={handleSimulateActivation}
                    className="tv-focusable w-full bg-[#00a8e1] hover:bg-[#0092c7] py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-[#00a8e1]/30"
                  >
                    <span>Simulate Mobile Pairing Success</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'email' && (
          <div className="bg-[#121620]/90 border border-gray-800 rounded-3xl p-8 max-w-md mx-auto shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2 text-center">Firebase TV Authentication</h3>
            <p className="text-xs text-gray-400 mb-6 text-center">Enter your student credentials</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">Email / Student ID</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              onClick={() => {
                playAudioCue('select');
                setActivePage('home');
              }}
              className="tv-focusable w-full bg-[#00a8e1] hover:bg-[#0092c7] py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-[#00a8e1]/30"
            >
              <span>Sign In to SmartLearn TV</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* D-Pad Hint */}
      <div className="relative z-10 mt-10 text-xs text-gray-500 flex items-center space-x-2">
        <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono text-[11px] text-gray-300">
          Arrows & OK
        </span>
        <span>to navigate and select on Fire TV remote</span>
      </div>
    </div>
  );
};
