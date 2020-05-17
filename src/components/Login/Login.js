import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { View, Text, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import estilos from './estilos';
import axios from 'axios';
//import { useNavigation } from '@react-navigation/native';

export default class Login extends React.Component {
    handleSubmit = (values) => {
    axios
    .post('https://revendoowebapi.azurewebsites.net/login', values)
    .then(res => {
      if (res.status == 200) {
        Alert.alert('', 'Login realizado com sucesso.');
        console.log('', 'Login realizado com sucesso.');
        AsyncStorage.setItem('token', res.data)
          .then(value => {
            navigation.navigate('Produtos');
          })
          .catch(err =>
            Alert.alert('Erro', 'Não foi possível realizar essa operação.')
          );

      }
    })
    .catch(err => {
      Alert.alert('Erro', err);
      console.log('Erro', err);
    });
    }
    render() {
        //const navigation = useNavigation();
        return (
            <Formik
            initialValues={{ username: '', senha: '' }}
            validationSchema={yup.object().shape({
                username: yup
                    .string()                    
                    .required(),
                senha: yup
                    .string()
                    .min(3)
                    .required(),
            })}
            onSubmit={values => this.handleSubmit(values)}>

            {
                ({ handleSubmit, values, setFieldValue, isValid }) => (
                    <View style={estilos.viewPrincipal}>
                        <Image
                        style={estilos.imagem}
                        source={require('../../resources/img/logo.png')} />
                        <Text style={[estilos.slogan, estilos.item]}>Sua melhor ferramenta de vendas</Text>
                            <TextInput
                                mode='flat'
                                style={estilos.input}
                                value={values.username}
                                label='E-mail'
                                onChangeText={text => setFieldValue('username', text)}
                                />

                            <TextInput
                                mode='flat'
                                style={estilos.input}
                                value={values.senha}
                                label='Senha'
                                onChangeText={text => setFieldValue('senha', text)}
                                />
                            <Button
                                mode='contained'
                                color='#00059c'
                                style={estilos.botao}
                                //disabled={!isValid}
                                onPress={handleSubmit}>
                                LOGIN
                            </Button>
                            <Button
                            mode='outlined'
                            color='#00059c'
                            style={estilos.botao}>
                                ESQUECI MINHA SENHA
                            </Button>
                            <Button
                            mode='contained'
                            color='#00059c'
                            style={estilos.botao}>
                                CADASTRAR COM E-MAIL
                            </Button>
                    </View>
                )

            }
            
            </Formik>
        );
    }
}