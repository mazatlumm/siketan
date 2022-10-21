import { View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, ScrollView, FlatList, Dimensions, ToastAndroid } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from '../styles/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from '@rneui/base';
import { BacaLokalJson } from '../localstorage';
import { GETREQ, POSTREQ } from '../controllers';

const windowWidth = parseInt((Dimensions.get('window').width).toFixed(0))-45;
const windowHeight = parseInt((Dimensions.get('window').height).toFixed(0))-45;

let count = 0;

const DataPanen = ({navigation}) => {

  const [BaseURL, setBaseURL] = useState('https://siketan.com/')
  const [IDUser, setIDUser] = useState('')
  const [Role, setRole] = useState('')
  const [ArrowDatapanen, setArrowDatapanen] = useState('arrow-forward')
  const [FormDataPanen, setFormDataPanen] = useState(false)
  const [Komoditas, setKomoditas] = useState('')
  const [Luas, setLuas] = useState('')
  const [Jumlah, setJumlah] = useState('')
  const [Lokasi, setLokasi] = useState('')
  const [ArrDataPanen, setArrDataPanen] = useState([])
  const [ModalSettingPanen, setModalSettingPanen] = useState(false)
  const [IDPanen, setIDPanen] = useState('')
  const [EditDataPanen, setEditDataPanen] = useState(false)
  const [TitleForm, setTitleForm] = useState('Tambah Data Panen')

  const GetDataUser = () => {
    BacaLokalJson('@DataUser').then(response => {
      const JsonResponse = JSON.parse(response);
      setIDUser(JsonResponse.result[0].id_user)
      var id_user = JsonResponse.result[0].id_user;
      var role = JsonResponse.result[0].role
      GetDataPanen(id_user, role)
    });
  }

  const ShowFormDataPanen = () => {
    count++
    if(count == 1){
        setArrowDatapanen('arrow-down');
        setFormDataPanen(true);
        setTitleForm('Tambah Data Panen')
        setKomoditas('')
        setLuas('')
        setJumlah('')
        setLokasi('')
    }
    if(count > 1){
        setArrowDatapanen('arrow-forward');
        setFormDataPanen(false);
        setTitleForm('Tambah Data Panen')
        count = 0;
        setKomoditas('')
        setLuas('')
        setJumlah('')
        setLokasi('')
    }
  }

  useEffect(() => {
    GetDataUser();
  }, [IDUser])

  const GetDataPanen = (id_user, role) => {
        var parameter = [];
        if(role != 'admin'){
            parameter = {
                id_user : id_user,
            }
        }else{
            parameter = {
                // id_user : id_user,
            }
        }
        GETREQ('api/data_panen', parameter).then(response=>{
            console.log(response.result);
            setArrDataPanen(response.result)
        });
  }

  const SimpanData = () => {
        var parameter = {
            id_user : IDUser,
            komoditas : Komoditas,
            luas : Luas,
            jumlah : Jumlah,
            lokasi : Lokasi
        }
        POSTREQ('api/data_panen', parameter).then(response=>{
            if(response.status == true){
                GetDataPanen(IDUser, Role);
            }
      });
  }

  const UbahData = () => {
        var parameter = {
            id_panen : IDPanen,
            id_user : IDUser,
            komoditas : Komoditas,
            luas : Luas,
            jumlah : Jumlah,
            lokasi : Lokasi
        }
        POSTREQ('api/data_panen/edit', parameter).then(response=>{
            if(response.status == true){
                GetDataPanen(IDUser, Role);
                ToastAndroid.showWithGravity(
                    "Berhasil Mengubah Data",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }else{
                ToastAndroid.showWithGravity(
                    "Gagal Mengubah Data",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
      });
  }

  const OpenModalSetPanen = (id_panen, komoditas, luas, jumlah, lokasi) => {
        setIDPanen(id_panen);
        setModalSettingPanen(!ModalSettingPanen)
        setKomoditas(komoditas);
        setLuas(luas);
        setJumlah(jumlah);
        setLokasi(lokasi);
  }

  const UbahDataPanen = () => {
      setTitleForm('Ubah Data Panen')
      setEditDataPanen(true);
      setArrowDatapanen('arrow-down');
      setFormDataPanen(true);
      setModalSettingPanen(!ModalSettingPanen)
  }

  const HapusData = () => {
    var parameter = {
        id_panen:IDPanen
    }
    GETREQ('api/data_panen/hapus', parameter).then(response=>{
        console.log(response.result);
        if(response.status == true){
            GetDataPanen(IDUser, Role);
            ToastAndroid.showWithGravity(
                "Berhasil Menghapus Data",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }else{
            ToastAndroid.showWithGravity(
                "Gagal Menghapus Data",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    });
  }

  const Item = ({ id_panen, id_user, komoditas, luas, jumlah, lokasi}) => (
    <View style={{marginVertical:5, width:'97%', marginHorizontal:5}}>
        <TouchableOpacity onPress={()=>OpenModalSetPanen(id_panen, komoditas, luas, jumlah, lokasi)} style={styles.Card}>
        <View style={styles.Devider5}></View>
        <Text style={styles.textLargeBold}>Komoditas : {komoditas}</Text>
        <Text style={styles.textNormal}>Luas : {luas} ha</Text>
        <Text style={styles.textNormal}>Jumlah : {jumlah} ton</Text>
        <Text style={styles.textNormalBold}>Lokasi : {lokasi}</Text>
        </TouchableOpacity>
    </View>
  )

  const renderItem = ({ item }) => <Item 
        id_panen={item.id_panen} 
        id_user={item.id_user} 
        komoditas={item.komoditas} 
        luas={item.luas} 
        jumlah={item.jumlah} 
        lokasi={item.lokasi} 
    />;

  return (
    <SafeAreaProvider style={{flex:1, backgroundColor:'white'}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={ModalSettingPanen}
          onRequestClose={() => {
            setModalSettingPanen(!ModalSettingPanen);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, alignItems:'center', justifyContent:'center', width:'100%'}}>
                <TouchableOpacity onPress={()=> setModalSettingPanen(!ModalSettingPanen)} style={{position:'absolute', top:10, right:10, zIndex:10}}>
                    <Icon type='font-awesome' name="close" size={20} color="black" />
                </TouchableOpacity>
                <View style={styles.Devider5}></View>
                <Text style={styles.textLargeBold}>Ubah Data Panen</Text>
                <View style={styles.Devider5}></View>
                <Text style={styles.textNormal}>Anda dapat mengubah data panen dan menghapus data panen dengan menekan salah satu tombol di bawah ini</Text>
                <View style={styles.Devider5}></View>
                <TouchableOpacity onPress={()=>UbahDataPanen()} style={styles.BtnSuccess}>
                    <Text style={styles.TextBtnWhite}>Ubah Data</Text>
                </TouchableOpacity>
                <View style={styles.Devider5}></View>
                <Text style={styles.textLargeBold}>PERHATIAN!</Text>
                <Text style={styles.textNormal}>Data panen yang telah dihapus tidak dapat dikembalikan lagi</Text>
                <View style={styles.Devider5}></View>
                <TouchableOpacity onPress={()=>HapusData()} style={styles.BtnDanger}>
                    <Text style={styles.TextBtnWhite}>Hapus Data</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
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
        <View style={{paddingHorizontal:5}}>
            <TouchableOpacity onPress={()=>ShowFormDataPanen()} style={styles.CardRectangleRow}>
                <View style={{flex:1}}>
                    <Text style={styles.textNormalBold}>{TitleForm}</Text>
                </View>
                <View>
                    <Icon type='ionicon' name={ArrowDatapanen} size={16} color='black' />
                </View>
            </TouchableOpacity>
        </View>
        {FormDataPanen ?
            <View style={{paddingHorizontal:5}}>
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
                        <View style={styles.Devider5}></View>
                        <View style={{paddingLeft:5}}>
                            <Text style={styles.textNormal}>Lokasi Panen</Text>
                        </View>
                        <View style={styles.InputBoxGroup}>
                            <TextInput 
                                placeholder='Lokasi'
                                placeholderTextColor={'grey'}
                                value={Lokasi}
                                defaultValue={Lokasi}
                                onChangeText={Lokasi => setLokasi(Lokasi)}
                                style={styles.textInputGroup}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>
                        <View style={styles.Devider5}></View>
                        {TitleForm != 'Ubah Data Panen' ?
                            <View>
                                <TouchableOpacity onPress={()=>SimpanData()} style={styles.BtnSuccess}>
                                    <Text style={styles.TextBtnWhite}>Simpan Data</Text>
                                </TouchableOpacity>
                                <View style={styles.Devider5}></View>
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPress={()=>UbahData()} style={styles.BtnSuccess}>
                                    <Text style={styles.TextBtnWhite}>Ubah Data Panen</Text>
                                </TouchableOpacity>
                                <View style={styles.Devider5}></View>
                            </View>
                        }
                    </View>
            </View>
            :
            <View></View>
        }              
        <View style={styles.Devider5}></View>
        <FlatList
            data={ArrDataPanen}
            renderItem={renderItem}
            keyExtractor={(item) => item.id_panen}
        />
        <View style={styles.Devider5}></View>
        </View>
    </SafeAreaProvider>
  )
}

export default DataPanen