import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { View, Text, Image, Alert, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import estilos from './estilos';
import guestClient from '../../apiAuth/guestClient'


function CadastroUsuario({ navigation }) {


    const handleSubmit = function (values) {
        console.log("GOSTOSA "+values);
        const client = guestClient;
        client
            .post('api/users', values)
            .then(res => {
                if (res.status == 201) {
                    navigation.navigate('Login')
                }
            })
            .catch(err => {
                Alert.alert('Erro', err);
                console.log('Erro', err);
            });
    }

    return (
        <Formik
            initialValues={{ username: '', nomeCompleto: '', senha: '', cargo: 'User' }}
            validationSchema={yup.object().shape({
                username: yup
                    .string()
                    .required(),
                nomeCompleto: yup
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
                            value={values.nomeCompleto}
                            label='Nome Completo'
                            onChangeText={text => setFieldValue('nomeCompleto', text)}
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
                            color='#590b9e'
                            style={estilos.botao}
                            //disabled={!isValid}
                            onPress={handleSubmit}>
                            SALVAR
                            </Button>

                    </View>
                )

            }

        </Formik>
    );

}
export { CadastroUsuario };