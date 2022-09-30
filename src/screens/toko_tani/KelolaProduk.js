import { View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, ScrollView, FlatList, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from '../../styles/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from '@rneui/base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { BacaLokalJson } from '../../localstorage';
import { GETREQ } from '../../controllers';

const windowWidth = parseInt((Dimensions.get('window').width).toFixed(0))-45;
const windowHeight = parseInt((Dimensions.get('window').height).toFixed(0))-45;

const KelolaProduk = ({navigation}) => {

  const [BaseURL, setBaseURL] = useState('https://alicestech.com/siketan/')
  const [ModalProduk, setModalProduk] = useState(false)
  const [IDUser, setIDUser] = useState('')
  const [IDProduk, setIDProduk] = useState('')
  const [NamaProduk, setNamaProduk] = useState('')
  const [Harga, setHarga] = useState('')
  const [Stok, setStok] = useState('')
  const [Deskripsi, setDeskripsi] = useState('')
  const [URIFotoProdukCache, setURIFotoProdukCache] = useState('')
  const [ArrDataProduk, setArrDataProduk] = useState([])
  const [LoadingProduk, setLoadingProduk] = useState(false)
  const [ModalHapusProduk, setModalHapusProduk] = useState(false)
  const [NamaModal, setNamaModal] = useState('')

  const GetDataUser = () => {
    BacaLokalJson('@DataUser').then(response => {
      const JsonResponse = JSON.parse(response);
      setIDUser(JsonResponse.result[0].id_user)
      GetProduk(JsonResponse.result[0].id_user);
    });
  }

  const GetProduk = (id_user) => {
    var parameter = {
      id_user : id_user
    }
    GETREQ('api/produk', parameter).then(response => {
      console.log(response.status)
      if(response.status == true){
        setArrDataProduk(response.result);
      }
      setLoadingProduk(false);
    });
  }

  useEffect(() => {
    setLoadingProduk(true);
    GetDataUser();
  }, [IDUser])
  

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
          setURIFotoProdukCache(resizedImage.uri);
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

  const SimpanProduk = async () => {
    if(NamaProduk != '' && Harga != '' && Stok != '' && Deskripsi != ''){
      setLoadingProduk(true)
      var myHeaders = new Headers();
  
      let filename = URIFotoProdukCache.split('/').pop();
    
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
  
      var formdata = new FormData();
      formdata.append("id_user", IDUser);
      formdata.append("nama_produk", NamaProduk);
      formdata.append("harga", Harga);
      formdata.append("stok", Stok);
      formdata.append("deskripsi", Deskripsi);
      formdata.append("image", { uri: URIFotoProdukCache, name: filename, type: type});
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
  
      await fetch(BaseURL + "api/produk", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.status);
            if(result.status == true){
                GetProduk(IDUser);
                setModalProduk(!ModalProduk);
            }
            setLoadingProduk(false)
        })
        .catch(error => {
          setLoadingProduk(false)
          console.log('error')
        });
    }else{
      Alert.alert(
        "Parameter Tidak Lengkap",
        "Semua data harus terisi",
        [
          {
            text: "Lengkapi",
            onPress: () => console.log("siap melengkapi data")
          },
        ]
      );
    }
  }

  const UbahProduk = async () => {
    if(NamaProduk != '' && Harga != '' && Stok != '' && Deskripsi != ''){
      setLoadingProduk(true)
      var myHeaders = new Headers();
  
      let filename = URIFotoProdukCache.split('/').pop();
    
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
  
      var formdata = new FormData();
      formdata.append("id_produk", IDProduk);
      formdata.append("nama_produk", NamaProduk);
      formdata.append("harga", Harga);
      formdata.append("stok", Stok);
      formdata.append("deskripsi", Deskripsi);
      formdata.append("image", { uri: URIFotoProdukCache, name: filename, type: type});
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
  
      await fetch(BaseURL + "api/produk/update", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if(result.status == true){
                GetProduk(IDUser);
                setModalProduk(!ModalProduk);
            }
            setLoadingProduk(false)
        })
        .catch(error => {
          setLoadingProduk(false)
          console.log('error')
        });
    }else{
      Alert.alert(
        "Parameter Tidak Lengkap",
        "Semua data harus terisi",
        [
          {
            text: "Lengkapi",
            onPress: () => console.log("siap melengkapi data")
          },
        ]
      );
    }
  }

  const TambahProduk = () => {
    setNamaProduk('');
    setHarga('');
    setStok('');
    setDeskripsi('');
    setURIFotoProdukCache('');
    setNamaModal('Tambah Produk')
    setModalProduk(!ModalProduk);
  }
  
  const FormatRupiahGo = (angka) => {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const ProdukDipilih = (id_produk, nama_produk, harga, stok, deskripsi, foto) => {
    setIDProduk(id_produk);
    setNamaProduk(nama_produk);
    setHarga(harga);
    setStok(stok);
    setDeskripsi(deskripsi);
    setNamaModal('Ubah Produk');
    setURIFotoProdukCache(BaseURL+'upload/produk/'+foto)
    setModalProduk(!ModalProduk);

  }

  const MauHapusProduk = (id_produk) => {
    setIDProduk(id_produk);
    setModalHapusProduk(!ModalHapusProduk)
  }

  const HapusProduk = () => {
    var parameter = {
      id_produk : IDProduk
    }
    GETREQ('api/produk/hapus', parameter).then(response => {
      if(response.status == true){
        GetProduk(IDUser);
      }
      setModalHapusProduk(!ModalHapusProduk)
    });
  }

  const Item = ({ id_produk, id_user, nama_produk, stok, harga, deskripsi, foto, created, updated}) => (
    <TouchableOpacity onLongPress={()=>MauHapusProduk(id_produk)} onPress={()=>ProdukDipilih(id_produk, nama_produk, harga, stok, deskripsi, foto)} style={styles.CardProduk}>
      <Image source={{uri:BaseURL+'upload/produk/'+foto}} style={styles.ImageProduk} />
      <View style={styles.Devider5}></View>
      <Text style={styles.textLargeBold}>{nama_produk}</Text>
      <Text style={styles.textNormal}>{stok} kg</Text>
      <Text style={styles.textNormal}>{FormatRupiahGo(harga)}</Text>
      {/* <Text style={styles.textNormal}>{deskripsi}</Text> */}
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => <Item 
  id_produk={item.id_produk} 
  id_user={item.id_user} 
  nama_produk={item.nama_produk} 
  stok={item.stok} 
  harga={item.harga} 
  foto={item.foto} 
  deskripsi={item.deskripsi} 
  created={item.created} 
  updated={item.updated} />;

  return (
    <SafeAreaProvider style={{flex:1, backgroundColor:'white'}}>
      {/* Loading */}
      <Modal
          animationType="fade"
          transparent={true}
          visible={LoadingProduk}
          onRequestClose={() => {
            setLoadingProduk(!LoadingProduk);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, width:'100%', alignItems:'center', justifyContent:'center'}}>
              <Text style={styles.textNormal}>Tunggu sebentar...</Text>
            </View>
        </View>
      </Modal>
      {/* Modal Hapus Produk */}
      <Modal
          animationType="fade"
          transparent={true}
          visible={ModalHapusProduk}
          onRequestClose={() => {
            setModalHapusProduk(!ModalHapusProduk);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, width:'100%', justifyContent:'center'}}>
              <TouchableOpacity onPress={()=> setModalHapusProduk(!ModalHapusProduk)} style={{position:'absolute', top:10, right:10, zIndex:10}}>
                <Icon type='font-awesome' name="close" size={20} color="black" />
              </TouchableOpacity>
              <View style={styles.Devider5}></View>
              <View style={{paddingHorizontal:10}}>
                <Text style={styles.textLargeBold}>Apakah Anda yakin ingin menghapus produk ini?</Text>
                <Text style={styles.textNormal}>Data produk tidak dapat dikembalikan setelah penghapusan selesai!</Text>
              </View>
              <View style={styles.Devider5}></View>
              <TouchableOpacity onPress={()=>HapusProduk()} style={styles.BtnDanger}>
                <Text style={styles.TextBtnWhite}>Iya, Saya yakin</Text>
              </TouchableOpacity>
            </View>
        </View>
      </Modal>
      {/* Modal Manage Produk */}
      <Modal
          animationType="fade"
          transparent={true}
          visible={ModalProduk}
          onRequestClose={() => {
            setModalProduk(!ModalProduk);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <ScrollView style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, width:'100%'}}>
              <TouchableOpacity onPress={()=> setModalProduk(!ModalProduk)} style={{position:'absolute', top:10, right:10, zIndex:10}}>
                <Icon type='font-awesome' name="close" size={20} color="black" />
              </TouchableOpacity>
              {/* Form */}
              <Text style={styles.textLargeBold}>{NamaModal}</Text>
              <View style={styles.Devider5}></View>
              {/* input start */}
              <View style={{width:'100%', marginLeft:5}}>
                <Text style={styles.textNormal}>Nama Produk</Text>
              </View>
              <View style={styles.InputBox}>
                <TextInput 
                  placeholder='Nama Produk'
                  placeholderTextColor='grey'
                  defaultValue={NamaProduk}
                  value={NamaProduk}
                  onChangeText={NamaProduk => setNamaProduk(NamaProduk)}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.Devider5}></View>
              <View style={{width:'100%', marginLeft:5}}>
                <Text style={styles.textNormal}>Harga</Text>
              </View>
              <View style={styles.InputBoxGroup}>
              <Text style={styles.textNormal}>Rp</Text>
                <TextInput 
                  placeholder='Harga'
                  placeholderTextColor='grey'
                  defaultValue={Harga}
                  value={Harga}
                  onChangeText={Harga => setHarga(Harga)}
                  style={styles.textInputGroup}
                  keyboardType='numeric'
                />
              </View>
              <View style={styles.Devider5}></View>
              <View style={{width:'100%', marginLeft:5}}>
                <Text style={styles.textNormal}>Stok Tersedia</Text>
              </View>
              <View style={styles.InputBoxGroup}>
                <TextInput 
                  placeholder='Stok'
                  placeholderTextColor='grey'
                  defaultValue={Stok}
                  value={Stok}
                  onChangeText={Stok => setStok(Stok)}
                  style={styles.textInputGroup}
                  keyboardType='numeric'
                />
                <Text style={styles.textNormal}>Kg</Text>
              </View>
              <View style={styles.Devider5}></View>
              <View style={{width:'100%', marginLeft:5}}>
                <Text style={styles.textNormal}>Deskripsi</Text>
              </View>
              <View style={styles.InputBox}>
                <TextInput 
                  placeholder='Deskripsi'
                  placeholderTextColor='grey'
                  defaultValue={Deskripsi}
                  value={Deskripsi}
                  onChangeText={Deskripsi => setDeskripsi(Deskripsi)}
                  style={styles.textInput}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
              {URIFotoProdukCache ? 
                <View style={{width:'100%', alignItems:'center', marginVertical:5}}>
                  <Image source={{uri:URIFotoProdukCache}} style={styles.ImageProduk} />
                </View>
                :
                <View style={{width:'100%', alignItems:'center'}}>
                  <View style={styles.Devider5}></View>
                  <Text style={styles.textNormal}>Tambahkan Foto Produk</Text>
                </View>
              }
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
              {/* Button Simpan Produk */}
              {NamaModal == 'Tambah Produk' ? 
                <TouchableOpacity onPress={()=>SimpanProduk()} style={styles.BtnSuccess}>
                  <Text style={styles.TextBtnWhite}>Simpan Produk</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>UbahProduk()} style={styles.BtnSuccess}>
                  <Text style={styles.TextBtnWhite}>Ubah Produk</Text>
                </TouchableOpacity>
              }
              <View style={styles.Devider10}></View>
              <View style={styles.Devider10}></View>
            </ScrollView>
        </View>
      </Modal>
      
      {/* Top Bar */}
      <View style={styles.CardRectangle}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon type='ionicon' name='arrow-back' size={20}  color='black' style={{marginRight:20}} />
          </TouchableOpacity>
          <Text style={styles.textLargeBold}>Kelola Produk</Text>
        </View>
      </View>
      <View style={styles.Devider5}></View>
      
      <FlatList style={{marginHorizontal:10}} numColumns={2} data={ArrDataProduk} renderItem={renderItem} keyExtractor={item => item.id_produk} />

      {/* Tombol Tambah Produk */}
      <TouchableOpacity onPress={()=>TambahProduk()} style={{position:'absolute', bottom:50, right:15}}>
        <View style={styles.BtnCircleSuccess}>
          <Icon type='ionicon' name='add' size={30} color='white' />
        </View>
      </TouchableOpacity>
    </SafeAreaProvider>
  )
}

export default KelolaProduk