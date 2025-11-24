import React, { useState, useRef } from 'react';
import { analyzePrescription, fileToBase64 } from '../services/geminiService';
import { Medication } from '../types';
import { CameraIcon, ArrowPathIcon, CheckCircleIcon, PlusIcon } from '@heroicons/react/24/solid';

const ScannerPrototype: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setAnalyzing(true);
        const base64 = await fileToBase64(file);
        setImage(`data:${file.type};base64,${base64}`);
        
        // Call Gemini
        const meds = await analyzePrescription(base64, file.type);
        setMedications(meds);
      } catch (e) {
        console.error(e);
        alert("Erro ao analisar imagem.");
      } finally {
        setAnalyzing(false);
      }
    }
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Phone Mockup Left */}
      <div className="bg-white rounded-3xl shadow-2xl border-8 border-gray-900 overflow-hidden relative max-w-sm mx-auto w-full aspect-[9/19]">
        <div className="bg-gray-900 h-6 w-40 mx-auto rounded-b-xl absolute top-0 left-1/2 transform -translate-x-1/2 z-20"></div>
        
        {/* App Screen */}
        <div className="h-full bg-slate-50 flex flex-col pt-12">
          <div className="px-6 mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Nova Receita</h2>
            <p className="text-sm text-slate-500">Tire uma foto para agendar automaticamente.</p>
          </div>

          <div className="flex-1 px-4 flex flex-col items-center justify-center bg-slate-100 m-4 rounded-2xl border-2 border-dashed border-slate-300 relative overflow-hidden group">
            {image ? (
              <img src={image} alt="Prescription" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6">
                <CameraIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">Toque para escanear</p>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
            
            <button 
              onClick={triggerInput}
              className="absolute inset-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"
            />
            
            {analyzing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                <ArrowPathIcon className="h-10 w-10 animate-spin mb-2" />
                <span className="font-semibold animate-pulse">Processando com IA...</span>
              </div>
            )}
          </div>

          <div className="p-4 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] min-h-[40%]">
             <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
             <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center justify-between">
                Medicamentos Identificados
                <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full">{medications.length}</span>
             </h3>
             
             <div className="space-y-3 overflow-y-auto max-h-[300px]">
                {medications.length === 0 && !analyzing && (
                    <div className="text-center text-gray-400 py-8 text-sm">
                        Nenhuma receita escaneada ainda.
                    </div>
                )}
                {medications.map((med, idx) => (
                  <div key={idx} className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mr-3 flex-shrink-0">
                      <PlusIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-700">{med.name}</p>
                      <p className="text-xs text-slate-500">{med.dosage} • {med.frequency}</p>
                    </div>
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Description Right */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Módulo de Visão Computacional</h1>
        <div className="prose text-gray-600">
          <p className="mb-4">
            Este protótipo demonstra a estratégia de <strong>Escaneamento de Receita</strong>.
            Utilizando o modelo multimodal <code>gemini-2.5-flash</code>, o aplicativo consegue:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Identificar nomes comerciais e genéricos de medicamentos em fotos (mesmo manuscritas).</li>
            <li>Extrair dosagens e frequências para configurar alarmes automaticamente.</li>
            <li>Retornar dados estruturados (JSON) para integração imediata com o calendário do usuário.</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
            <h4 className="font-bold text-blue-700 text-sm mb-1">Nota Técnica</h4>
            <p className="text-xs text-blue-600">
              A análise ocorre em tempo real. O sistema infere horários baseados na frequência (ex: "8 em 8 horas" cria alarmes às 08:00, 16:00 e 00:00).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerPrototype;
