import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  UserCircleIcon, 
  BellAlertIcon, 
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

const DashboardPrototype: React.FC = () => {
  // Mock data representing adherence levels for the family/caregiver view
  const adherenceData = [
    { day: 'Seg', adherence: 100 },
    { day: 'Ter', adherence: 90 },
    { day: 'Qua', adherence: 100 },
    { day: 'Qui', adherence: 65 }, // Missed dose
    { day: 'Sex', adherence: 100 },
    { day: 'Sáb', adherence: 100 },
    { day: 'Dom', adherence: 100 },
  ];

  const alerts = [
    { type: 'refill', message: 'Losartana está acabando (3 dias restantes)', urgent: true },
    { type: 'missed', message: 'Dose da tarde de Quinta-feira não confirmada', urgent: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Painel Familiar</h2>
          <p className="text-gray-500">Monitoramento remoto para cuidadores</p>
        </div>
        <div className="flex space-x-2">
           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
             <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
             Sistema Online
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="relative">
             <UserCircleIcon className="h-16 w-16 text-gray-300" />
             <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Sr. Antônio Silva</h3>
            <p className="text-sm text-gray-500">78 anos • Hipertensão, Diabetes</p>
            <button className="text-teal-600 text-xs font-semibold mt-1 hover:underline">Ver perfil médico</button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2 flex justify-around items-center">
           <div className="text-center">
             <p className="text-sm text-gray-400 uppercase font-semibold">Adesão Semanal</p>
             <p className="text-3xl font-bold text-teal-600">92%</p>
           </div>
           <div className="h-12 w-px bg-gray-200"></div>
           <div className="text-center">
             <p className="text-sm text-gray-400 uppercase font-semibold">Próx. Consulta</p>
             <p className="text-3xl font-bold text-blue-600">14 Out</p>
             <p className="text-xs text-gray-400">Cardiologista</p>
           </div>
           <div className="h-12 w-px bg-gray-200"></div>
           <div className="text-center">
             <p className="text-sm text-gray-400 uppercase font-semibold">Estoque Crítico</p>
             <p className="text-3xl font-bold text-orange-500">1</p>
             <p className="text-xs text-gray-400">Medicamento</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center">
            <CalendarDaysIcon className="h-5 w-5 mr-2 text-teal-500" />
            Histórico de Medicamentos
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adherenceData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Bar dataKey="adherence" radius={[4, 4, 0, 0]}>
                  {adherenceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.adherence < 100 ? '#FDBA74' : '#2DD4BF'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Dias com falha aparecem em laranja.</p>
        </div>

        {/* Notifications Column */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
           <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <BellAlertIcon className="h-5 w-5 mr-2 text-red-400" />
            Alertas Ativos
          </h3>
          
          <div className="space-y-3 flex-1">
            {alerts.map((alert, i) => (
              <div key={i} className={`p-4 rounded-lg border-l-4 ${alert.urgent ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-400'}`}>
                <p className={`font-semibold text-sm ${alert.urgent ? 'text-red-800' : 'text-yellow-800'}`}>
                  {alert.message}
                </p>
                <button className="text-xs font-bold mt-2 uppercase tracking-wide opacity-70 hover:opacity-100">
                   Resolver
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
             <button className="w-full flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 py-3 rounded-lg hover:bg-blue-100 transition-colors">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                <span>Contactar Sr. Antônio</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPrototype;
