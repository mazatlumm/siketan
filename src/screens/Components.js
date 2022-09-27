import { Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from '../styles/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon, Button } from '@rneui/themed';

const Components = () => {
    const [Teks, setTeks] = useState('')
  return (
      <SafeAreaProvider>
        <View style={styles.containerCenter}>
            <View style={styles.Card}>
                <Text style={styles.textNormal}>Login</Text>
                <Text style={styles.textNormalBold}>Normal Bold</Text>
                <Text style={styles.B1}>Normal Bold</Text>
                <Text style={styles.B1Bold}>Normal Bold</Text>
            </View>
            <View style={{marginTop:10}}></View>
            <View style={styles.BtnSuccess}>
                <Text style={styles.TextBtnWhite}>Success</Text>
            </View>
            <View style={styles.BtnPrimary}>
                <Text style={styles.TextBtnWhite}>Primary</Text>
            </View>
            <View style={styles.BtnWarning}>
                <Text style={styles.TextBtnWhite}>Warning</Text>
            </View>
            <View style={styles.BtnDanger}>
                <Text style={styles.TextBtnWhite}>Danger</Text>
            </View>
            <View style={styles.BtnCircleSuccess}>
                <Icon name='plus' type='font-awesome' color='white'/>
            </View>
            <TouchableOpacity>
                <Button title="Dark" />
            </TouchableOpacity>
            <View style={{marginBottom:10}}></View>
            <View style={styles.InputBox}>
                <TextInput 
                    placeholder='Testing'
                    keyboardType='email-address'
                    value={Teks}
                    onChange={value=>setTeks(value)}
                    style={styles.textInput}
                />
            </View>
            <View style={{marginBottom:10}}></View>
            <View style={styles.InputBoxGroup}>
                <Icon type='font-awesome' name='user' />
                <TextInput 
                    placeholder='Username'
                    keyboardType='email-address'
                    value={Teks}
                    onChange={value=>setTeks(value)}
                    style={styles.textInputGroup}
                />
            </View>
        </View>
    </SafeAreaProvider>
  )
}

export default Components