import { StyleSheet, Dimensions } from 'react-native';
import { screenConfig } from '../../config/config';

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 15,
        backgroundColor: '#FFFFFF'
    },
    botao: {
        flexDirection: "row",
        alignItems: "center",
        padding: 24,
        borderBottomColor: '#BBBBBB',
    },
    botaoComBorda: {
        borderBottomWidth: 1
    },
    botaoSemBorda: {
        borderBottomWidth: 0
    },
    titulo: {
        fontSize: 24,
        color: '#3333FF',
        marginRight: 20,
    },
    nome: {
        flex: 1,
        fontWeight: "bold"
    },
    seta: {
        color: '#3333FF',
        fontWeight: 'bold',
        fontSize: 20
    },
    input: {
        
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    scrollView: { 
    }
  });

  export default estilos;