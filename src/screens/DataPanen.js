import { View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, ScrollView, FlatList, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from '../styles/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from '@rneui/base';
import { BacaLokalJson } from '../localstorage';
import { GETREQ } from '../controllers';

const windowWidth = parseInt((Dimensions.get('window').width).toFixed(0))-45;
const windowHeight = parseInt((Dimensions.get('window').height).toFixed(0))-45;

let count = 0;

const DataPanen = ({navigation}) => {

  const [BaseURL, setBaseURL] = useState('https://alicestech.com/siketan/')
  const [IDUser, setIDUser] = useState('')
  const [ArrowDatapanen, setArrowDatapanen] = useState('arrow-forward')
  const [FormTambahData, setFormTambahData] = useState(false)
  const [Komoditas, setKomoditas] = useState('')
  const [Luas, setLuas] = useState('')
  const [Jumlah, setJumlah] = useState('')

  const GetDataUser = () => {
    BacaLokalJson('@DataUser').then(response => {
      const JsonResponse = JSON.parse(response);
      setIDUser(JsonResponse.result[0].id_user)
    });
  }

  const ShowFormTambahData = () => {
    count++
    if(count == 1){
        setArrowDatapanen('arrow-down');
        setFormTambahData(true);
    }
    if(count > 1){
        setArrowDatapanen('arrow-forward');
        setFormTambahData(false);
        count = 0;
    }
  }

  useEffect(() => {
    GetDataUser();
  }, [IDUser])
  

  return (
    <SafeAreaProvider style={{flex:1, backgroundColor:'white'}}>
      {/* Top Bar */}
      <View style={styles.CardRectangle}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon type='ionicon' name='arrow-back' size={20}  color='black' style={{marginRight:20}} />
          </TouchableOpacity>
          <Text style={styles.textLargeBold}>Data Panen</Text>
        </View>
      </View>
      <View style={styles.Devider5}></View>
      <View style={styles.container}>
          <TouchableOpacity onPress={()=>ShowFormTambahData()} style={styles.CardRectangleRow}>
            <View style={{flex:1}}>
                <Text style={styles.textNormalBold}>Tambah Data Panen</Text>
            </View>
            <View>
                <Icon type='ionicon' name={ArrowDatapanen} size={16} color='black' />
            </View>
          </TouchableOpacity>
        {FormTambahData ?
            <View>
                <View style={{marginTop:3}}></View>
                    <View style={styles.CardRectangle}>
                        <View style={{paddingLeft:5}}>
                            <Text style={styles.textNormal}>Komoditas</Text>
                        </View>
                        <View style={styles.InputBox}>
                            <TextInput 
                                placeholder='Komoditas'
                                placeholderTextColor={'grey'}
                                value={Komoditas}
                                defaultValue={Komoditas}
                                onChangeText={Komoditas => setKomoditas(Komoditas)}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.Devider5}></View>
                        <View style={{paddingLeft:5}}>
                            <Text style={styles.textNormal}>Luas</Text>
                        </View>
                        <View style={styles.InputBoxGroup}>
                                <TextInput 
                                    placeholder='Luas'
                                    placeholderTextColor={'grey'}
                                    value={Luas}
                                    defaultValue={Luas}
                                    onChangeText={Luas => setLuas(Luas)}
                                    keyboardType='numeric'
                                    style={styles.textInputGroup}
                                />
                                <View style={{borderLeftWidth:0.5, paddingLeft:10}}>
                                    <Text style={styles.textNormal}>ha</Text>
                                </View>
                        </View>
                        <View style={styles.Devider5}></View>
                        <View style={{paddingLeft:5}}>
                            <Text style={styles.textNormal}>Jumlah</Text>
                        </View>
                        <View style={styles.InputBoxGroup}>
                                <TextInput 
                                    placeholder='Jumlah'
                                    placeholderTextColor={'grey'}
                                    value={Jumlah}
                                    defaultValue={Jumlah}
                                    onChangeText={Jumlah => setJumlah(Jumlah)}
                                    keyboardType='numeric'
                                    style={styles.textInputGroup}
                                />
                                <View style={{borderLeftWidth:0.5, paddingLeft:10}}>
                                    <Text style={styles.textNormal}>ton</Text>
                                </View>
                        </View>
                    </View>
            </View>
            :
            <View></View>
        }              
      </View>
      <View style={styles.Devider5}></View>
    </SafeAreaProvider>
  )
}

export default DataPanen