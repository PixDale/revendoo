import { StyleSheet, Dimensions } from 'react-native';
import { screenConfig } from '../../config/config';

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 15,
        backgroundColor: '#FFFFFF'
    },
    listItem: {
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
        padding: 10
    },
    inputDetalhes: {
        marginBottom: 10
    },
    inline: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inlineItem: {
        flex: 1,
    },
    centerItem: {
        flex: 0.05
    },
    botao: {

    }
  });

  export default estilos;