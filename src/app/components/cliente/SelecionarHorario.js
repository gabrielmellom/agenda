'use client';
import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const SelecionarHorario = ({ 
  prestador, 
  data,
  horarioAtual, 
  duracaoAtual,
  observacoesAtual,
  aoSelecionarHorario,
  proximoPasso, 
  voltarPasso 
}) => {
  const [horarioSelecionado, setHorarioSelecionado] = useState(horarioAtual || '');
  const [duracaoSelecionada, setDuracaoSelecionada] = useState(duracaoAtual || '');
  const [observacoes, setObservacoes] = useState(observacoesAtual || '');
  
  // Dados simulados - em um cenário real viriam do prop prestador
  const horariosDisponiveis = ['09:00', '10:30', '12:00', '14:30', '15:15', '16:00', '17:30'];
  const duracoes = ['1:00', '1:30', '2:00'];
  
  const handleSelecaoHorario = (horario) => {
    setHorarioSelecionado(horario);
  };
  
  const handleSelecaoDuracao = (duracao) => {
    setDuracaoSelecionada(duracao);
  };
  
  const handleObservacoes = (e) => {
    setObservacoes(e.target.value);
  };
  
  const handleProximoPasso = () => {
    aoSelecionarHorario({
      horario: horarioSelecionado,
      duracao: duracaoSelecionada,
      observacoes: observacoes
    });
    proximoPasso();
  };
  
  return (
    <div className="transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Clock className="mr-2 h-5 w-5" /> Selecione um horário
        </h2>
        <div className="text-gray-500">Data: {data}/03/2025</div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Qual horário é melhor?</h3>
        <div className="grid grid-cols-2 gap-3 mb-6 md:grid-cols-3">
          {horariosDisponiveis.map(horario => (
            <div 
              key={horario}
              className={`p-3 border rounded-md text-center cursor-pointer transition-all ${horarioSelecionado === horario ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleSelecaoHorario(horario)}
            >
              {horario}
            </div>
          ))}
        </div>
        
        <h3 className="font-medium mb-3">Você precisa de quanto tempo?</h3>
        <div className="flex gap-3 mb-6">
          {duracoes.map(duracao => (
            <div 
              key={duracao}
              className={`flex-1 p-3 border rounded-md text-center cursor-pointer transition-all ${duracaoSelecionada === duracao ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleSelecaoDuracao(duracao)}
            >
              {duracao} hora{duracao !== '1:00' ? 's' : ''}
            </div>
          ))}
        </div>
        
        <h3 className="font-medium mb-3">Observações ou requisitos especiais</h3>
        <textarea
          className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ex: Ar condicionado no mínimo, necessito de acessibilidade, etc."
          rows={3}
          value={observacoes}
          onChange={handleObservacoes}
        />
      </div>
      
      <div className="flex justify-between">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md"
          onClick={voltarPasso}
        >
          Voltar
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={!horarioSelecionado || !duracaoSelecionada}
          onClick={handleProximoPasso}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default SelecionarHorario;