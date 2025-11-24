import React, { useState } from 'react';
import Layout from './components/Layout';
import LoginScreen from './components/LoginScreen';
import StrategyGenerator from './components/StrategyGenerator';
import ScannerPrototype from './components/ScannerPrototype';
import DashboardPrototype from './components/DashboardPrototype';
import { AppMode } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentMode, setMode] = useState<AppMode>(AppMode.STRATEGY);

  const renderContent = () => {
    switch (currentMode) {
      case AppMode.STRATEGY:
        return <StrategyGenerator />;
      case AppMode.PROTOTYPE_SCANNER:
        return <ScannerPrototype />;
      case AppMode.PROTOTYPE_DASHBOARD:
        return <DashboardPrototype />;
      default:
        return <StrategyGenerator />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Layout 
      currentMode={currentMode} 
      setMode={setMode} 
      onLogout={() => setIsLoggedIn(false)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;