import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Adicionando usuário fixo
  const fixedUser = {
    email: 'teste',
    password: 'teste',
  };

  const handleLogin = async () => {
    try {
      // Verificar se é o usuário fixo
      if (email === fixedUser.email && password === fixedUser.password) {
        console.log('Usuário fixo logado:', fixedUser.email);
        onLoginSuccess();
      } else {
        // Se não for o usuário fixo, tentar o login com email e senha fornecidos
        const response = await auth().signInWithEmailAndPassword(email, password);
        console.log('Usuário logado:', response.user);
        onLoginSuccess();
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Email ou senha incorretos.');
      setEmail('');
      setPassword('');
    }
  };

  const handleRegister = async () => {
    console.log('Email:', email); // Adiciona esta linha para depurar o email
    console.log('Senha:', password); // Adiciona esta linha para depurar a senha
    try {
      const response = await auth().createUserWithEmailAndPassword(email, password);
      console.log('Novo usuário registrado:', response.user);
      onLoginSuccess();
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setError('Erro ao registrar usuário. Por favor, tente novamente.');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Registrar" onPress={handleRegister} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginForm;
