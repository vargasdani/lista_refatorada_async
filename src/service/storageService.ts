const STORAGE_KEY = '@tarefas';
export const getTarefas = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Erro ao buscar as tarefas', e);
    }
  };

  export const addTarefa = async (novaTarefa: string) => {
    try {
      const tarefasExistentes = await getTarefas();
      const novaTarefaObj = { id: Date.now(), tarefa: novaTarefa };
      const tarefasAtualizadas = [...tarefasExistentes, novaTarefaObj];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefasAtualizadas));
      return novaTarefaObj;
    } catch (e) {
      console.error('Erro ao adicionar tarefa', e);
    }
  };
  
  export const editarTarefa = async (id: number, tarefaEditada: string) => {
    try {
      const tarefasExistentes = await getTarefas();
      const tarefasAtualizadas = tarefasExistentes.map((tarefa: any) =>
        tarefa.id === id ? { ...tarefa, tarefa: tarefaEditada } : tarefa
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefasAtualizadas));
      return tarefasAtualizadas;
    } catch (e) {
      console.error('Erro ao editar tarefa', e);
    }
  };
  export const excluirTarefa = async (id: number) => {
    try {
      const tarefasExistentes = await getTarefas();
      const tarefasAtualizadas = tarefasExistentes.filter((tarefa: any) => tarefa.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefasAtualizadas));
      return tarefasAtualizadas;
    } catch (e) {
      console.error('Erro ao excluir tarefa', e);
    }
  };    
