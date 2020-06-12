import { StyleSheet, Dimensions } from 'react-native';

const estilos = StyleSheet.create({
    viewPrincipal: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: 10,
      marginBottom: Dimensions.get('window').height * 0.24,
    },
    slogan: {
      color: '#590b9e',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
    },
    imagem: {
      height: Dimensions.get('window').height * 0.15,
      width: Dimensions.get('window').width * 0.8,
    },
    input: {
      width: Dimensions.get('window').width * 0.95
    },
    botao: {
      margin: 10,
      width: Dimensions.get('window').width * 0.95
    },
  });

  export default estilos;