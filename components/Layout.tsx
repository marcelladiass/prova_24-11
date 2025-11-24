import React, { ReactNode } from 'react';
import { AppMode } from '../types';
import { 
  BeakerIcon, 
  ClipboardDocumentCheckIcon, 
  UserGroupIcon, 
  ArrowRightOnRectangleIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: ReactNode;
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentMode, setMode, onLogout }) => {
  const navItems = [
    { 
      mode: AppMode.STRATEGY, 
      label: 'Gerador de Estratégias', 
      icon: ClipboardDocumentCheckIcon,
      desc: 'IA Gemini 2.5'
    },
    { 
      mode: AppMode.PROTOTYPE_SCANNER, 
      label: 'Scanner de Receita', 
      icon: BeakerIcon,
      desc: 'Protótipo Vision'
    },
    { 
      mode: AppMode.PROTOTYPE_DASHBOARD, 
      label: 'Painel Familiar', 
      icon: UserGroupIcon,
      desc: 'Dashboard UI'
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Modern Sidebar */}
      <aside className