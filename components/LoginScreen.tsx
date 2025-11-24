import React, { useState } from 'react';
import { HeartIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white/80 backdrop-blur-lg w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white/50 animate-fade-in">
        <div className="p-8 pb-0 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg mb-6 transform rotate-3 hover:rotate-6 transition-transform">
            <HeartIcon className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Saúde Fácil</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium uppercase tracking-wider">Ambiente de Desenvolvimento</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">ID do Engenheiro</label>
              <input 
                type="email" 
                defaultValue="eng.tecnico@saudefacil.app"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all font-medium"
                placeholder="id@empresa.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Chave de Acesso</label>
              <input 
                type="password" 
                defaultValue="password123"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="animate-pulse">Autenticando...</span>
            ) : (
              <>
                <FingerPrintIcon className="h-5 w-5 text-emerald-400" />
                <span>Acessar Workbench</span>
              </>
            )}
          </button>
        </form>
        
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400">Restrito a pessoal autorizado • v2.0.4</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;