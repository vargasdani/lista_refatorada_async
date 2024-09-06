import React, { useState } from 'react';
import { Button, Input, Box, Text } from 'native-base';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';

const AdicionarTarefa: React.FC = () => {
  const { adicionarTarefa } = useEstadoGlobal();
  const [novaTarefa, setNovaTarefa] = useState('');

  const handleAdicionar = () => {
    if (novaTarefa.trim()) {
      adicionarTarefa(novaTarefa);
      setNovaTarefa(''); // Limpa o campo após adicionar a tarefa
    }
  };

  return (
    <Box
      p={4}
      borderRadius="8px"
      bg="white"
      shadow={2}
      mb={4}
      width="100%"
      alignItems="center"
    >
      <Text fontSize="lg" mb={3} color="muted.700">
        Adicione uma nova tarefa
      </Text>
      <Input
        placeholder="Digite sua tarefa"
        value={novaTarefa}
        onChangeText={setNovaTarefa}
        bg="gray.100"
        borderRadius="8px"
        py={3}
        px={4}
        fontSize="md"
        mb={3}
        _focus={{ borderColor: 'purple.500', bg: 'gray.50' }}
      />
      <Button
        onPress={handleAdicionar}
        bg="purple.600"
        _pressed={{ bg: 'purple.700' }}
        borderRadius="8px"
        px={6}
        py={3}
      >
        Adicionar Tarefa
      </Button>
    </Box>
  );
};

export default AdicionarTarefa;