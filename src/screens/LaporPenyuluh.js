import { View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, ScrollView, FlatList, Dimensions, ToastAndroid } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from '../styles/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from '@rneui/base';
import { BacaLokalJson } from '../localstorage';
import { GETREQ, POSTREQ } from '../controllers';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';

const windowWidth = parseInt((Dimensions.get('window').width).toFixed(0))-45;
const windowHeight = parseInt((Dimensions.get('window').height).toFixed(0))-45;

let count = 0;

const LaporPenyuluh = ({navigation}) => {

  const [BaseURL, setBaseURL] = useState('https://siketan.com/')
  const [IDUser, setIDUser] = useState('')
  const [Role, setRole] = useState('')
  const [ArrowDataLaporan, setArrowDataLaporan] = useState('arrow-forward')
  const [FormDataLaporan, setFormDataLaporan] = useState(false)
  const [IDLaporan, setIDLaporan] = useState('')
  const [Catatan, setCatatan] = useState('')
  const [Keluhan, setKeluhan] = useState('')
  const [ArrDataLaporan, setArrDataLaporan] = useState([])
  const [ModalSettingLaporan, setModalSettingLaporan] = useState(false)
  const [EditDataLaporan, setEditDataLaporan] = useState(false)
  const [ShowForm, setShowForm] = useState(false)
  const [TitleForm, setTitleForm] = useState('Buat Laporan')
  const [URIFotoLaporanCache, setURIFotoLaporanCache] = useState('')
  const [AddressFull, setAddressFull] = useState('');
  const [LoadingData, setLoadingData] = useState(false);
  const [Latitude, setLatitude] = useState('');
  const [Longitude, setLongitude] = useState('');

  const GetDataUser = () => {
    BacaLokalJson('@DataUser').then(response => {
      const JsonResponse = JSON.parse(response);
      setIDUser(JsonResponse.result[0].id_user)
      var id_user = JsonResponse.result[0].id_user;
      var role = JsonResponse.result[0].role
      setRole(role)
      GetDataLaporan(id_user, role)
    });
  }

  const ShowFormDataLaporan = () => {
    setShowForm(!ShowForm)
    if(!ShowForm){
        setArrowDataLaporan('arrow-down');
        setFormDataLaporan(true);
        setTitleForm('Buat Laporan')
        setCatatan('')
        setKeluhan('')
        setURIFotoLaporanCache('')
    }
    if(ShowForm){
        setArrowDataLaporan('arrow-forward');
        setFormDataLaporan(false);
        setTitleForm('Buat Laporan')
        setCatatan('')
        setKeluhan('')
        setURIFotoLaporanCache('')
    }
  }

  useEffect(() => {
    CekLokasi()
  }, [IDUser])

  const GetDataLaporan = (id_user, role) => {
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
        GETREQ('api/laporan', parameter).then(response=>{
            if(response.status == true){
                console.log(response.result);
                setArrDataLaporan(response.result)
            }else{
                setArrDataLaporan([]);
            }
        });
  }

  const CekLokasi = async () => {
    setLoadingData(true);
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 150000,
      })
        .then(location => {
            const latitude = location.latitude;
            const longitude = location.longitude;
            console.log('latitude : ' + latitude);
            console.log('longitude : ' + longitude);
            setLatitude(latitude)
            setLongitude(longitude)
            Geocoder.init("AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k", {language : "id"});
            Geocoder.from(latitude, longitude)
            .then(json => {
                var addressComponent = json.results[0].formatted_address;
                console.log(addressComponent);
                setAddressFull(addressComponent);
                setLoadingData(false)
            })
            .catch(error => {
                console.warn(error)
                setLoadingData(false)
            });
            
            //Ambil Data User
            GetDataUser();
        })
        .catch(ex => {
          const {code, message} = ex;
          console.warn(code, message);
        });
  }

  const KirimLaporan = async () => {
    if(Catatan != '' && Keluhan != '' && URIFotoLaporanCache != ''){
        setLoadingData(true)
        var myHeaders = new Headers();
    
        let filename = URIFotoLaporanCache.split('/').pop();
      
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
    
        var formdata = new FormData();
        formdata.append("id_user", IDUser);
        formdata.append("catatan", Catatan);
        formdata.append("keluhan", Keluhan);
        formdata.append("alamat", AddressFull);
        formdata.append("latitude", Latitude);
        formdata.append("longitude", Longitude);
        formdata.append("image", { uri: URIFotoLaporanCache, name: filename, type: type});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
    
        await fetch(BaseURL + "api/laporan", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result.status);
              if(result.status == true){
                  setCatatan('');
                  setKeluhan('');
                  setURIFotoLaporanCache('');
                  setFormDataLaporan(false)
                  GetDataLaporan()
              }
              setLoadingData(false)
          })
          .catch(error => {
            setLoadingData(false)
            console.log('error')
          });
      }else{
        Alert.alert(
          "Data Tidak Lengkap",
          "Masukkan catatan, keluhan, dan foto pada laporan Anda",
          [
            {
              text: "Lengkapi",
              onPress: () => console.log("siap melengkapi data")
            },
          ]
        );
      }
  }

  const AmbilFotoProduk = async (type) => {
    var result = [];
    if(type == 'gallery'){
        result = await launchImageLibrary({
        mediaType:'photo',
      });
    }
    if(type == 'camera'){
        result = await launchCamera({
        mediaType:'photo',
      });
    }

    if(result.assets != undefined){
      // console.log(result.assets);
      ImageResizer.createResizedImage(result.assets[0].uri, 300, 300, 'PNG', 100, 0, undefined, false, { mode:'contain' })
      .then(resizedImage => {
          setURIFotoLaporanCache(resizedImage.uri);
      })
      .catch(err => {
          console.log(err);
          return Alert.alert(
          'Unable to resize the photo',
          'Check the console for full the error message',
          );
      });     
    }
  }

  const UbahData = async () => {
    if(Catatan != '' && Keluhan != '' && URIFotoLaporanCache != ''){
        setLoadingData(true)
        var myHeaders = new Headers();
    
        let filename = URIFotoLaporanCache.split('/').pop();
      
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
    
        var formdata = new FormData();
        formdata.append("id_laporan", IDLaporan);
        formdata.append("id_user", IDUser);
        formdata.append("catatan", Catatan);
        formdata.append("keluhan", Keluhan);
        formdata.append("alamat", AddressFull);
        formdata.append("latitude", Latitude);
        formdata.append("longitude", Longitude);
        formdata.append("image", { uri: URIFotoLaporanCache, name: filename, type: type});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
    
        await fetch(BaseURL + "api/laporan/update", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result.status);
              if(result.status == true){
                    setCatatan('');
                    setKeluhan('');
                    setURIFotoLaporanCache('');
                    setTitleForm('Buat Laporan')
                    setEditDataLaporan(false);
                    setArrowDataLaporan('arrow-forward');
                    setFormDataLaporan(false);
                    GetDataLaporan()
              }
              setLoadingData(false)
          })
          .catch(error => {
            setLoadingData(false)
            console.log('error')
          });
      }else{
        Alert.alert(
          "Data Tidak Lengkap",
          "Masukkan catatan, keluhan, dan foto pada laporan Anda",
          [
            {
              text: "Lengkapi",
              onPress: () => console.log("siap melengkapi data")
            },
          ]
        );
      }
  }

  const OpenModalSetLaporan = (id_laporan, id_user, catatan, keluhan, alamat, latitude, longitude, foto, created) => {
        setModalSettingLaporan(!ModalSettingLaporan)
        setIDLaporan(id_laporan)
        setCatatan(catatan)
        setKeluhan(keluhan)
        setAddressFull(alamat)
        setURIFotoLaporanCache(BaseURL+'upload/laporan/'+foto)
  }

  const UbahDataLaporan = () => {
      if(Role != 'admin'){
          setTitleForm('Ubah Laporan')
          setEditDataLaporan(true);
          setArrowDataLaporan('arrow-down');
          setFormDataLaporan(true);
          setModalSettingLaporan(!ModalSettingLaporan)
      }
  }

  const HapusData = () => {
    var parameter = {
        id_laporan:IDLaporan
    }
    GETREQ('api/laporan/hapus', parameter).then(response=>{
        console.log(response.result);
        if(response.status == true){
            GetDataLaporan(IDUser, Role);
            setModalSettingLaporan(!ModalSettingLaporan)
            ToastAndroid.showWithGravity(
                "Berhasil Menghapus Data",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }else{
            setModalSettingLaporan(!ModalSettingLaporan)
            ToastAndroid.showWithGravity(
                "Gagal Menghapus Data",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    });
  }

  const Item = ({ id_laporan, id_user, nama_penyuluh, catatan, keluhan, alamat, latitude, longitude, foto, created}) => (
    <View style={{marginVertical:5, width:'97%', marginHorizontal:5}}>
        <TouchableOpacity onPress={()=>OpenModalSetLaporan(id_laporan, id_user, catatan, keluhan, alamat, latitude, longitude, foto, created)} style={styles.Card}>
            <View style={{flexDirection:'row'}}>
                <View>
                    <Image style={styles.ImageProduk} source={{uri:BaseURL+'/upload/laporan/'+foto}} />
                </View>
                <View style={{flex:1, marginLeft:5}}>
                    <Text style={styles.textNormalBold}>Penyuluh : {nama_penyuluh}</Text>
                    <Text style={styles.textNormal}>Catatan : {catatan}</Text>
                    <Text style={styles.textNormal}>Keluhan : {keluhan}</Text>
                    <Text style={styles.textNormal}>Alamat : {alamat}</Text>
                    <Text style={styles.textNormal}>Waktu : {created}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
  )

  const renderItem = ({ item }) => <Item 
        id_laporan={item.id_laporan} 
        id_user={item.id_user} 
        nama_penyuluh={item.nama_penyuluh} 
        catatan={item.catatan} 
        keluhan={item.keluhan} 
        alamat={item.alamat} 
        latitude={item.latitude} 
        longitude={item.longitude} 
        foto={item.foto} 
        created={item.created} 
    />;

  return (
    <SafeAreaProvider style={{flex:1, backgroundColor:'white'}}>
    <Modal
          animationType="fade"
          transparent={true}
          visible={ModalSettingLaporan}
          onRequestClose={() => {
            setModalSettingLaporan(!ModalSettingLaporan);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, alignItems:'center', justifyContent:'center', width:'100%'}}>
                <TouchableOpacity onPress={()=> setModalSettingLaporan(!ModalSettingLaporan)} style={{position:'absolute', top:10, right:10, zIndex:10}}>
                    <Icon type='font-awesome' name="close" size={20} color="black" />
                </TouchableOpacity>
                {Role != 'admin' ?
                <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <View style={styles.Devider5}></View>
                    <Text style={styles.textLargeBold}>Ubah Laporan</Text>
                    <View style={styles.Devider5}></View>
                    <Text style={styles.textNormal}>Anda dapat mengubah Laporan dan menghapus Laporan dengan menekan salah satu tombol di bawah ini</Text>
                    <View style={styles.Devider5}></View>
                    <TouchableOpacity onPress={()=>UbahDataLaporan()} style={styles.BtnSuccess}>
                        <Text style={styles.TextBtnWhite}>Ubah Data</Text>
                    </TouchableOpacity>
                    <View style={styles.Devider5}></View>
                </View>
                :
                <View></View>
                }
                <Text style={styles.textLargeBold}>PERHATIAN!</Text>
                <Text style={styles.textNormal}>Laporan yang telah dihapus tidak dapat dikembalikan lagi</Text>
                <View style={styles.Devider5}></View>
                <TouchableOpacity onPress={()=>HapusData()} style={styles.BtnDanger}>
                    <Text style={styles.TextBtnWhite}>Hapus Data</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    {/* Loading */}
    <Modal
          animationType="fade"
          transparent={true}
          visible={LoadingData}
          onRequestClose={() => {
            setLoadingData(!LoadingData);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, width:'100%', alignItems:'center', justifyContent:'center'}}>
              <Text style={styles.textNormal}>Sedang Memproses Data Lokasi...</Text>
            </View>
        </View>
      </Modal>
      {/* Top Bar */}
      <View style={styles.CardRectangle}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon type='ionicon' name='arrow-back' size={20}  color='black' style={{marginRight:20}} />
          </TouchableOpacity>
          <Text style={styles.textLargeBold}>Daftar Laporan</Text>
        </View>
      </View>
      <View style={styles.Devider5}></View>
      <View style={styles.container}>
        {Role != 'admin' ?
            <View style={{paddingHorizontal:5}}>
                <TouchableOpacity onPress={()=>ShowFormDataLaporan()} style={styles.CardRectangleRow}>
                    <View style={{flex:1}}>
                        <Text style={styles.textNormalBold}>{TitleForm}</Text>
                    </View>
                    <View>
                        <Icon type='ionicon' name={ArrowDataLaporan} size={16} color='black' />
                    </View>
                </TouchableOpacity>
            </View>
            :
            <View></View>
        }
        {FormDataLaporan ?
            <View style={{paddingHorizontal:5}}>
                <View style={{marginTop:3}}></View>
                    <View style={styles.CardRectangle}>
                        <View style={{paddingLeft:5}}>
                            <Text style={styles.textNormal}>Catatan Kegiatan</Text>
                        </View>
                        <View style={styles.InputBox}>
                            <TextInput 
                                placeholder='Catatan Kegiatan'
                                placeholderTextColor={'grey'}
                                value={Catatan}
                                defaultValue={Catatan}
                                onChangeText={Catatan => setCatatan(Catatan)}
                                style={styles.textInput}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>
                        <View style={styles.Devider5}></View>
                        <View style={{paddingLeft:5}}>
                            <Text style={styles.textNormal}>Keluhan Penyuluh</Text>
                        </View>
                        <View style={styles.InputBox}>
                            <TextInput 
                                placeholder='Keluhan Penyuluh'
                                placeholderTextColor={'grey'}
                                value={Keluhan}
                                defaultValue={Keluhan}
                                onChangeText={Keluhan => setKeluhan(Keluhan)}
                                style={styles.textInput}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>
                        <View style={styles.Devider5}></View>
                        {URIFotoLaporanCache ? 
                            <View style={{width:'100%', alignItems:'center', marginVertical:5}}>
                            <Image source={{uri:URIFotoLaporanCache}} style={styles.ImageLaporan} />
                            </View>
                            :
                            <View style={{width:'100%', alignItems:'center'}}>
                            <View style={styles.Devider5}></View>
                            <Text style={styles.textNormal}>Tambahkan Foto</Text>
                            </View>
                        }
                        <View style={styles.Devider5}></View>
                        <View style={{flexDirection:'row', width:'100%'}}>
                            <View style={{flex:1}}>
                            <TouchableOpacity onPress={()=>AmbilFotoProduk('gallery')} style={styles.BtnPrimary}>
                                <Icon type='ionicon' name='images' size={30} color='white' />
                                <Text style={styles.TextBtnWhite}>Buka Gallery</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{marginHorizontal:5}}></View>
                            <View style={{flex:1}}>
                            <TouchableOpacity onPress={()=>AmbilFotoProduk('camera')} style={styles.BtnPrimary}>
                                <Icon type='ionicon' name='camera' size={30} color='white' />
                                <Text style={styles.TextBtnWhite}>Buka Kamera</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.Devider10}></View>
                        <Text style={styles.textNormalBold}>Lokasi Anda Saat ini :</Text>
                        <Text style={styles.textNormal}>{AddressFull}</Text>
                        <View style={styles.Devider5}></View>
                        {TitleForm != 'Ubah Laporan' ?
                            <View>
                                <TouchableOpacity onPress={()=>KirimLaporan()} style={styles.BtnSuccess}>
                                    <Text style={styles.TextBtnWhite}>Kirim Laporan</Text>
                                </TouchableOpacity>
                                <View style={styles.Devider5}></View>
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPress={()=>UbahData()} style={styles.BtnSuccess}>
                                    <Text style={styles.TextBtnWhite}>Ubah Laporan</Text>
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
            data={ArrDataLaporan}
            renderItem={renderItem}
            keyExtractor={(item) => item.id_laporan}
        />
        <View style={styles.Devider5}></View>
        </View>
    </SafeAreaProvider>
  )
}

export default LaporPenyuluh