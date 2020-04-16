import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { View, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import estilos from './estilos';

export default class Login extends React.Component {
    handleSubmit = (values) => {
        console.log(values);
    }
    render() {
        return (
            <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={yup.object().shape({
                email: yup
                    .string()
                    .email()
                    .required(),
                password: yup
                    .string()
                    .min(6)
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
                                value={values.email}
                                label='E-mail'
                                onChangeText={text => setFieldValue('email', text)}
                                />

                            <TextInput
                                mode='flat'
                                style={estilos.input}
                                value={values.password}
                                label='Senha'
                                onChangeText={text => setFieldValue('password', text)}
                                />
                            <Button
                                mode='contained'
                                color='#00059c'
                                style={estilos.botao}
                                disabled={!isValid}
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