'use client';
import React from 'react';
import { CreditCard, Check } from 'lucide-react';

const ConfirmarAgendamento = ({ 
  prestador,
  agendamento, 
  atualizarDadosCliente,
  confirmarAgendamento, 
  voltarPasso 
}) => {
  return (
    <div className="transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <CreditCard className="mr-2 h-5 w-5" /> Confirmação e Pagamento
        </h2>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="font-medium mb-3">Resumo da reserva:</h3>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Data:</span>
          <span className="font-medium">{agendamento.data}/03/2025</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Horário:</span>
          <span className="font-medium">{agendamento.horario}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Duração:</span>
          <span className="font-medium">{agendamento.duracao} hora{agendamento.duracao !== '1:00' ? 's' : ''}</span>
        </div>
        {agendamento.observacoes && (
          <div className="mt-3">
            <span className="text-gray-600">Observações:</span>
            <p className="mt-1 text-sm border-l-2 border-gray-300 pl-2">{agendamento.observacoes}</p>
          </div>
        )}
      </div>
      
      <div className="border border-gray-200 rounded-md p-4 mb-6">
        <h3 className="font-medium mb-3">Forma de pagamento</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="cartao"
              name="pagamento"
              className="mr-2"
              defaultChecked
            />
            <label htmlFor="cartao">Cartão de crédito</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="pix"
              name="pagamento"
              className="mr-2"
            />
            <label htmlFor="pix">Pix</label>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded flex justify-between">
          <span>Total a pagar:</span>
          <span className="font-bold">R$ 150,00</span>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md"
          onClick={voltarPasso}
        >
          Voltar
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center"
          onClick={confirmarAgendamento}
        >
          <Check className="mr-1 h-4 w-4" />
          Confirmar e pagar
        </button>
      </div>
    </div>
  );
};

export default ConfirmarAgendamento;