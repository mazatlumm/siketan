import {Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from '../styles/Main'
import RNBootSplash from "react-native-bootsplash";
import { BacaLokalJson } from '../localstorage';

const SplashScreen = ({navigation}) => {

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        CekDataUser();
      });
      return unsubscribe;
    }, [navigation])
    
    const CekDataUser = () => {
        //cek data user baru hilangkan splashscreen
        BacaLokalJson('@DataUser').then(response=>{
          if(response == null){
            //arahkan ke halaman login
            setTimeout(() => {
                navigation.navigate('Login');
            }, 500);
          }else{
            //arahkan ke halaman dashboard
            setTimeout(() => {
                navigation.navigate('Dashboard');
            }, 500);
          }
        })
        RNBootSplash.hide()
    }

  return (
    <SafeAreaProvider>
      <View style={styles.containerCenter}>
      </View>
    </SafeAreaProvider>
  )
}

export default SplashScreen
