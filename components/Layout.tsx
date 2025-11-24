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
      <aside className="w-80 bg-white border-r border-slate-200 flex-shrink-0 hidden md:flex flex-col z-20">
        <div className="p-8">
          <div className="flex items-center space-x-3 text-emerald-600 mb-8">
            <Squares2X2Icon className="h-8 w-8" />
            <span className="font-bold text-xl tracking-tight text-slate-900">Saúde Fácil</span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                Ferramentas de Engenharia
              </h3>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.mode}
                    onClick={() => setMode(item.mode)}
                    className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group ${
                      currentMode === item.mode 
                        ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mr-3 ${
                      currentMode === item.mode ? 'bg-white text-emerald-600 shadow-sm' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-600'
                    }`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">{item.label}</div>
                      <div className="text-[10px] opacity-70 font-medium">{item.desc}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
           <div className="flex items-center mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center font-bold text-slate-500 text-xs">
                ET
              </div>
              <div className="ml-3">
                <p className="text-sm font-bold text-slate-800">Eng. Técnico</p>
                <p className="text-xs text-slate-500">Lead Product Design</p>
              </div>
           </div>
           <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 text-xs font-semibold text-red-500 hover:text-red-600 py-2 hover:bg-red-50 rounded-lg transition-colors"
           >
             <ArrowRightOnRectangleIcon className="h-4 w-4" />
             <span>Encerrar Sessão</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center z-20">
          <span className="font-bold text-slate-800">Saúde Fácil</span>
          <select 
            value={currentMode} 
            onChange={(e) => setMode(e.target.value as AppMode)}
            className="text-sm border-none bg-slate-100 rounded-lg p-2"
          >
            {navItems.map(i => <option key={i.mode} value={i.mode}>{i.label}</option>)}
          </select>
        </header>

        {/* Content Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 scroll-smooth">
          <div className="max-w-5xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;