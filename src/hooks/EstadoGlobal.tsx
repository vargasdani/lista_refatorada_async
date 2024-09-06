import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrigir importação para '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useState, useEffect } from 'react';

// Interface que define a estrutura de uma tarefa
interface Tarefa {
  id: number;
  tarefa: string;
}

// Interface que define o contexto global de estado
interface ContextoEstadoGlobal {
  tarefas: Tarefa[];
  adicionarTarefa: (tarefa: string) => void;
  editarTarefa: (id: number, novoTitulo: string) => void;
  excluirTarefa: (id: number) => void;
}

// Cria o contexto global de estado
const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  tarefas: [],
  adicionarTarefa: () => {},
  editarTarefa: () => {},
  excluirTarefa: () => {},
});

// Hook para acessar o contexto global de estado
export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

// Componente que fornece o contexto global de estado para seus filhos
export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Função para carregar as tarefas do AsyncStorage
  const carregarTarefas = async () => {
    try {
      const tarefasArmazenadas = await AsyncStorage.getItem('tarefas');
      console.log('Tarefas carregadas do AsyncStorage:', tarefasArmazenadas); // Log para depuração
      if (tarefasArmazenadas) {
        setTarefas(JSON.parse(tarefasArmazenadas));
      }
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  };

  // Função para salvar tarefas no AsyncStorage
  const salvarTarefas = async (tarefasAtualizadas: Tarefa[]) => {
    try {
      await AsyncStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
      setTarefas(tarefasAtualizadas); // Atualiza o estado global após salvar
    } catch (error) {
      console.error('Erro ao salvar as tarefas:', error);
    }
  };

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = (tarefa: string) => {
    const novaTarefa = { id: Date.now(), tarefa };
    const novasTarefas = [...tarefas, novaTarefa];
    salvarTarefas(novasTarefas);
  };

  // Função para editar o título de uma tarefa
  const editarTarefa = (id: number, novoTitulo: string) => {
    const novasTarefas = tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, tarefa: novoTitulo } : tarefa
    );
    salvarTarefas(novasTarefas);
  };

  // Função para excluir uma tarefa
  const excluirTarefa = (id: number) => {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
    salvarTarefas(novasTarefas);
  };

  // Carrega as tarefas do AsyncStorage na inicialização
  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <ContextoEstadoGlobal.Provider value={{ tarefas, adicionarTarefa, editarTarefa, excluirTarefa }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};