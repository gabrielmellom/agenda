'use client' 
import React, { useState } from 'react';
import { Clock, Plus, Save, Trash, AlertCircle } from 'lucide-react';

const ConfiguracaoHorarios = () => {
  const diasSemana = [
    { id: 0, nome: 'Domingo' },
    { id: 1, nome: 'Segunda' },
    { id: 2, nome: 'Terça' },
    { id: 3, nome: 'Quarta' },
    { id: 4, nome: 'Quinta' },
    { id: 5, nome: 'Sexta' },
    { id: 6, nome: 'Sábado' }
  ];

  const [horarios, setHorarios] = useState({
    1: [{ inicio: '09:00', fim: '12:00' }, { inicio: '14:00', fim: '18:00' }],
    2: [{ inicio: '09:00', fim: '12:00' }, { inicio: '14:00', fim: '18:00' }],
    3: [{ inicio: '09:00', fim: '12:00' }, { inicio: '14:00', fim: '18:00' }],
    4: [{ inicio: '09:00', fim: '12:00' }, { inicio: '14:00', fim: '18:00' }],
    5: [{ inicio: '09:00', fim: '12:00' }, { inicio: '14:00', fim: '18:00' }],
    6: [],
    0: []
  });
  
  const [diaAtivo, setDiaAtivo] = useState(1);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const adicionarIntervalo = (dia) => {
    setHorarios({
      ...horarios,
      [dia]: [...horarios[dia], { inicio: '09:00', fim: '18:00' }]
    });
  };

  const removerIntervalo = (dia, indice) => {
    setHorarios({
      ...horarios,
      [dia]: horarios[dia].filter((_, i) => i !== indice)
    });
  };

  const atualizarHorario = (dia, indice, campo, valor) => {
    const novosHorarios = { ...horarios };
    novosHorarios[dia][indice][campo] = valor;
    setHorarios(novosHorarios);
  };

  const copiarParaTodos = () => {
    const horariosDoDiaAtivo = [...horarios[diaAtivo]];
    const novosHorarios = { ...horarios };
    
    diasSemana.forEach(dia => {
      if (dia.id !== diaAtivo) {
        novosHorarios[dia.id] = [...horariosDoDiaAtivo];
      }
    });
    
    setHorarios(novosHorarios);
    setMensagem({ tipo: 'sucesso', texto: 'Horários copiados para todos os dias!' });
    setTimeout(() => setMensagem(null), 3000);
  };

  const salvarHorarios = () => {
    setSalvando(true);
    
    // Simulação de salvamento no backend
    setTimeout(() => {
      setSalvando(false);
      setMensagem({ tipo: 'sucesso', texto: 'Horários salvos com sucesso!' });
      setTimeout(() => setMensagem(null), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Clock className="mr-2" size={20} /> Configuração de Horários
        </h2>
        <button 
          onClick={salvarHorarios}
          disabled={salvando}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Save size={16} className="mr-1" />
          {salvando ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
      
      {mensagem && (
        <div className={`p-3 mb-4 rounded-md ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {mensagem.texto}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-4 md:mb-0 md:pr-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-3">Dias da semana</h3>
            <div className="space-y-2">
              {diasSemana.map(dia => (
                <div
                  key={dia.id}
                  className={`p-3 rounded-md cursor-pointer transition-all ${diaAtivo === dia.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-100'}`}
                  onClick={() => setDiaAtivo(dia.id)}
                >
                  <div className="flex justify-between items-center">
                    <span>{dia.nome}</span>
                    <span className="text-sm text-gray-500">
                      {horarios[dia.id].length > 0 
                        ? `${horarios[dia.id].length} ${horarios[dia.id].length === 1 ? 'período' : 'períodos'}`
                        : 'Indisponível'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={copiarParaTodos}
                className="w-full p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              >
                Copiar horários para todos os dias
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">{diasSemana.find(d => d.id === diaAtivo)?.nome}</h3>
              <button
                onClick={() => adicionarIntervalo(diaAtivo)}
                className="flex items-center text-blue-600 text-sm"
              >
                <Plus size={16} className="mr-1" />
                Adicionar período
              </button>
            </div>
            
            {horarios[diaAtivo].length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <AlertCircle size={32} className="mb-2" />
                <p>Sem horários definidos para este dia</p>
                <button
                  onClick={() => adicionarIntervalo(diaAtivo)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                >
                  Adicionar período
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {horarios[diaAtivo].map((intervalo, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Início</label>
                      <input
                        type="time"
                        value={intervalo.inicio}
                        onChange={(e) => atualizarHorario(diaAtivo, i, 'inicio', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="text-gray-400">até</div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Fim</label>
                      <input
                        type="time"
                        value={intervalo.fim}
                        onChange={(e) => atualizarHorario(diaAtivo, i, 'fim', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex-grow"></div>
                    <button
                      onClick={() => removerIntervalo(diaAtivo, i)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-4 pt-3 border-t text-sm text-gray-500 flex items-start">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>
                Configure os horários em que você estará disponível para atendimento. 
                Clientes só poderão agendar dentro destes períodos.
              </p>
            </div>
          </div>
          
          <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
            <h3 className="font-medium mb-2 text-blue-800">Duração das sessões</h3>
            <p className="text-sm text-blue-700 mb-3">
              Defina as durações de sessão que você oferece:
            </p>
            
            <div className="flex flex-wrap gap-2">
              <div className="bg-white border border-blue-200 rounded-md p-2 px-3 text-sm flex items-center">
                <span>1 hora</span>
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Padrão</span>
              </div>
              <div className="bg-white border border-blue-200 rounded-md p-2 px-3 text-sm">
                1:30 horas
              </div>
              <div className="bg-white border border-blue-200 rounded-md p-2 px-3 text-sm">
                2 horas
              </div>
              <button className="bg-white border border-dashed border-blue-300 text-blue-600 rounded-md p-2 px-3 text-sm flex items-center">
                <Plus size={14} className="mr-1" />
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracaoHorarios;