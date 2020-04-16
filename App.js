import React from 'react';
import { Login } from './src/components/Login'
import { Inicial}  from './src/components/Inicial';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
    </Stack.Navigator>
  </NavigationContainer>
    
  );
}