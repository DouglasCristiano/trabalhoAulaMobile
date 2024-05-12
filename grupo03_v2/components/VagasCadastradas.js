//VagasCadastradas
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VagasCadastradas = ({ route }) => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const [paginaAtual, setPaginaAtual] = useState(0);
  const [vagas, setVagas] = useState([]);
  const [fromManagePage, setFromManagePage] = useState(false);

  useEffect(() => {
    if (route.params && route.params.vagas) {
      const novasVagas = route.params.vagas.filter(vaga => !vagas.some(existingVaga => existingVaga.id === vaga.id));
      const vagasOrdenadas = ordenarVagas([...vagas, ...novasVagas]);
      setVagas(vagasOrdenadas);
    }
    if (route.params && route.params.fromManagePage) {
      setFromManagePage(route.params.fromManagePage);
    }
  }, [route.params]);

  useEffect(() => {
    const handleDimensionsChange = () => {
      const width = Dimensions.get('window').width;
      if (flatListRef.current) {
        const pageIndex = Math.ceil(flatListRef.current.contentOffset?.x / width) || 0;
        setPaginaAtual(pageIndex);
      }
    };

    Dimensions.addEventListener('change', handleDimensionsChange);

    return () => {
      Dimensions.removeEventListener('change', handleDimensionsChange);
    };
  }, []);

  const ordenarVagas = (novasVagas) => {
    const vagasFixas = [
      { id: 1, nome: 'Desenvolvedor Full-stack', salario: '7000', observacoes: 'Experiência com React e Node.js' },
      { id: 2, nome: 'Analista de Dados', salario: '6000', observacoes: 'Conhecimento em SQL e análise estatística' }
    ];
    const vagasNovasOrdenadas = novasVagas.reverse();
    return [...vagasNovasOrdenadas, ...vagasFixas];
  };

  const handleNextPage = () => {
    if (paginaAtual < vagas.length - 1) {
      const width = Dimensions.get('window').width;
      flatListRef.current.scrollToOffset({ offset: (paginaAtual + 1) * width, animated: true });
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const handlePrevPage = () => {
    if (paginaAtual > 0) {
      const width = Dimensions.get('window').width;
      flatListRef.current.scrollToOffset({ offset: (paginaAtual - 1) * width, animated: true });
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const handleRegistroPress = (vagaId, nomeVaga) => {
    navigation.navigate('RegistroVaga', { vagaId, nomeVaga });
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
      {fromManagePage && (
        <>
          <TouchableOpacity style={styles.editarButton} onPress={() => handleEditarPress(item.id)}>
            <Text style={styles.editarButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.excluirButton} onPress={() => handleExcluirPress(item.id)}>
            <Text style={styles.excluirButtonText}>Excluir</Text>
          </TouchableOpacity>
        </>
      )}
      {!fromManagePage && (
        <TouchableOpacity style={styles.registroButton} onPress={() => handleRegistroPress(item.id, item.nome)}>
          <Text style={styles.registroButtonText}>Registre-se</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={vagas}
        renderItem={renderVaga}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.paginacao}>
        <Text style={styles.paginaAtual}>{paginaAtual + 1} / {vagas.length}</Text>
      </View>
      <TouchableOpacity style={[styles.setaButton, styles.setaEsquerda]} onPress={handlePrevPage}>
        <Text>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.setaButton, styles.setaDireita]} onPress={handleNextPage}>
        <Text>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  vagaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: Dimensions.get('window').width * 0.1,
    width: Dimensions.get('window').width * 0.8,
    marginBottom: 20,
  },
  vaga: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paginacao: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginaAtual: {
    fontSize: 18,
  },
  setaButton: {
    position: 'absolute',
    top: '50%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  setaEsquerda: {
    left: Dimensions.get('window').width * 0.1 - 30,
    transform: [{ translateY: -25 }],
  },
  setaDireita: {
    right: Dimensions.get('window').width * 0.1 - 30,
    transform: [{ translateY: -25 }],
  },
  registroButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  registroButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
});

export default VagasCadastradas;
