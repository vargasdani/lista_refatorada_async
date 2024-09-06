import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeBaseProvider, Button, Box } from 'native-base';
import { ProvedorEstadoGlobal } from '../hooks/EstadoGlobal';
import AdicionarTarefa from '../components/AdicionarTarefa';
import ListaTarefas from '../components/ListaTarefas';
import AsyncStorage from '@react-native-community/async-storage';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Minhas Tarefas', // Título alterado
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <NativeBaseProvider>
      <ProvedorEstadoGlobal>
        <View style={{ flex: 1, padding: 20 }}>
          <AdicionarTarefa />
          <ListaTarefas />
          <Box style={styles.logoutButtonContainer}>
            <Button 
              onPress={handleLogout}
              bg="rgb(233 15 175).500" // Cor magenta
              _pressed={{ bg: 'rgb(172 11 172).400' }} // Cor mais clara ao pressionar
              _text={{ color: 'white', fontWeight: 'bold' }}
              borderRadius={8}
              mt={4}
              w="100%" // Largura de 100%
              shadow={2}
            >
              Logout
            </Button>
          </Box>
        </View>
      </ProvedorEstadoGlobal>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  logoutButtonContainer: {
    marginTop: 20,
    alignItems: 'center', // Centraliza o botão
  },
});

export default HomeScreen;