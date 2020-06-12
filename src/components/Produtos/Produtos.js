import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import getLoginClient from '../../apiAuth/loggedInClient';
import estilos from './estilos';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';


function Produtos({ navigation }) {

    const [produtos, setProdutos] = useState([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        getProdutos();
    }, [])

    const getProdutos = async () => {
        var client = await getLoginClient()
        client.get("api/produtos")
            .then(res => {
                console.log(res);
                setProdutos(res.data);
            })
    };

    const visualizaProdutos = (produtoItem) => {
        navigation.navigate('ProdutoDetalhes', {
            produtoItem
        })
    }
    const listaFiltrada = produtos.filter(item => item.nome.toUpperCase().includes(busca.toUpperCase()));

    return (
        <View style={estilos.container}>
            <Searchbar
                style={estilos.input}
                placeholder="Digite o nome do produto"
                onChangeText={text => setBusca(text)}
            />
            <FlatList
                data={listaFiltrada}
                keyExtractor={item => item.produtoId.toString()}
                renderItem={
                    ({ item, index }) =>
                        //Se for o ultimo item não coloca a borda cinza embaixo
                        <TouchableOpacity
                            style={[estilos.listItem, produtos.length - 1 == index ? estilos.botaoSemBorda : estilos.botaoComBorda]}
                            onPress={() => visualizaProdutos(item)}>
                            <Image style={{ width: 50, height: 50 }}
                                source={{ uri: item.caminhoFoto }} />
                            <Text style={estilos.nome}> {item.nome} </Text>
                            <Text style={estilos.seta}> &gt; </Text>
                        </TouchableOpacity>
                }
            />
            <ActionButton buttonColor="#a037b3">
                <ActionButton.Item
                    buttonColor="#a037b3"
                    title="Novo produto"
                    onPress={() => visualizaProdutos({})}>
                    <Icon name="md-add-circle" style={estilos.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );

}

function ProdutoDetalhes({ route, navigation }) {
    const { produtoItem } = route.params;

    const [pItem, setProdutos] = useState({});

    useEffect(() => {
        setProdutos(produtoItem);
    }, [])

    const handleChangeText = (field, text) => {
        let copia = JSON.parse(JSON.stringify(pItem));
        copia[field] = text;

        if (field === 'precoCusto' || field === 'precoVenda') {
            copia[field] = parseFloat(text);
        }
        if (field === 'quantidade') {
            copia[field] = parseInt(text);
        }

        setProdutos(copia);
    }

    const handleProduto = async newProduto => {
        var client = await getLoginClient()
        if (newProduto.produtoId) {
            client.put("api/produtos/" + pItem.produtoId, JSON.stringify(pItem), { headers: { 'Content-Type': 'application/json' } })
                .then(res => {
                    console.log(res);
                    navigation.replace('Produtos');
                })
                .catch(erro => {
                    console.log(erro);
                });
        } else {
            client.post("api/produtos", JSON.stringify(pItem), { headers: { 'Content-Type': 'application/json' } })
                .then(res => {
                    console.log(res);
                    navigation.replace('Produtos');
                })
                .catch(erro => {
                    console.log(erro);
                });
        }
    }
    const handleDeleteProduto = async produtoId => {
        var client = await getLoginClient()
        client.delete("api/produtos/" + produtoId)
            .then(res => {
                console.log(res);
                navigation.replace('Produtos');
            })
            .catch(erro => {
                console.log(erro);
            });
    }

    return (
        <View style={estilos.container}>
            <ScrollView style={estilos.scrollView}>
                <TextInput
                    mode='flat'
                    value={pItem.nome}
                    label='Nome'
                    onChangeText={text => handleChangeText('nome', text)}
                />
                <TextInput
                    mode='flat'
                    value={pItem.marca}
                    label='Marca'
                    onChangeText={text => handleChangeText('marca', text)}
                />
                <TextInput
                    mode='flat'
                    value={pItem.descricao}
                    label='Descrição'
                    onChangeText={text => handleChangeText('descricao', text)}
                />
                <TextInput
                    mode='flat'
                    value={pItem.precoCusto}
                    label='Preço de Custo'
                    onChangeText={text => handleChangeText('precoCusto', text)}
                />
                <TextInput
                    mode='flat'
                    value={pItem.precoVenda}
                    label='Preço de Venda'
                    onChangeText={text => handleChangeText('precoVenda', text)}
                />
                <TextInput
                    mode='flat'
                    value={pItem.quantidade}
                    label='Quantidade'
                    onChangeText={text => handleChangeText('quantidade', text)}
                />
                <TextInput
                    mode='flat'
                    value={pItem.validade}
                    label='Validade'
                    onChangeText={text => handleChangeText('validade', text)}
                />
                {!pItem.produtoId && <TextInput
                    mode='flat'
                    value={pItem.caminhoFoto}
                    label='URL Imagem'
                    onChangeText={text => handleChangeText('caminhoFoto', text)}
                />}
                <Button
                    mode='contained'
                    color='#00059c'
                    style={[estilos.botao, { marginBottom: 10 }]}
                    onPress={() => handleProduto(pItem)}>
                    {pItem.produtoId ? 'Editar' : 'Adicionar'}
                </Button>
                {pItem.produtoId && <Button
                    mode='outlined'
                    color='#00059c'
                    style={estilos.botao}
                    onPress={() => handleDeleteProduto(pItem.produtoId)}>
                    Excluir
                        </Button>}
            </ScrollView>
        </View>
    );
}

export { ProdutoDetalhes, Produtos };