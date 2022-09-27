// In App.js in a new project

import React, {useEffect, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//contoh komponen ada disini
import Components from './src/screens/Components';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Dashboard from './src/screens/Dashboard';
import SplashScreen from './src/screens/SplashScreen';


const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Components" component={Components} options={{headerShown:false}} /> */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;