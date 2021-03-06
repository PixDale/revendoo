import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { View, Text, Image, Alert, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import estilos from './estilos';
import guestClient from '../../apiAuth/guestClient'
import { useNavigation } from '@react-navigation/native';


export default function Login({ navigation }) {


    const handleSubmit = function (values) {
        const client = guestClient;
        client
            .post('login', values)
            .then(res => {
                if (res.status == 200) {
                    let user = res.data;
                    console.log('Success', 'Login realizado com sucesso.');
                    AsyncStorage.setItem('tokenData', res.data.token)
                        .then(() => {
                            navigation.navigate('Menu', { user })
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
            onSubmit={values => handleSubmit(values)}>

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
                            label='User'
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
                            style={estilos.botao}
                            onPress={() => navigation.navigate('CadastroUsuario')}>
                            CADASTRAR USUARIO
                            </Button>
                    </View>
                )

            }

        </Formik>
    );

}