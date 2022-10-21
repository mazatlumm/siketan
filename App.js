// In App.js in a new project

import React, {useEffect, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import {SimpanLokal} from './src/localstorage'

//contoh komponen ada disini
import Components from './src/screens/Components';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Dashboard from './src/screens/Dashboard';
import SplashScreen from './src/screens/SplashScreen';
import KelolaProduk from './src/screens/toko_tani/KelolaProduk';
import TokoTani from './src/screens/toko_tani/TokoTani';
import Profile from './src/screens/Profile';
import InfoTani from './src/screens/InfoTani';
import DataPanen from './src/screens/DataPanen';
import Chat from './src/screens/Chat';
import RoomChat from './src/screens/RoomChat';
import DetilBerita from './src/screens/DetilBerita';


const Stack = createNativeStackNavigator();

function App() {

  const GetToken = () => {
    PushNotification.configure({
      onRegister: function (token) {
        SimpanLokal(token.token,'@token').then(response=>{
          console.log('Simpan Token = ' + response);
        })
      },
    
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
    
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
  useEffect(() => {
    GetToken()
  }, [])
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Components" component={Components} options={{headerShown:false}} /> */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
        <Stack.Screen name="KelolaProduk" component={KelolaProduk} options={{headerShown:false}} />
        <Stack.Screen name="TokoTani" component={TokoTani} options={{headerShown:false}} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
        <Stack.Screen name="InfoTani" component={InfoTani} options={{headerShown:false}} />
        <Stack.Screen name="DataPanen" component={DataPanen} options={{headerShown:false}} />
        <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}} />
        <Stack.Screen name="RoomChat" component={RoomChat} options={{headerShown:false}} />
        <Stack.Screen name="DetilBerita" component={DetilBerita} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;