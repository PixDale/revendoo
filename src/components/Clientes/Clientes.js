import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image,Button,Linking } from 'react-native';
import getLoginClient from '../../apiAuth/loggedInClient';

export default class App extends React.Component {
  constructor(props)
  {
      super(props);
      this.state ={
        
        clientes:[],
        url:'https://pokeapi.co/api/v2/pokemon'

      }
  }

  componentDidMount(){
     this.getClientes();
  }

   getClientes = async () => {
    var cliente = await getLoginClient()
    this.setState({ loading:true })
    cliente.get("api/clientes")
    .then(res => {
        console.log(res);
        this.setState({
            clientes: res.data,
            url: "",
            
        })
    })
   
  };
  

render(){

   return (
      <View style = {styles.container}>
      <FlatList
        data={this.state.clientes}
        renderItem={
          ({item}) => <Text> {item.nome} </Text>
          
        }
        
      />
    
      </View>

      
    );
  }
}
const styles = StyleSheet.create({
  container: {   
     flex:1, 
     alignItems: 'center',          
    justifyContent: 'center'   
    },
});