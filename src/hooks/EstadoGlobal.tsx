// Importa os hooks de contexto
import React, { createContext, useContext, useState } from 'react';

// Interface que define a estrutura de uma tarefa
interface Tarefa {
  id: number;
  titulo: string;
}

// Interface que define o contexto global de estado
interface ContextoEstadoGlobal {
  tarefas: Tarefa[];
  adicionarTarefa: (titulo: string) => void;
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
  // Define o estado inicial das tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = (titulo: string) => {
    // Cria uma nova tarefa com um ID único
    const novaTarefa: Tarefa = {
      id: Date.now(),
      titulo,
    };

    // Atualiza o estado das tarefas com a nova tarefa
    setTarefas([...tarefas, novaTarefa]);
  };

  // Função para editar o título de uma tarefa
  const editarTarefa = (id: number, novoTitulo: string) => {
    // Cria uma cópia das tarefas
    const novasTarefas = tarefas.map(tarefa =>
      // Se o ID da tarefa for igual ao ID passado, atualiza o título
      tarefa.id === id ? { ...tarefa, titulo: novoTitulo } : tarefa
    );

    // Atualiza o estado das tarefas com as novas tarefas
    setTarefas(novasTarefas);
  };

  // Função para excluir uma tarefa
  const excluirTarefa = (id: number) => {
    // Cria uma cópia das tarefas
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);

    // Atualiza o estado das tarefas com as novas tarefas
    setTarefas(novasTarefas);
  };

  // Retorna o contexto global de estado com as funções para manipular as tarefas
  return (
    <ContextoEstadoGlobal.Provider value={{ tarefas, adicionarTarefa, editarTarefa, excluirTarefa }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};