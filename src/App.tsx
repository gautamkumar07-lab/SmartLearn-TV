import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { useTVNavigation } from './hooks/useTVNavigation';
import { FireTVHeader } from './components/FireTVHeader';
import { AlexaVoiceOverlay } from './components/AlexaVoiceOverlay';
import { VirtualRemote } from './components/VirtualRemote';
import { PageId } from './types';

// Screen Components
import { LandingPage } from './pages/LandingPage';
import { SplashScreen } from './pages/SplashScreen';
import { AuthScreen } from './pages/AuthScreen';
import { HomeScreen } from './pages/HomeScreen';
import { LearningCenterScreen } from './pages/LearningCenterScreen';
import { AIAssistantScreen } from './pages/AIAssistantScreen';
import { QuizCenterScreen } from './pages/QuizCenterScreen';
import { ProgressAnalyticsScreen } from './pages/ProgressAnalyticsScreen';
import { StudyPlannerScreen } from './pages/StudyPlannerScreen';
import { CareerGuidanceScreen } from './pages/CareerGuidanceScreen';
import { ParentDashboardScreen } from './pages/ParentDashboardScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { ProfileScreen } from './pages/ProfileScreen';

const RouteSync: React.FC = () => {
  const { activePage, setActivePage } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Sync route on location change
  useEffect(() => {
    const path = location.pathname.replace(/^\//, '');
    const validPages: PageId[] = [
      'landing',
      'splash',
      'auth',
      'home',
      'learning',
      'ai-assistant',
      'quiz',
      'analytics',
      'planner',
      'career',
      'parent',
      'settings',
      'profile'
    ];

    if (validPages.includes(path as PageId) && path !== activePage) {
      setActivePage(path as PageId);
    } else if (!path && activePage !== 'landing' && activePage !== 'home') {
      // default path
      setActivePage('home');
    }
  }, [location.pathname, activePage, setActivePage]);

  // Sync location on activePage change
  useEffect(() => {
    const targetPath = activePage === 'landing' ? '/' : `/${activePage}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath, { replace: true });
    }
  }, [activePage, location.pathname, navigate]);

  return null;
};

const MainContent: React.FC = () => {
  const { activePage, highContrast } = useApp();
  useTVNavigation();

  const showHeader = activePage !== 'splash' && activePage !== 'auth' && activePage !== 'landing';

  return (
    <div className={`min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans ${highContrast ? 'text-lg contrast-125' : ''}`}>
      <RouteSync />
      {showHeader && <FireTVHeader />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/learning" element={<LearningCenterScreen />} />
          <Route path="/ai-assistant" element={<AIAssistantScreen />} />
          <Route path="/quiz" element={<QuizCenterScreen />} />
          <Route path="/analytics" element={<ProgressAnalyticsScreen />} />
          <Route path="/planner" element={<StudyPlannerScreen />} />
          <Route path="/career" element={<CareerGuidanceScreen />} />
          <Route path="/parent" element={<ParentDashboardScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<HomeScreen />} />
        </Routes>
      </main>

      {/* Persistent Fire TV Alexa Voice Drawer */}
      <AlexaVoiceOverlay />

      {/* Virtual Fire TV Voice Remote Simulator Widget */}
      {activePage !== 'splash' && activePage !== 'landing' && <VirtualRemote />}
    </div>
  );
};

export function App() {
  return (
    <HashRouter>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </HashRouter>
  );
}

export default App;
