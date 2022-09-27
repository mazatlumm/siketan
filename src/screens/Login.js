import React, {useState, useEffect} from 'react'
import {Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon, Button } from '@rneui/themed';

import LogoApp from '../../assets/logo.png'

import styles from '../styles/Main';

const Login = () => {

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
                        <Icon type='font-awesome' size={20} name='user' />
                        <TextInput 
                            placeholder='Alamat Email'
                            keyboardType='email-address'
                            value={Email}
                            onChange={value=>setEmail(value)}
                            style={styles.textInputGroup}
                        />
                    </View>
                    <View style={styles.Devider5}></View>
                    <View style={styles.InputBoxGroup}>
                        <Icon type='font-awesome' size={20} name='lock' />
                        <TextInput 
                            placeholder='Password'
                            value={Password}
                            onChange={value=>setPassword(value)}
                            style={styles.textInputGroup}
                            secureTextEntry={PasswordVisibility}
                        />
                        <TouchableOpacity onPress={()=>ChangePasswordVisibility()}>
                            <Icon type='font-awesome' size={20} name={Eye} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Devider5}></View>
                    <TouchableOpacity style={styles.BtnSuccess}>
                        <Text style={styles.TextBtnWhiteLarge}>MASUK</Text>
                    </TouchableOpacity>
                    <View style={styles.Devider10}></View>
                </View>
            </View>
        </SafeAreaProvider>
    )
}

export default Login