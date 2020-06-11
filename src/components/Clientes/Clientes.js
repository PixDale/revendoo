import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity } from 'react-native';
import getLoginClient from '../../apiAuth/loggedInClient';
import estilos from './estilos';
import { Searchbar } from 'react-native-paper';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
            listaClientes: [],
            busca: ''
        }
    }

    componentDidMount() {
        this.getClientes();
    }

    getClientes = async () => {
        var cliente = await getLoginClient()
        cliente.get("api/clientes")
            .then(res => {
                console.log(res);
                this.setState({
                    clientes: res.data,
                    listaClientes: res.data
                })
            })
    };

    filtrarLista = text => {
        //Testar se é necessário esse if, ou se o filter ja retorna a lista inteira 
        //caso text esteja vazio
        if (text === '') {
            this.setState({ listaClientes: this.state.clientes });
            return
        }
        const novaLista = this.state.clientes.filter(item => {
            const itemNome = `${item.nome.toUpperCase()}`;
            const textBusca = text.toUpperCase();
            return itemNome.indexOf(textBusca) > -1;
        });

        this.setState({ listaClientes: novaLista });
    };

    render() {
        return (
            <View style={estilos.container}>
                <Searchbar
                    style={estilos.input}
                    placeholder="Digite o nome do cliente"
                    onChangeText={text => this.filtrarLista(text)}
                />
                <FlatList
                    data={this.state.listaClientes}
                    keyExtractor={item => item.clienteId.toString()}
                    renderItem={
                        ({ item, index }) =>
                            //Se for o ultimo item não coloca a borda cinza embaixo
                            <TouchableOpacity style={[estilos.botao, this.state.clientes.length - 1 == index ? estilos.botaoSemBorda : estilos.botaoComBorda]}>
                                <Text style={estilos.titulo}> {item.nome.charAt(0)} </Text>
                                <Text style={estilos.nome}> {item.nome} </Text>
                                <Text style={estilos.seta}> > </Text>
                            </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}