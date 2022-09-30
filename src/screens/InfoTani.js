import { View, Text, BackHandler, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { WebView } from 'react-native-webview';
import styles from '../styles/Main'
import { Icon } from '@rneui/base';

const InfoTani = ({navigation}) => {

    const webViewRef = useRef(null);
    useEffect(() => {
    
    }, [])

    const backAction = () => {
        if(webViewRef.current != null){
            webViewRef.current.goBack();
        }
        return true;
    };
    

  return (
    <View style={{flex:1}}>
       <WebView 
       source={{ uri: 'https://siketan.com/info' }}
       ref={webViewRef} 
       geolocationEnabled={true} 
       javaScriptEnabled={true}
       />
       <View style={{position:'absolute', bottom:50, right:10}}>
            <TouchableOpacity onPress={()=>backAction()} style={styles.BtnCircleSuccess}>
                    <Icon type='font-awesome' name='arrow-left' size={16} color='white' />
            </TouchableOpacity>
       </View>
    </View>
  )
}

export default InfoTani