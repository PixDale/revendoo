import React, { useState, useEffect, Fragment } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import getLoginClient from '../../apiAuth/loggedInClient';
import estilos from './estilos';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

function Clientes({ navigation }) {

    const [clientes, setClientes] = useState([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        getClientes();
    }, [])

    const getClientes = async () => {
        var cliente = await getLoginClient()
        cliente.get("api/clientes")
            .then(res => {
                console.log(res);
                setClientes(res.data);
            })
    };

    const visualizaCliente = (clienteItem) => {
        navigation.navigate('ClienteDetalhes', {
            clienteItem
        })
    }
    const listaFiltrada = clientes.filter(item => item.nome.toUpperCase().includes(busca.toUpperCase()));

    return (
        <View style={estilos.container}>
            <Searchbar
                style={estilos.input}
                placeholder="Digite o nome do cliente"
                onChangeText={text => setBusca(text)}
            />
            <FlatList
                data={listaFiltrada}
                keyExtractor={item => item.clienteId.toString()}
                renderItem={
                    ({ item, index }) =>
                        //Se for o ultimo item não coloca a borda cinza embaixo
                        <TouchableOpacity
                            style={[estilos.listItem, clientes.length - 1 == index ? estilos.botaoSemBorda : estilos.botaoComBorda]}
                            onPress={() => visualizaCliente(item)}>
                            <Text style={estilos.titulo}> {item.nome.charAt(0)} </Text>
                            <Text style={estilos.nome}> {item.nome} </Text>
                            <Text style={estilos.seta}> &gt; </Text>
                        </TouchableOpacity>
                }
            />
            <ActionButton buttonColor="#a037b3">
                <ActionButton.Item
                    buttonColor="#a037b3"
                    title="Novo cliente"
                    onPress={() => visualizaCliente({})}>
                    <Icon name="md-person-add" style={estilos.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );

}

function ClienteDetalhes({ route, navigation }) {
    const { clienteItem } = route.params;

    const [cItem, setClientes] = useState({});

    useEffect(() => {
        setClientes(clienteItem);
    }, [])

    const handleChangeText = (field, text) => {
        let copia = JSON.parse(JSON.stringify(cItem));
        copia[field] = field === 'numero' ? +text : text;
        setClientes(copia);
    }

    const handleCliente = async newCliente => {
        var client = await getLoginClient()
        if (newCliente.clienteId) {
            client.put("api/clientes/" + cItem.clienteId, JSON.stringify(cItem), { headers: { 'Content-Type': 'application/json' } })
                .then(res => {
                    console.log(res);
                    navigation.replace('Clientes');
                })
                .catch(erro => {
                    console.log(erro);
                });
        } else {
            client.post("api/clientes", JSON.stringify(cItem), { headers: { 'Content-Type': 'application/json' } })
                .then(res => {
                    console.log(res);
                    navigation.replace('Clientes');
                })
                .catch(erro => {
                    console.log(erro);
                });
        }
    }
    const handleDeleteCliente = async clienteId => {
        var client = await getLoginClient()
        client.delete("api/clientes/" + clienteId)
            .then(res => {
                console.log(res);
                navigation.replace('Clientes');
            })
            .catch(erro => {
                console.log(erro);
            });
    }

    return (
        <View style={estilos.container}>
            <ScrollView style={estilos.scrollView}>

                <TextInput
                    style={estilos.inputDetalhes}
                    mode='flat'
                    value={cItem.nome}
                    label='Nome Completo'
                    onChangeText={text => handleChangeText('nome', text)}
                />
                <View style={estilos.inline}>
                    <TextInput
                        style={[estilos.inputDetalhes, estilos.inlineItem]}
                        mode='flat'
                        value={cItem.telefone}
                        label='Telefone'
                        onChangeText={text => handleChangeText('telefone', text)}
                    />
                    <View style={estilos.centerItem}></View>
                    <TextInput
                        style={[estilos.inputDetalhes, estilos.inlineItem]}
                        mode='flat'
                        value={cItem.dataNasc}
                        label='Aniversário'
                        onChangeText={text => handleChangeText('dataNasc', text)}
                    />
                </View>
                <TextInput
                    style={estilos.inputDetalhes}
                    mode='flat'
                    value={cItem.email}
                    label='E-mail'
                    onChangeText={text => handleChangeText('email', text)}
                />
                <TextInput
                    style={estilos.inputDetalhes}
                    mode='flat'
                    value={cItem.cpf}
                    label='CPF'
                    onChangeText={text => handleChangeText('cpf', text)}
                />
                <TextInput
                    style={estilos.inputDetalhes}
                    mode='flat'
                    value={cItem.rg}
                    label='RG'
                    onChangeText={text => handleChangeText('rg', text)}
                />
                <TextInput
                    style={estilos.inputDetalhes}
                    mode='flat'
                    value={cItem.cep}
                    label='CEP'
                    onChangeText={text => handleChangeText('cep', text)}
                />
                <TextInput
                    style={estilos.inputDetalhes}
                    mode='flat'
                    value={cItem.endereco}
                    label='Endereço'
                    onChangeText={text => handleChangeText('endereco', text)}
                />
                <View style={estilos.inline}>
                    <TextInput
                        style={[estilos.inputDetalhes, estilos.inlineItem]}
                        mode='flat'
                        value={cItem.numero}
                        label='Número'
                        onChangeText={text => handleChangeText('numero', text)}
                    />
                    <View style={estilos.centerItem}></View>
                    <TextInput
                        style={[estilos.inputDetalhes, estilos.inlineItem]}
                        mode='flat'
                        value={cItem.complemento}
                        label='Complemento'
                        onChangeText={text => handleChangeText('complemento', text)}
                    />
                </View>
                <View style={estilos.inline}>
                    <TextInput
                        style={[estilos.inputDetalhes, estilos.inlineItem]}
                        mode='flat'
                        value={cItem.cidade}
                        label='Cidade'
                        onChangeText={text => handleChangeText('cidade', text)}
                    />
                    <View style={estilos.centerItem}></View>
                    <TextInput
                        style={[estilos.inputDetalhes, estilos.inlineItem]}
                        mode='flat'
                        value={cItem.estado}
                        label='Estado'
                        onChangeText={text => handleChangeText('estado', text)}
                    />
                </View>
                <Button
                    mode='contained'
                    color='#00059c'
                    style={[estilos.botao, { marginBottom: 10 }]}
                    onPress={() => handleCliente(cItem)}>
                    {cItem.clienteId ? 'Editar' : 'Adicionar'}
                </Button>
                {cItem.clienteId && <Button
                    mode='outlined'
                    color='#00059c'
                    style={estilos.botao}
                    onPress={() => handleDeleteCliente(cItem.clienteId)}>
                    Excluir
                            </Button>}
            </ScrollView>
        </View>
    );
}

export { ClienteDetalhes, Clientes };