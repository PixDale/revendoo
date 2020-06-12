import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import estilos from './estilos';


function Menu({ navigation, route }) {


    return (

        <View style={estilos.container}>

            <Text style={{ fontSize: 24, textAlign: 'center'}}>
                Usuário: <Text style={{color:'#5c10a0'}}> {route.params.user.userDetails.nomeCompleto} </Text>
            </Text>

            <Button style={estilos.botao}
                mode='contained'
                title="Clientes"
                textAlign='center'
                color='#00059c'
                type="Solid"
                onPress={() => navigation.navigate('Clientes')}

            >Clientes</Button>
            
            <Button style={estilos.botao}
                mode='contained'
                title="Produtos"
                textAlign='center'
                color='#00059c'
                type="Solid"
                onPress={() => navigation.navigate('Produtos')}
            >Produtos</Button>
        </View>
    );

}

export { Menu };