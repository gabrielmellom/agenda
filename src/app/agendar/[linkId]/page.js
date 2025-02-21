'use client';

import React, { useState, useEffect, use } from 'react';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import SelecionarData from '../../components/cliente/SelecionarData';
import SelecionarHorario from '../../components/cliente/SelecionarHorario';
import ConfirmarAgendamento from '../../components/cliente/ConfirmarAgendamento';

// Simulação de dados do prestador
const getPrestadorByLink = async (linkId) => {
  // Em produção, isso buscaria dados do backend
  return {
    id: 'prestador-123',
    nome: 'Dr. Exemplo',
    especialidade: 'Especialista',
    duracoes: ['1:00', '1:30', '2:00'],
    diasDisponiveis: [5, 6, 7, 8, 9, 12, 13, 14, 15],
    horariosDisponiveis: ['09:00', '10:30', '12:00', '14:30', '15:15', '16:00']
  };
};
export function generateStaticParams() {
    return [
      { linkId: 'exemplo' },
      { linkId: 'teste' },
      // Adicione outros IDs que você quer pré-renderizar
    ]
  }
export default function AgendamentoPage({ params }) {
  // Usar React.use para desempacotar params
  const unwrappedParams = use(params);
  const linkId = unwrappedParams.linkId;
  
  const [passo, setPasso] = useState(1);
  const [prestador, setPrestador] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Dados do agendamento
  const [agendamento, setAgendamento] = useState({
    data: null,
    horario: null,
    duracao: null,
    observacoes: '',
    clienteNome: '',
    clienteEmail: '',
    clienteTelefone: ''
  });
  
  // Carregar dados do prestador
  useEffect(() => {
    const carregarPrestador = async () => {
      try {
        setLoading(true);
        const dados = await getPrestadorByLink(linkId);
        setPrestador(dados);
        setLoading(false);
      } catch (error) {
        setError('Não foi possível carregar os dados de agendamento.');
        setLoading(false);
      }
    };
    
    carregarPrestador();
  }, [linkId]);
  const proximoPasso = () => {
    if (passo < 3) setPasso(passo + 1);
  };
  
  const voltarPasso = () => {
    if (passo > 1) setPasso(passo - 1);
  };
  
  const atualizarAgendamento = (dados) => {
    setAgendamento(prev => ({ ...prev, ...dados }));
  };
  
  const confirmarAgendamento = async () => {
    try {
      // Enviar dados para API
      // const resultado = await fetch('/api/agendamentos', {
      //   method: 'POST',
      //   body: JSON.stringify({ ...agendamento, prestadorId: prestador.id }),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      // Aqui você redirecionaria para página de confirmação
      alert('Agendamento confirmado! Em produção, redirecionaríamos para página de confirmação.');
    } catch (error) {
      setError('Erro ao confirmar agendamento. Tente novamente.');
    }
  };
  
  if (loading) return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen">{error}</div>;
  
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 my-10">
      {/* Barra de progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className={`font-medium ${passo >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>Escolha a data</div>
          <div className={`font-medium ${passo >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>Escolha o horário</div>
          <div className={`font-medium ${passo >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>Confirmação</div>
        </div>
        <div className="relative pt-1">
          <div className="flex h-2 overflow-hidden text-xs bg-gray-200 rounded">
            <div 
              className="flex flex-col justify-center bg-blue-500 text-white text-center whitespace-nowrap transition-all duration-500"
              style={{ width: `${passo * 33.33}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo do passo atual */}
      {passo === 1 && (
        <SelecionarData 
          prestador={prestador} 
          dataAtual={agendamento.data}
          aoSelecionarData={(data) => atualizarAgendamento({ data })}
          proximoPasso={proximoPasso}
        />
      )}
      
      {passo === 2 && (
        <SelecionarHorario 
          prestador={prestador}
          data={agendamento.data}
          horarioAtual={agendamento.horario}
          duracaoAtual={agendamento.duracao}
          observacoesAtual={agendamento.observacoes}
          aoSelecionarHorario={(dados) => atualizarAgendamento(dados)}
          proximoPasso={proximoPasso}
          voltarPasso={voltarPasso}
        />
      )}
      
      {passo === 3 && (
        <ConfirmarAgendamento 
          prestador={prestador}
          agendamento={agendamento}
          atualizarDadosCliente={(dados) => atualizarAgendamento(dados)}
          confirmarAgendamento={confirmarAgendamento}
          voltarPasso={voltarPasso}
        />
      )}
    </div>
  );
}