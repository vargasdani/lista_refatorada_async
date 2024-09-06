import React, { useCallback } from "react";
import { FlatList, Text, Box, IconButton, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from "../hooks/EstadoGlobal";

// Interface que define os props do componente TarefaItem
interface TarefaItemProps {
  id: number; 
  tarefa: string; 
}

// Componente "TarefaItem" - Representa um item individual na lista de tarefas
const TarefaItem: React.FC<TarefaItemProps> = React.memo(({ id, tarefa }) => {
  const { editarTarefa, excluirTarefa } = useEstadoGlobal();
  const [editando, setEditando] = React.useState(false);
  const [novoTitulo, setNovoTitulo] = React.useState(tarefa);

  // Função para alternar entre editar e salvar
  const handleEditar = useCallback(() => {
    if (editando) {
      editarTarefa(id, novoTitulo);
    }
    setEditando(prev => !prev);
  }, [editando, novoTitulo, id, editarTarefa]);

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      p={4}
      my={2}
      mx={4}
      borderRadius={12}
      shadow={2}
      borderWidth={1}
      borderColor="gray.300"
    >
      {editando ? (
        <Input
          flex={3}
          value={novoTitulo}
          onChangeText={setNovoTitulo}
          fontSize={18}
          variant="unstyled"
          placeholder="Digite a nova tarefa"
          _focus={{
            borderColor: "gray.400",
          }}
        />
      ) : (
        <Text flex={3} fontSize={18} color="gray.700">{tarefa}</Text>
      )}

      <IconButton
        icon={<Ionicons name={editando ? "checkmark" : "pencil"} size={18} color="#402291" />}
        onPress={handleEditar}
        borderRadius="full"
        _icon={{
          color: editando ? "#34C759" : "#FFA500",
        }}
        bg="transparent"
      />

      <IconButton
        icon={<Ionicons name="trash" size={18} color="#402291" />}
        onPress={() => excluirTarefa(id)}
        borderRadius="full"
        _icon={{
          color: "#FF3B30",
        }}
        bg="transparent"
      />
    </Box>
  );
});

// Componente "ListaTarefas" - Exibe a lista completa de tarefas
const ListaTarefas: React.FC = () => {
  const { tarefas } = useEstadoGlobal();

  // Função renderizadora de itens da lista
  const renderItem = useCallback(({ item }: { item: TarefaItemProps }) => (
    <TarefaItem id={item.id} tarefa={item.tarefa} />
  ), []);

  return (
    <FlatList
      data={tarefas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}
      style={{ width: '100%', backgroundColor: '#EFEFF4' }}
      ListEmptyComponent={<Text color="gray.500" textAlign="center" mt={4}>Nenhuma tarefa encontrada</Text>}
    />
  );
};

export default ListaTarefas;