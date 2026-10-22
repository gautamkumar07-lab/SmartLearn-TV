import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  LessonVideo,
  Quiz,
  LeaderboardEntry,
  StudyTask,
  ExamCountdown,
  WeakTopic,
  SubjectMastery,
  CareerPath,
  ParentControlSettings,
  PageId,
  LanguageCode
} from '../types';
import {
  mockUsers,
  mockVideos,
  mockQuizzes,
  mockLeaderboard,
  mockStudyTasks,
  mockExamCountdowns,
  mockWeakTopics,
  mockSubjectMastery,
  mockWeeklyStudyHours,
  mockCareerPaths,
  mockParentSettings,
  uiTranslations
} from '../data/mockData';

interface AppContextType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  users: UserProfile[];
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  videos: LessonVideo[];
  currentVideo: LessonVideo;
  setCurrentVideo: (video: LessonVideo) => void;
  quizzes: Quiz[];
  activeQuiz: Quiz | null;
  setActiveQuiz: (quiz: Quiz | null) => void;
  leaderboard: LeaderboardEntry[];
  tasks: StudyTask[];
  toggleTask: (taskId: string) => void;
  addTask: (title: string, subject: string) => void;
  examCountdowns: ExamCountdown[];
  weakTopics: WeakTopic[];
  subjectMastery: SubjectMastery[];
  weeklyHours: typeof mockWeeklyStudyHours;
  careerPaths: CareerPath[];
  parentSettings: ParentControlSettings;
  updateParentSettings: (settings: Partial<ParentControlSettings>) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isAlexaListening: boolean;
  setIsAlexaListening: (val: boolean) => void;
  alexaTranscript: string;
  setAlexaTranscript: (val: string) => void;
  alexaResponse: string;
  setAlexaResponse: (val: string) => void;
  triggerAlexaCommand: (cmd: string) => void;
  downloadedVideos: string[];
  toggleDownloadVideo: (videoId: string) => void;
  isVirtualRemoteOpen: boolean;
  setIsVirtualRemoteOpen: (open: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playAudioCue: (type: 'click' | 'select' | 'success' | 'alexa') => void;
  addXP: (amount: number) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockUsers[0]);
  const [users] = useState<UserProfile[]>(mockUsers);
  const [activePage, setActivePage] = useState<PageId>('splash');
  const [videos, setVideos] = useState<LessonVideo[]>(mockVideos);
  const [currentVideo, setCurrentVideo] = useState<LessonVideo>(mockVideos[0]);
  const [quizzes] = useState<Quiz[]>(mockQuizzes);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(mockQuizzes[0]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [tasks, setTasks] = useState<StudyTask[]>(mockStudyTasks);
  const [examCountdowns] = useState<ExamCountdown[]>(mockExamCountdowns);
  const [weakTopics] = useState<WeakTopic[]>(mockWeakTopics);
  const [subjectMastery, setSubjectMastery] = useState<SubjectMastery[]>(mockSubjectMastery);
  const [weeklyHours] = useState(mockWeeklyStudyHours);
  const [careerPaths] = useState<CareerPath[]>(mockCareerPaths);
  const [parentSettings, setParentSettings] = useState<ParentControlSettings>(mockParentSettings);
  const [language, setLanguage] = useState<LanguageCode>('en');
  
  const [isAlexaListening, setIsAlexaListening] = useState(false);
  const [alexaTranscript, setAlexaTranscript] = useState('');
  const [alexaResponse, setAlexaResponse] = useState('');
  const [downloadedVideos, setDownloadedVideos] = useState<string[]>(['vid-1', 'vid-3']);
  const [isVirtualRemoteOpen, setIsVirtualRemoteOpen] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  // Audio cues using Web Audio API synthesis
  const playAudioCue = (type: 'click' | 'select' | 'success' | 'alexa') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'click') {
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'select') {
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1);
        osc.frequency.setValueAtTime(659.25, now + 0.2);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'alexa') {
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.setValueAtTime(720, now + 0.09);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const t = (key: string): string => {
    const langDict = uiTranslations[language] || uiTranslations.en;
    return langDict[key] || uiTranslations.en[key] || key;
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    playAudioCue('select');
  };

  const addTask = (title: string, subject: string) => {
    const newTask: StudyTask = {
      id: `task-${Date.now()}`,
      title,
      subject,
      time: '20:00',
      duration: '30 mins',
      completed: false,
      priority: 'medium'
    };
    setTasks(prev => [newTask, ...prev]);
    playAudioCue('success');
  };

  const updateParentSettings = (settings: Partial<ParentControlSettings>) => {
    setParentSettings(prev => ({ ...prev, ...settings }));
  };

  const toggleDownloadVideo = (videoId: string) => {
    setDownloadedVideos(prev => {
      const exists = prev.includes(videoId);
      if (exists) {
        return prev.filter(id => id !== videoId);
      } else {
        playAudioCue('success');
        return [...prev, videoId];
      }
    });
    setVideos(prev =>
      prev.map(v => (v.id === videoId ? { ...v, isDownloaded: !v.isDownloaded } : v))
    );
  };

  const addXP = (amount: number) => {
    setCurrentUser(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 400) + 1;
      return {
        ...prev,
        xp: newXp,
        coins: prev.coins + Math.floor(amount / 5),
        level: newLevel
      };
    });
    // Update leaderboard current user
    setLeaderboard(prev =>
      prev.map(item =>
        item.isCurrentUser
          ? { ...item, xp: item.xp + amount }
          : item
      ).sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }))
    );
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  const triggerAlexaCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    setIsAlexaListening(false);
    playAudioCue('alexa');
    setAlexaTranscript(command);

    let response = '';

    if (cmd.includes('quiz') || cmd.includes('test')) {
      setActivePage('quiz');
      response = 'Opening the SmartLearn TV Quiz Center. Let us test your knowledge!';
    } else if (cmd.includes('assistant') || cmd.includes('doubt') || cmd.includes('explain') || cmd.includes('ask')) {
      setActivePage('ai-assistant');
      response = 'Opening AI Study Assistant. What concept would you like me to explain?';
    } else if (cmd.includes('video') || cmd.includes('lesson') || cmd.includes('watch') || cmd.includes('learn')) {
      setActivePage('learning');
      response = 'Opening Video Learning Center. Resuming your latest lesson on Faraday’s Law.';
    } else if (cmd.includes('progress') || cmd.includes('analytics') || cmd.includes('score')) {
      setActivePage('analytics');
      response = `You have studied 85 minutes today Aarav, and your weekly mastery in Physics is 82%.`;
    } else if (cmd.includes('plan') || cmd.includes('task') || cmd.includes('schedule') || cmd.includes('countdown')) {
      setActivePage('planner');
      response = 'Here is your daily study planner. You have 3 tasks remaining and JEE is in 184 days.';
    } else if (cmd.includes('career') || cmd.includes('college') || cmd.includes('job')) {
      setActivePage('career');
      response = 'Opening Career Guidance. Top AI and Quantum Engineering pathways loaded.';
    } else if (cmd.includes('parent') || cmd.includes('screen time')) {
      setActivePage('parent');
      response = 'Opening Parent Dashboard. Daily limit is set to 3 hours.';
    } else if (cmd.includes('settings') || cmd.includes('language')) {
      setActivePage('settings');
      response = 'Opening System Settings. You can toggle Hindi, Punjabi or English anytime.';
    } else if (cmd.includes('home') || cmd.includes('dashboard')) {
      setActivePage('home');
      response = 'Taking you back to SmartLearn TV Home.';
    } else {
      // General study query
      setActivePage('ai-assistant');
      response = `Analyzing your study question: "${command}". Generating step-by-step Fire TV whiteboard explanation.`;
    }

    setAlexaResponse(response);
    speakText(response);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        activePage,
        setActivePage,
        videos,
        currentVideo,
        setCurrentVideo,
        quizzes,
        activeQuiz,
        setActiveQuiz,
        leaderboard,
        tasks,
        toggleTask,
        addTask,
        examCountdowns,
        weakTopics,
        subjectMastery,
        weeklyHours,
        careerPaths,
        parentSettings,
        updateParentSettings,
        language,
        setLanguage,
        t,
        isAlexaListening,
        setIsAlexaListening,
        alexaTranscript,
        setAlexaTranscript,
        alexaResponse,
        setAlexaResponse,
        triggerAlexaCommand,
        downloadedVideos,
        toggleDownloadVideo,
        isVirtualRemoteOpen,
        setIsVirtualRemoteOpen,
        soundEnabled,
        setSoundEnabled,
        playAudioCue,
        addXP,
        highContrast,
        setHighContrast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
