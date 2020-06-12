import React from 'react';
import { Login } from './src/components/Login'
import { Inicial}  from './src/components/Inicial';
import { Clientes, ClienteDetalhes } from './src/components/Clientes';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import estilos from './estilos'
import { StatusBar, View } from 'react-native';
const Stack = createStackNavigator();

export default function AppContainer() {
  return (
    
    
    <NavigationContainer>

    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
    name="Inicial"
    component={Inicial}
    />

    <Stack.Screen
    name="Login"
    options={{ headerShown: false }}
    component={Login} />

    <Stack.Screen
    name="Clientes"
    component={Clientes}
    options={{
      title: 'CLIENTES',
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#a037b3"
      }
    }}
    />
    <Stack.Screen
    name="ClienteDetalhes"
    component={ClienteDetalhes}
    options={{
      title: 'CLIENTE',
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#a037b3"
      }
    }}
    />

    </Stack.Navigator>
    </NavigationContainer>
    
    
  );
}