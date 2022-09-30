import React, {useState, useEffect} from 'react'
import {Text, View, TextInput, TouchableOpacity, Image, ScrollView, ToastAndroid } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon, Button } from '@rneui/themed';
import { POSTREQ } from '../controllers';
import { SimpanLokalJson } from '../localstorage';

import LogoApp from '../../assets/logo.png'

import styles from '../styles/Main';

const Login = ({navigation}) => {

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Eye, setEye] = useState('eye-slash')
    const [PasswordVisibility, setPasswordVisibility] = useState(true)

    const ChangePasswordVisibility = () => {
        setPasswordVisibility(!PasswordVisibility);
        if(PasswordVisibility == false){
            setEye('eye-slash');
        }
        if(PasswordVisibility == true){
            setEye('eye');
        }
    }

    const LoginReq = () => {
        const ParameterURL = {
            email : Email,
            password : Password,
          }
          POSTREQ('api/user/login', ParameterURL).then(response=>{
              console.log(response);
              if(response.status == true){
                SimpanLokalJson(response, '@DataUser').then(LocalStorage=>{
                    if(LocalStorage){
                        navigation.navigate('Dashboard');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Dashboard' }],
                        });
                    }else{
                        console.log('Data Tidak Tersimpan di Local Storage')
                    }
                })
                ToastAndroid.showWithGravity(
                  "Login Success",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              }else{
                ToastAndroid.showWithGravity(
                  "Email & Password Tidak Sesuai",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                );
              }
          });
    }

    return (
        <SafeAreaProvider>
            <View style={styles.containerCenter}>
                <View style={styles.Card}>
                    <View style={styles.Devider10}></View>
                    <View style={styles.Center}>
                        <Image source={LogoApp} style={styles.ImageLarge} />
                    </View>
                    <View style={styles.Devider10}></View>
                    <View style={styles.Center}>
                        <Text style={styles.B4Bold}>AKSES LOGIN SIKETAN</Text>
                    </View>
                    <View style={styles.Devider10}></View>
                    <View style={styles.InputBoxGroup}>
                        <Icon type='font-awesome' size={16} name='envelope' />
                        <TextInput 
                            placeholder='Alamat Email'
                            placeholderTextColor='grey'
                            keyboardType='email-address'
                            defaultValue={Email}
                            onChangeText={value=>setEmail(value)}
                            style={styles.textInputGroup}
                        />
                    </View>
                    <View style={styles.Devider5}></View>
                    <View style={styles.InputBoxGroup}>
                        <Icon type='font-awesome' size={20} name='lock' />
                        <TextInput 
                            placeholder='Password'
                            placeholderTextColor='grey'
                            defaultValue={Password}
                            onChangeText={value=>setPassword(value)}
                            style={styles.textInputGroup}
                            secureTextEntry={PasswordVisibility}
                        />
                        <TouchableOpacity onPress={()=>ChangePasswordVisibility()}>
                            <Icon type='font-awesome' size={20} name={Eye} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Devider5}></View>
                    <TouchableOpacity onPress={()=>LoginReq()} style={styles.BtnSuccess}>
                        <Text style={styles.TextBtnWhiteLarge}>MASUK</Text>
                    </TouchableOpacity>
                    <View style={styles.Devider10}></View>
                    <View style={styles.Center}>
                        <Text style={styles.textNormal}>Belum memiliki akun?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('Register')} style={{borderBottomColor:'black', borderBottomWidth:0.5}}>
                            <Text style={styles.textNormalBold}>DAFTAR DISINI!</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Devider10}></View>
                </View>
            </View>
        </SafeAreaProvider>
    )
}

export default Login