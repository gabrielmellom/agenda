'use client';
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const SelecionarData = ({ prestador, dataAtual, aoSelecionarData, proximoPasso }) => {
  const [dataSelecionada, setDataSelecionada] = useState(dataAtual || '');
  
  // Dados simulados - em um cenário real viriam do prop prestador
  const diasDisponiveis = [5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30];
  
  const selecionarData = (dia) => {
    setDataSelecionada(dia);
    aoSelecionarData(dia);
  };
  
  const gerarCalendario = () => {
    const hoje = new Date();
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();
    const dias = [];
    
    // Primeiro dia do mês
    const primeiroDia = new Date(ano, mes, 1).getDay();
    // Número de dias no mês
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    
    // Adicionar espaços vazios para dias anteriores ao primeiro dia do mês
    for (let i = 0; i < primeiroDia; i++) {
      dias.push(<div key={`empty-${i}`} className="p-2 text-center text-gray-300"></div>);
    }
    
    // Adicionar dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const disponivel = diasDisponiveis.includes(dia);
      dias.push(
        <div 
          key={dia} 
          className={`p-2 text-center rounded-md cursor-pointer ${dataSelecionada === dia ? 'bg-blue-500 text-white' : disponivel ? 'hover:bg-blue-100' : 'text-gray-400 cursor-not-allowed'}`}
          onClick={() => disponivel && selecionarData(dia)}
        >
          {dia}
        </div>
      );
    }
    
    return dias;
  };
  
  return (
    <div className="transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Calendar className="mr-2 h-5 w-5" /> Selecione uma data disponível
        </h2>
        <div className="text-gray-500">Março 2025</div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-6">
        <div className="text-center font-medium text-gray-500">Dom</div>
        <div className="text-center font-medium text-gray-500">Seg</div>
        <div className="text-center font-medium text-gray-500">Ter</div>
        <div className="text-center font-medium text-gray-500">Qua</div>
        <div className="text-center font-medium text-gray-500">Qui</div>
        <div className="text-center font-medium text-gray-500">Sex</div>
        <div className="text-center font-medium text-gray-500">Sáb</div>
        {gerarCalendario()}
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        * Datas em cinza não possuem horários disponíveis
      </div>
      
      <div className="flex justify-end">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={!dataSelecionada}
          onClick={proximoPasso}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default SelecionarData;