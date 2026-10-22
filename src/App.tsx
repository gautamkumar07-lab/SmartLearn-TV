import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { useTVNavigation } from './hooks/useTVNavigation';
import { FireTVHeader } from './components/FireTVHeader';
import { AlexaVoiceOverlay } from './components/AlexaVoiceOverlay';
import { VirtualRemote } from './components/VirtualRemote';

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

const MainApp: React.FC = () => {
  const { activePage, highContrast } = useApp();
  useTVNavigation();

  const renderActiveScreen = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'splash':
        return <SplashScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'home':
        return <HomeScreen />;
      case 'learning':
        return <LearningCenterScreen />;
      case 'ai-assistant':
        return <AIAssistantScreen />;
      case 'quiz':
        return <QuizCenterScreen />;
      case 'analytics':
        return <ProgressAnalyticsScreen />;
      case 'planner':
        return <StudyPlannerScreen />;
      case 'career':
        return <CareerGuidanceScreen />;
      case 'parent':
        return <ParentDashboardScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const showHeader = activePage !== 'splash' && activePage !== 'auth' && activePage !== 'landing';

  return (
    <div className={`min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans ${highContrast ? 'text-lg contrast-125' : ''}`}>
      {showHeader && <FireTVHeader />}
      <main className="flex-1">
        {renderActiveScreen()}
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
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
