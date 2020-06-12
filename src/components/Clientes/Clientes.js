import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import getLoginClient from '../../apiAuth/loggedInClient';
import estilos from './estilos';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

function Clientes({ navigation }) {

    const [clientes, setClientes] = useState([]);
    const [listaClientes, setListaClientes] = useState([]);
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
                setListaClientes(res.data);
            })
    };

    const filtrarLista = text => {
        //Testar se é necessário esse if, ou se o filter ja retorna a lista inteira 
        //caso text esteja vazio
        if (text === '') {
            setListaClientes(clientes);
            return
        }
        const novaLista = clientes.filter(item => {
            const itemNome = `${item.nome.toUpperCase()}`;
            const textBusca = text.toUpperCase();
            return itemNome.indexOf(textBusca) > -1;
        });
        setListaClientes(novaLista);
    };

    const visualizaCliente = (clienteItem) => {
        navigation.navigate('ClienteDetalhes', {
            clienteItem
        })
    }


    return (
        <View style={estilos.container}>
            <Searchbar
                style={estilos.input}
                placeholder="Digite o nome do cliente"
                onChangeText={text => filtrarLista(text)}
            />
            <FlatList
                data={listaClientes}
                keyExtractor={item => item.clienteId.toString()}
                renderItem={
                    ({ item, index }) =>
                        //Se for o ultimo item não coloca a borda cinza embaixo
                        <TouchableOpacity
                            style={[estilos.botao, clientes.length - 1 == index ? estilos.botaoSemBorda : estilos.botaoComBorda]}
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
                    onPress={() => alert("Teste")}>
                    <Icon name="md-person-add" style={estilos.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );

}

function ClienteDetalhes({ route, navigation }) {
    const { clienteItem } = route.params;
    return (
        <View style={estilos.container}>
            <ScrollView style={estilos.scrollView}>
                <TextInput
                    mode='flat'
                    value={clienteItem.nome}
                    label='Nome Completo'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.telefone}
                    label='Telefone'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.dataNasc}
                    label='Aniversário'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.email}
                    label='E-mail'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.cpf}
                    label='CPF'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.rg}
                    label='RG'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.cep}
                    label='CEP'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.endereco}
                    label='Endereço'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.numero}
                    label='Número'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.complemento}
                    label='Complemento'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.cidade}
                    label='Cidade'
                //onChangeText={text => setFieldValue('username', text)}
                />
                <TextInput
                    mode='flat'
                    value={clienteItem.estado}
                    label='Estado'
                //onChangeText={text => setFieldValue('username', text)}
                />
            </ScrollView>
        </View>
    );
}

export { ClienteDetalhes, Clientes };