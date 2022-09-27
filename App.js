// In App.js in a new project

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNBootSplash from "react-native-bootsplash";

import Login from './src/screens/Login';
import Components from './src/screens/Components';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator>
        {/* <Stack.Screen name="Components" component={Components} options={{headerShown:false}} /> */}
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;