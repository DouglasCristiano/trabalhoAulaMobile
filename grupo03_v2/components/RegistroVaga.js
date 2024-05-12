//RegistroVaga
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const RegistroVaga = ({ route }) => {
  const { vagaId, nomeVaga } = route.params;
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [curriculo, setCurriculo] = useState(null);
  const [candidaturaEnviada, setCandidaturaEnviada] = useState(false);
  const [camposPreenchidos, setCamposPreenchidos] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  useEffect(() => {
    if (candidaturaEnviada) {
      const timeout = setTimeout(() => {
        navigation.navigate('Home');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [candidaturaEnviada, navigation]);

  useEffect(() => {
    if (nome && telefone && email) {
      setCamposPreenchidos(true);
    } else {
      setCamposPreenchidos(false);
    }
  }, [nome, telefone, email]);

  const handleCurriculoSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCurriculo(result.uri);
    }
  };

  const validarNome = (text) => {
    if (!text || text.length < 3 || !/^[a-zA-Z\s]*$/.test(text)) {
      setMensagemErro('Nome inválido. Deve conter pelo menos 3 letras e não pode conter caracteres especiais.');
    } else {
      setMensagemErro('');
    }
    setNome(text);
  };

  const validarTelefone = (text) => {
    if (!text || !/^\d{10,11}$/.test(text)) {
      setMensagemErro('Telefone inválido. Por favor, insira um número de telefone válido (com DDD sem o 0).');
    } else {
      setMensagemErro('');
    }
    setTelefone(text);
  };

  const validarEmail = (text) => {
    if (!text || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
      setMensagemErro('Email inválido. Por favor, insira um email válido.');
    } else {
      setMensagemErro('');
    }
    setEmail(text);
  };

  const handleSubmit = () => {
    if (camposPreenchidos) {
      setCandidaturaEnviada(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes da Vaga</Text>
      <Text style={styles.vagaLabel}>Vaga: {nomeVaga}</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={validarNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={validarTelefone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={validarEmail}
        />
        <View style={styles.buttonsContainer}>
          <Button
            title="Anexar Currículo (PDF)"
            onPress={handleCurriculoSelection}
          />
          <Button
            title="Enviar"
            onPress={handleSubmit}
            disabled={!camposPreenchidos}
          />
        </View>
        {mensagemErro !== '' && (
          <Text style={styles.mensagemErro}>{mensagemErro}</Text>
        )}
        {candidaturaEnviada && (
          <Text style={styles.mensagem}>
            Você se candidatou para a vaga de {nomeVaga}. Boa sorte!
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  vagaLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  mensagem: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
  mensagemErro: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
  },
});

export default RegistroVaga;
