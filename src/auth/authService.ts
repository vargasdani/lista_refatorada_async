import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para criar um usuário de teste
export const criarUsuarioTeste = async () => {
  try {
    const usuario = {
      username: 'usuarioTeste',
      password: 'senhaTeste',
    };
    await AsyncStorage.setItem('@usuario', JSON.stringify(usuario));
  } catch (error) {
    console.error('Erro ao criar usuário de teste:', error);
  }
};

// Função para autenticar o usuário
export const autenticarUsuario = async (username: string, password: string) => {
  try {
    const usuario = JSON.parse(await AsyncStorage.getItem('@usuario') || '{}');
    if (usuario.username === username && usuario.password === password) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return false;
  }
};

// Função para verificar se o usuário está logado
export const verificarAutenticacao = async () => {
  try {
    const usuario = await AsyncStorage.getItem('@usuario');
    return usuario !== null;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return false;
  }
};