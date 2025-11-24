import React, { useState, useEffect } from 'react';
import { generateStrategies } from '../services/geminiService';
import { Strategy } from '../types';
import { SparklesIcon, CpuChipIcon, ShieldCheckIcon, ClockIcon, LightBulbIcon } from '@heroicons/react/24/solid';

const StrategyGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [strategies, setStrategies] = useState<Strategy[] | null>(null);
  const [scenario, setScenario] = useState(
    "Um idoso vive sozinho e tem múltiplas medicações com horários complexos, além de consultas regulares com diferentes especialistas."
  );

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await generateStrategies(scenario);
      setStrategies(response.strategies);
    } catch (error) {
      alert("Erro ao gerar estratégias. Verifique a API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Laboratório de Estratégias</h1>
        <p className="text-slate-500">Utilize o Gemini 2.5 Flash para arquitetar soluções de adesão ao tratamento baseadas em cenários complexos.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center">
            <CpuChipIcon className="h-4 w-4 text-emerald-500 mr-2" />
            Parâmetros de Entrada
            </h2>
            <span className="text-xs font-mono text-slate-400">model: gemini-2.5-flash</span>
        </div>
        
        <div className="p-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Descrição do Cenário (User Persona)</label>
          <div className="relative">
            <textarea
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all h-32 text-slate-700 text-base leading-relaxed resize-none shadow-inner bg-slate-50/50"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
            />
            <div className="absolute bottom-3 right-3">
                 <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg font-semibold shadow-md flex items-center transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </span>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4 mr-2 text-emerald-400" />
                    Gerar Solução
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {strategies && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center space-x-2">
            <LightBulbIcon className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-bold text-slate-800">Estratégias Geradas</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategies.map((strat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col group"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wide ${
                        index === 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-100'
                    }`}>
                      Opção {String(index + 1).padStart(2, '0')}
                    </span>
                    {index === 0 && <ShieldCheckIcon className="h-5 w-5 text-emerald-500" title="Recomendada" />}
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-tight">{strat.title}</h3>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">{strat.description}</p>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Componentes Chave</h4>
                      <ul className="space-y-2">
                        {strat.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-sm text-slate-700">
                            <span className="mr-2 text-emerald-500 mt-1">•</span>
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50/50 p-4 border-t border-slate-100 rounded-b-2xl">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                     <ClockIcon className="h-3 w-3 mr-1" />
                     Implementação Técnica
                  </h4>
                  <p className="text-xs text-slate-600 font-mono leading-relaxed opacity-80">{strat.technicalImplementation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyGenerator;