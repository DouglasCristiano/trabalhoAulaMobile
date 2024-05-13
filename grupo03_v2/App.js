// App.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './components/LoginForm';
import VagasCadastradas from './components/VagasCadastradas'; // Importe a tela VagasCadastradas
import RegistroVaga from './components/RegistroVaga';
import GerenciarVagas from './components/GerenciarVagas';
import auth from '@react-native-firebase/auth'; // Importe o módulo de autenticação do Firebase

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GerenciarVagas" component={GerenciarVagas} />
        <Stack.Screen name="VagasCadastradas" component={VagasCadastradas} />
        <Stack.Screen name="RegistroVaga" component={RegistroVaga} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = () => {
  return (
    <ImageBackground source={require('./assets/ImagemDeFundo.jpg')} style={styles.backgroundImage}>
      <AppContent />
    </ImageBackground>
  );
};

const AppContent = () => {
  const navigation = useNavigation();
  const [busca, setBusca] = useState('');
  const [vagasFixas, setVagasFixas] = useState([]); // Adicione um estado para armazenar as vagas fixas

  // Exemplo de vagas fixas
  const vagasFixasExemplo = [
    { id: 1, nome: 'Vaga 1', salario: 'R$ 3000', observacoes: 'Benefícios: Vale transporte' },
    { id: 2, nome: 'Vaga 2', salario: 'R$ 4000', observacoes: 'Benefícios: Vale alimentação' },
  ];

  const handleBuscar = () => {
    if (busca.trim() === '') {
      navigation.navigate('VagasCadastradas', { vagas: vagasFixas, busca: busca }); // Passando a busca como parâmetro
    } else {
      // Lógica de busca
      const vagasFiltradas = vagasFixas.filter(vaga => vaga.nome.toLowerCase().includes(busca.toLowerCase()));
      navigation.navigate('VagasCadastradas', { vagas: vagasFiltradas, busca: busca }); // Passando as vagas filtradas como parâmetro
    }
    setBusca(''); // Limpar a caixa de texto
  };

  const handleLoginSuccess = () => {
    navigation.navigate('GerenciarVagas');
  };

  const handleRegistrar = () => {
    navigation.navigate('RegistroVaga');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Buscar vagas de emprego:</Text>
        <TextInput
          style={styles.input}
          value={busca}
          onChangeText={text => setBusca(text)}
          placeholder="Digite a busca"
        />
        <Button title="Buscar" onPress={handleBuscar} />
      </View>
      <View style={styles.bottomContainer}>
        {/* Passando a função de sucesso de login para o componente LoginForm */}
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 1,
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default App;