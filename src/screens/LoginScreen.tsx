import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Alert, TouchableOpacity } from 'react-native';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const storedPassword = await AsyncStorage.getItem(`user_${username}`);
      
      if (storedPassword === password) {
        await AsyncStorage.setItem('token', 'fake-jwt-token');
        setErrorMessage(null);
        navigation.navigate('Home');
      } else {
        setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  const handleRegister = async () => {
    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const existingUser = await AsyncStorage.getItem(`user_${username}`);

      if (existingUser) {
        setErrorMessage('Usuário já existe.');
        return;
      }

      await AsyncStorage.setItem(`user_${username}`, password);
      Alert.alert('Conta criada com sucesso!', 'Você pode agora fazer login com sua nova conta.');
      setIsRegistering(false);
    } catch (error) {
      setErrorMessage('Erro ao criar conta. Tente novamente mais tarde.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{isRegistering ? 'Criar Conta' : 'Login'}</Text>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={isRegistering ? handleRegister : handleLogin}
        >
          <Text style={styles.buttonText}>{isRegistering ? 'Registrar' : 'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => setIsRegistering(!isRegistering)}
        >
          <Text style={styles.buttonText}>{isRegistering ? 'Voltar para Login' : 'Criar Conta'}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#6a5acd',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: '#a9a9a9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;