
import React, { useState } from 'react';
import { ArrowRightIcon, EnvelopeIcon, LockClosedIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('eng.tecnico@saudefacil.app');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Column - Visual & Brand */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-16 text-white">
        {/* Abstract Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0" 
            style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
                backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        {/* Content z-index 10 */}
        <div className="relative z-10">
          <div className="flex items-center space-x-3 text-emerald-400 mb-8">
            <Squares2X2Icon className="h-8 w-8" />
            <span className="font-bold text-xl tracking-tight text-white">Saúde Fácil</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Engenharia aplicada à <span className="text-emerald-400">qualidade de vida</span>.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Acesse o painel de desenvolvimento para gerenciar estratégias de adesão, calibrar algoritmos de visão computacional e monitorar métricas familiares.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-4 text-sm text-slate-500 font-medium">
          <span>© 2024 Saúde Fácil Inc.</span>
          <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
          <span>v2.1.0-beta</span>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          
          <div className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-6">
                <div className="p-3 bg-slate-900 rounded-xl inline-flex">
                    <Squares2X2Icon className="h-8 w-8 text-emerald-400" />
                </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bem-vindo de volta</h1>
            <p className="text-slate-500 mt-2">Entre com suas credenciais de engenheiro.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Corporativo</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    placeholder="nome@empresa.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700">Senha</label>
                  <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Esqueceu?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    defaultValue="password123"
                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Autenticando...</span>
                </div>
              ) : (
                <div className="flex items-center">
                    <span>Acessar Workbench</span>
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Acesso Restrito</span>
            </div>
          </div>

          <p className="text-center text-sm text-slate-400">
            Problemas com o acesso? <a href="#" className="font-medium text-slate-600 hover:text-slate-800 underline decoration-slate-300 underline-offset-4">Contate o Suporte de TI</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
