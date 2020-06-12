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
    const [listaProdutos, setListaProdutos] = useState([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        getProdutos();
    }, [])

    const getProdutos = async () => {
        var cliente = await getLoginClient()
        cliente.get("api/produtos")
            .then(res => {
                console.log(res);
                setProdutos(res.data);
                setListaProdutos(res.data);
            })
    };

    const filtrarLista = text => {
        //Testar se é necessário esse if, ou se o filter ja retorna a lista inteira 
        //caso text esteja vazio
        if (text === '') {
            setListaProdutos(produtos);
            return
        }
        const novaLista = produtos.filter(item => {
            const itemNome = `${item.nome.toUpperCase()}`;
            const textBusca = text.toUpperCase();
            return itemNome.indexOf(textBusca) > -1;
        });
        setListaProdutos(novaLista);
    };

    const visualizaProdutos = (produtoItem) => {
        navigation.navigate('ProdutoDetalhes', {
            produtoItem
        })
    }


    return (
        <View style={estilos.container}>
            <Searchbar
                style={estilos.input}
                placeholder="Digite o nome do produto"
                onChangeText={text => filtrarLista(text)}
            />
            <FlatList
                data={listaProdutos}
                keyExtractor={item => item.produtoId.toString()}
                renderItem={
                    ({ item, index }) =>
                        //Se for o ultimo item não coloca a borda cinza embaixo
                        <TouchableOpacity
                            style={[estilos.botao, produtos.length - 1 == index ? estilos.botaoSemBorda : estilos.botaoComBorda]}
                            onPress={() => visualizaProdutos(item)}>
                            <Image style = {{width: 50, height: 50}} 
                            source={{ uri: item.caminhoFoto}}/>
                            <Text style={estilos.nome}> {item.nome} </Text>
                            <Text style={estilos.seta}> &gt; </Text>
                        </TouchableOpacity>
                }
            />
            <ActionButton buttonColor="#a037b3">
                <ActionButton.Item
                    buttonColor="#a037b3"
                    title="Novo produto"
                    onPress={() => alert("Teste")}>
                    <Icon name="md-add-circle" style={estilos.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );

}

function ProdutoDetalhes({ route, navigation }) {
    const { produtoItem } = route.params;
    return (
        <View style={estilos.container}>
            <ScrollView style={estilos.scrollView}>
                <TextInput
                    mode='flat'
                    value={produtoItem.nome}
                    label='Nome'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={produtoItem.marca}
                    label='Marca'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={produtoItem.descricao}
                    label='Descrição'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={produtoItem.precoCusto}
                    label='Preço de Custo'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={produtoItem.precoVenda}
                    label='Preço de Venda'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={produtoItem.quantidade}
                    label='Quantidade'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={new Date(produtoItem.validade).toLocaleDateString()}
                    label='Validade'
                //onChangeText={text => setFieldValue('username', text)}
                />

            </ScrollView>
        </View>
    );
}

export { ProdutoDetalhes, Produtos };