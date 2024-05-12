//GerenciarVagas
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native';

const GerenciarVagas = ({ navigation }) => {
  const [nomeVaga, setNomeVaga] = useState('');
  const [salarioVaga, setSalarioVaga] = useState('');
  const [observacoesVaga, setObservacoesVaga] = useState('');
  const [vagasCadastradas, setVagasCadastradas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [vagaEditandoId, setVagaEditandoId] = useState(null);

  useEffect(() => {
    // Aqui você pode buscar as vagas cadastradas do backend ou de algum estado global
    // Exemplo de vagas cadastradas
    const vagasExemplo = [
      { id: 1, nome: 'Desenvolvedor Full-stack', salario: '7000', observacoes: 'Experiência com React e Node.js' },
      { id: 2, nome: 'Analista de Dados', salario: '6000', observacoes: 'Conhecimento em SQL e análise estatística' },
      // Adicione mais exemplos de vagas aqui, se necessário
    ];
    setVagasCadastradas(vagasExemplo);
  }, []);

  const handleCadastroVaga = () => {
    // Lógica para cadastrar a nova vaga
    // Aqui você pode enviar os dados para o backend ou atualizar o estado local, dependendo da implementação
    if (vagaEditandoId !== null) {
      // Editar vaga existente
      const vagaEditada = {
        id: vagaEditandoId,
        nome: nomeVaga,
        salario: salarioVaga,
        observacoes: observacoesVaga
      };
      const vagasAtualizadas = vagasCadastradas.map(vaga => (vaga.id === vagaEditandoId ? vagaEditada : vaga));
      setVagasCadastradas(vagasAtualizadas);
      setVagaEditandoId(null);
    } else {
      // Cadastrar nova vaga
      const novaVaga = {
        id: vagasCadastradas.length > 0 ? vagasCadastradas[vagasCadastradas.length - 1].id + 1 : 1,
        nome: nomeVaga,
        salario: salarioVaga,
        observacoes: observacoesVaga
      };
      setVagasCadastradas([...vagasCadastradas, novaVaga]);
    }
    // Limpar os campos após o cadastro
    setNomeVaga('');
    setSalarioVaga('');
    setObservacoesVaga('');
    // Exibir mensagem de sucesso por 1 segundo
    setMostrarMensagem(true);
    setTimeout(() => {
      setMostrarMensagem(false);
    }, 1000);
    // Fechar o formulário após o cadastro
    setMostrarFormulario(false);
  };

  const handleEditarPress = (vagaId) => {
    // Encontrar a vaga pelo ID
    const vagaEditando = vagasCadastradas.find(vaga => vaga.id === vagaId);
    // Preencher os campos do formulário com as informações da vaga
    setNomeVaga(vagaEditando.nome);
    setSalarioVaga(vagaEditando.salario);
    setObservacoesVaga(vagaEditando.observacoes);
    // Atualizar o estado com o ID da vaga em edição
    setVagaEditandoId(vagaId);
    // Abrir o formulário
    setMostrarFormulario(true);
  };

  const handleExcluirPress = (vagaId) => {
    // Remover a vaga pelo ID
    const vagasAtualizadas = vagasCadastradas.filter(vaga => vaga.id !== vagaId);
    setVagasCadastradas(vagasAtualizadas);
    // Atualizar IDs para não deixar um ID vago
    const vagasComIdsAtualizados = vagasAtualizadas.map((vaga, index) => ({ ...vaga, id: index + 1 }));
    setVagasCadastradas(vagasComIdsAtualizados);
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    // Limpar os campos se o formulário estiver sendo fechado
    if (!mostrarFormulario) {
      setNomeVaga('');
      setSalarioVaga('');
      setObservacoesVaga('');
      setVagaEditandoId(null);
    }
  };

  const renderVaga = ({ item }) => (
    <View style={styles.vagaContainer}>
      <View style={styles.vaga}>
        <Text style={styles.label}>Nome da Vaga:</Text>
        <Text>{item.nome}</Text>
      </View>
      <View style={styles.vaga}>
        <Text style={styles.label}>Salário da Vaga:</Text>
        <Text>{item.salario}</Text>
      </View>
      <View style={styles.vaga}>
        <Text style={styles.label}>Observações da Vaga:</Text>
        <Text>{item.observacoes}</Text>
      </View>
      <TouchableOpacity style={styles.editarButton} onPress={() => handleEditarPress(item.id)}>
        <Text style={styles.editarButtonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.excluirButton} onPress={() => handleExcluirPress(item.id)}>
        <Text style={styles.excluirButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.toggleContainer}>
        <Button title={mostrarFormulario ? 'Esconder Formulário' : 'Mostrar Formulário'} onPress={toggleFormulario} />
      </View>
      {mostrarFormulario && (
        <View style={styles.formContainer}>
          <Text style={styles.title}>{vagaEditandoId !== null ? 'Editar Vaga' : 'Cadastrar Nova Vaga'}</Text>
          <TextInput
            style={styles.input}
            value={nomeVaga}
            onChangeText={text => setNomeVaga(text)}
            placeholder="Nome da Vaga"
          />
          <TextInput
            style={styles.input}
            value={salarioVaga}
            onChangeText={text => setSalarioVaga(text)}
            placeholder="Salário da Vaga"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            value={observacoesVaga}
            onChangeText={text => setObservacoesVaga(text)}
            placeholder="Observações da Vaga"
            multiline
          />
          <Button title={vagaEditandoId !== null ? 'Salvar Edição' : 'Cadastrar Vaga'} onPress={handleCadastroVaga} />
        </View>
      )}
      {mostrarMensagem && <Text style={styles.mensagem}>Vaga cadastrada com sucesso!</Text>}
      <ScrollView style={styles.vagasScrollView}>
        <View style={styles.vagasContainer}>
          <Text style={styles.vagasTitle}>Vagas Cadastradas</Text>
          <FlatList
            data={vagasCadastradas}
            renderItem={renderVaga}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  toggleContainer: {
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
  },
  vagasScrollView: {
    maxHeight: 300, // Define a altura máxima para a barra de rolagem vertical
  },
  vagasContainer: {
    marginBottom: 20,
  },
  vagasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  vagaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  vaga: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editarButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  editarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  excluirButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  excluirButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mensagem: {
    marginTop: 10,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
});

export default GerenciarVagas;
