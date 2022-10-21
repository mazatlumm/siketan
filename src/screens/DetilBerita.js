import { View, Text, BackHandler, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { WebView } from 'react-native-webview';
import styles from '../styles/Main'
import { Icon } from '@rneui/base';

const DetilBerita = ({navigation, route}) => {
    const [BaseURL, setBaseURL] = useState('https://siketan.com/');
    const [IDBerita, setIDBerita] = useState('');

    const GetDataRoute = () => {
        if(route.params != undefined){
            console.log(route.params);
            setIDBerita(route.params.id_berita);
        }
    }

    const webViewRef = useRef(null);
    useEffect(() => {
        GetDataRoute();
    }, [])

    const backAction = () => {
        if(webViewRef.current != null){
            webViewRef.current.goBack();
        }
        return true;
    };
    

  return (
    <View style={{flex:1}}>
        {IDBerita?  
            <WebView 
            source={{ uri: 'https://siketan.com/berita/detil/'+IDBerita }}
            ref={webViewRef} 
            geolocationEnabled={true} 
            javaScriptEnabled={true}
            />
            :
            <View></View>
        }
       <View style={{position:'absolute', bottom:40, right:10}}>
            <TouchableOpacity onPress={()=>backAction()} style={styles.BtnCircleSuccess}>
                    <Icon type='font-awesome' name='arrow-left' size={16} color='white' />
            </TouchableOpacity>
       </View>
    </View>
  )
}

export default DetilBerita