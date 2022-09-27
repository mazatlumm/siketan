// In App.js in a new project

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNBootSplash from "react-native-bootsplash";

//contoh komponen ada disini
import Components from './src/screens/Components';

import Login from './src/screens/Login';
import Register from './src/screens/Register';


const Stack = createNativeStackNavigator();

function App() {

  useEffect(() => {

  }, [])

  const CekDataUser = () => {
    //cek data user baru hilangkan splashscreen
    RNBootSplash.hide()
  }
  
  return (
    <NavigationContainer onReady={() => CekDataUser()}>
      <Stack.Navigator>
        {/* <Stack.Screen name="Components" component={Components} options={{headerShown:false}} /> */}
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;