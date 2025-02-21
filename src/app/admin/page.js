'use client';

import { Calendar, Clock, BarChart, DollarSign, Edit, Trash, CheckCircle, AlertCircle , Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  // Dados simulados
  const metricas = {
    agendamentosHoje: 3,
    agendamentosSemana: 12,
    taxaOcupacao: 68,
    receitaMes: 1850,
  };
  
  const proximosAgendamentos = [
    { id: 1, cliente: 'Marina Silva', data: '20/02/2025', hora: '10:30', duracao: '1:30', status: 'confirmado', observacoes: 'Ar condicionado no mínimo.' },
    { id: 2, cliente: 'João Paulo', data: '20/02/2025', hora: '13:00', duracao: '1:00', status: 'confirmado', observacoes: '' },
    { id: 3, cliente: 'Carla Mendes', data: '21/02/2025', hora: '09:00', duracao: '2:00', status: 'aguardando', observacoes: 'Preciso de tomada próxima.' },
  ];
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmado':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Confirmado</span>;
      case 'aguardando':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Aguardando</span>;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-500 text-xs">Hoje</p>
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar size={16} className="text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold">{metricas.agendamentosHoje}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-500 text-xs">Semana</p>
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar size={16} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold">{metricas.agendamentosSemana}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-500 text-xs">Ocupação</p>
              <div className="bg-yellow-100 p-2 rounded-full">
                <Clock size={16} className="text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold">{metricas.taxaOcupacao}%</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-500 text-xs">Receita</p>
              <div className="bg-purple-100 p-2 rounded-full">
                <DollarSign size={16} className="text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold">R${metricas.receitaMes}</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Próximos agendamentos</h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {proximosAgendamentos.map(agendamento => (
              <div key={agendamento.id} className="p-3 border rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{agendamento.cliente}</span>
                  {getStatusBadge(agendamento.status)}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {agendamento.data} • {agendamento.hora} ({agendamento.duracao}h)
                </div>
                {agendamento.observacoes && (
                  <div className="text-xs text-gray-500 bg-gray-50 p-1 rounded">
                    {agendamento.observacoes}
                  </div>
                )}
                <div className="flex justify-end mt-2">
                  <button className="p-1 text-blue-600 mr-2">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-red-600">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3">
            <Link href="/admin/agendamentos" className="text-blue-600 text-sm font-medium">
              Ver todos →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Links de agendamento</h3>
            </div>
            <div className="p-4">
              <div className="mb-3 pb-3 border-b">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">Link principal</div>
                  <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md">
                    Copiar
                  </button>
                </div>
                <div className="text-xs text-gray-600 truncate">
                  agendafacil.com/seu-nome
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notificações</h3>
            </div>
            <div className="p-4">
              <div className="flex items-start mb-3 pb-3 border-b">
                <div className="mr-3 mt-1">
                  <AlertCircle size={16} className="text-yellow-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Baixa ocupação</h4>
                  <p className="text-xs text-gray-600">Terças-feiras à tarde.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botão de ação flutuante */}
      <button className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
        <Plus size={24} color="white" />
      </button>
    </div>
  );
}