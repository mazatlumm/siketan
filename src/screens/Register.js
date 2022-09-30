import React, {useState, useEffect} from 'react'
import {Text, View, TextInput, TouchableOpacity, Image, ScrollView, ToastAndroid } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon, Button } from '@rneui/themed';
import { POSTREQ } from '../controllers';

import LogoApp from '../../assets/logo.png'

import styles from '../styles/Main';

const Register = ({navigation}) => {

    const [Nama, setNama] = useState('')
    const [NoHP, setNoHP] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Eye, setEye] = useState('eye-slash')
    const [PasswordVisibility, setPasswordVisibility] = useState(true)
    const [StatusPassword, setStatusPassword] = useState('')
    const [StatusEmail, setStatusEmail] = useState('')
    const [ValidasiPhone, setValidasiPhone] = useState('')

    const ChangePasswordVisibility = () => {
        setPasswordVisibility(!PasswordVisibility);
        if(PasswordVisibility == false){
            setEye('eye-slash');
        }
        if(PasswordVisibility == true){
            setEye('eye');
        }
    }

    const CekValidasiEmail = (email) => {
      setEmail(email);
      let checkemail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!email.match(checkemail)) {
        setStatusEmail('Penulisan alamat Email tidak sesuai');
        return;
      }
      setStatusEmail('valid');
      return;
    }

    const FormatNoHp = (no_hp) => {
      setNoHP(no_hp)
      var phoneno = /^(\+62|62|0)8[1-9][0-9]{6,9}$/; 
      if(no_hp.match(phoneno)){
          console.log('no valid')
          if (no_hp.startsWith('0')) {
              no_hp = '62' + no_hp.slice(1);
              setNoHP(no_hp);
          }
          setValidasiPhone('valid')
      }else{
          setValidasiPhone('')
      }
  }

    const CekKekuatanPassword = (password) => {
      setPassword(password)
      let checklowercase = /(?=.*[a-z])/;
      let checkuppercase = /(?=.*[A-Z])/;
      let checknumeric = /(?=.*[0-9])/;
      let checkelength = /(?=.{8,})/;
      if (!password.match(checklowercase)) {
       setStatusPassword("Password wajib terdiri dari huruf besar dan kecil.");
        return
      }
      if (!password.match(checkuppercase)) {
       setStatusPassword("Password wajib terdiri dari huruf besar dan kecil.");
        return
      }
      if (!password.match(checknumeric)) {
       setStatusPassword("Password wajib memiliki setidaknya 1 angka di dalamnya.");
        return
      }
      if (!password.match(checkelength)) {
       setStatusPassword("Password minimal memiliki 8 karakter.");
        return
      }
     setStatusPassword('valid')
      return
    }

    const Daftar = () => {
      if(ValidasiPhone == 'valid'){
        if(StatusEmail == 'valid'){
          if(StatusPassword == 'valid'){
            const ParameterURL = {
              nama : Nama,
              no_telp : NoHP,
              email : Email,
              password : Password,
              role : 'Pengguna Umum',
            }
            POSTREQ('api/user/register', ParameterURL).then(response=>{
                console.log(response.status);
                if(response.status == true){
                  setNama('');
                  setEmail('');
                  setNoHP('');
                  setPassword('');
                  setStatusEmail('');
                  setStatusPassword('');
                  ToastAndroid.showWithGravity(
                    "Berhasil membuat akun, silahkan login",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                }else{
                  ToastAndroid.showWithGravity(
                    response.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                }
            });
          }else{  
            console.log('password tidak valid')
            ToastAndroid.showWithGravity(
              "Password kurang aman, mohon diperbaiki",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        }else{
          console.log('email tidak valid')
          ToastAndroid.showWithGravity(
            "Email tidak valid, mohon diperbaiki",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      }else{
          console.log('nomor handphone tidak valid')
          ToastAndroid.showWithGravity(
            "Nomor WA tidak valid, mohon diperbaiki",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
      }
    }

    return (
        <SafeAreaProvider>
            <View style={styles.containerCenter}>
                <View style={styles.Card}>
                  <ScrollView>
                      <View style={styles.Devider10}></View>
                      <View style={styles.Center}>
                          <Image source={LogoApp} style={styles.ImageLarge} />
                      </View>
                      <View style={styles.Devider10}></View>
                      <View style={styles.Center}>
                          <Text style={styles.B4Bold}>BUAT AKUN SIKETAN</Text>
                      </View>
                      <View style={styles.Devider10}></View>
                      <View style={styles.InputBoxGroup}>
                          <Icon type='font-awesome' size={20} name='user' />
                          <TextInput 
                              placeholder='Nama Lengkap'
                              placeholderTextColor='grey'
                              value={Nama}
                              defaultValue={Nama}
                              onChangeText={Nama=>setNama(Nama)}
                              style={styles.textInputGroup}
                          />
                      </View>
                      <View style={styles.Devider5}></View>
                      <View style={styles.InputBoxGroup}>
                          <Icon type='font-awesome' size={20} name='phone' />
                          <TextInput 
                              placeholder='No HP/WA'
                              placeholderTextColor='grey'
                              keyboardType='phone-pad'
                              value={NoHP}
                              defaultValue={NoHP}
                              onChangeText={NoHp=>FormatNoHp(NoHp)}
                              style={styles.textInputGroup}
                          />
                      </View>
                      <View style={styles.Devider5}></View>
                      <View style={styles.InputBoxGroup}>
                          <Icon type='font-awesome' size={16} name='envelope' />
                          <TextInput 
                              placeholder='Alamat Email'
                              placeholderTextColor='grey'
                              keyboardType='email-address'
                              value={Email}
                              defaultValue={Email}
                              onChangeText={Email=>CekValidasiEmail(Email)}
                              style={styles.textInputGroup}
                          />
                      </View>
                      {StatusEmail != ''?
                        <View>
                          {StatusEmail != 'valid' ?
                            <Text style={styles.textNormalRed}>{StatusEmail}</Text>
                            :
                            <View></View>
                          }
                        </View>
                        :
                        <View></View>
                      }
                      {StatusEmail == 'valid'?
                        <View>
                          <Text style={styles.textNormalGreen}>Alamat Email Valid</Text>
                        </View>
                        :
                        <View></View>
                      }
                      <View style={styles.Devider5}></View>
                      <View style={styles.InputBoxGroup}>
                          <Icon type='font-awesome' size={20} name='lock' />
                          <TextInput 
                              placeholder='Password'
                              placeholderTextColor='grey'
                              value={Password}
                              defaultValue={Password}
                              onChangeText={Password=>CekKekuatanPassword(Password)}
                              style={styles.textInputGroup}
                              secureTextEntry={PasswordVisibility}
                          />
                          <TouchableOpacity onPress={()=>ChangePasswordVisibility()}>
                              <Icon type='font-awesome' size={20} name={Eye} />
                          </TouchableOpacity>
                      </View>
                      {StatusPassword != 'valid'?
                        <Text style={styles.textNormalRed}>{StatusPassword}</Text>
                        :
                        <View></View>
                      }
                      {StatusPassword == 'valid'?
                        <Text style={styles.textNormalGreen}>Password Anda sudah kuat</Text>
                        :
                        <View></View>
                      }
                      <View style={styles.Devider5}></View>
                      <TouchableOpacity onPress={()=>Daftar()} style={styles.BtnSuccess}>
                          <Text style={styles.TextBtnWhiteLarge}>DAFTAR</Text>
                      </TouchableOpacity>
                      <View style={styles.Devider10}></View>
                      <View style={styles.Center}>
                          <Text style={styles.textNormal}>Sudah memiliki akun?</Text>
                          <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{borderBottomColor:'black', borderBottomWidth:0.5}}>
                              <Text style={styles.textNormalBold}>LOGIN SEKARANG!</Text>
                          </TouchableOpacity>
                      </View>
                    <View style={styles.Devider10}></View>
                  </ScrollView>
                </View>
            </View>
        </SafeAreaProvider>
    )
}

export default Register