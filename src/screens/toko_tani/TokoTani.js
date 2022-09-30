import { View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, ScrollView, FlatList, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from '../../styles/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from '@rneui/base';
import { GETREQ } from '../../controllers';

const windowWidth = parseInt((Dimensions.get('window').width).toFixed(0))-45;
const windowHeight = parseInt((Dimensions.get('window').height).toFixed(0))-45;

const TokoTani = ({navigation}) => {

  const [BaseURL, setBaseURL] = useState('https://alicestech.com/siketan/')
  const [IDUser, setIDUser] = useState('')
  const [IDProduk, setIDProduk] = useState('')
  const [NamaProduk, setNamaProduk] = useState('')
  const [Harga, setHarga] = useState('')
  const [Stok, setStok] = useState('')
  const [Deskripsi, setDeskripsi] = useState('')
  const [URIFotoProdukCache, setURIFotoProdukCache] = useState('')
  const [ArrDataProduk, setArrDataProduk] = useState([])
  const [LoadingProduk, setLoadingProduk] = useState(false)

  const GetProduk = () => {
    var parameter = {}
    GETREQ('api/produk/list', parameter).then(response => {
      console.log(response.status)
      if(response.status == true){
        setArrDataProduk(response.result);
      }
      setLoadingProduk(false);
    });
  }

  useEffect(() => {
    setLoadingProduk(true);
    GetProduk();
  }, [IDUser])
  
  const FormatRupiahGo = (angka) => {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const Item = ({ id_produk, id_user, penjual, nama_produk, stok, harga, deskripsi, foto, created, updated}) => (
    <TouchableOpacity style={styles.CardProduk}>
      <Image source={{uri:BaseURL+'upload/produk/'+foto}} style={styles.ImageProduk} />
      <View style={styles.Devider5}></View>
      <Text style={styles.textLargeBold}>{nama_produk}</Text>
      <Text style={styles.textNormal}>{stok} kg</Text>
      <Text style={styles.textNormal}>{FormatRupiahGo(harga)}</Text>
      <Text style={styles.textNormalBold}>"{penjual}"</Text>
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => <Item 
  id_produk={item.id_produk} 
  id_user={item.id_user} 
  nama_produk={item.nama_produk} 
  stok={item.stok} 
  harga={item.harga} 
  foto={item.foto} 
  penjual={item.penjual} 
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
      
      {/* Top Bar */}
      <View style={styles.CardRectangle}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon type='ionicon' name='arrow-back' size={20}  color='black' style={{marginRight:20}} />
          </TouchableOpacity>
          <Text style={styles.textLargeBold}>Toko Tani</Text>
        </View>
      </View>
      <View style={styles.Devider5}></View>
      
      <FlatList style={{marginHorizontal:10}} numColumns={2} data={ArrDataProduk} renderItem={renderItem} keyExtractor={item => item.id_produk} />

    </SafeAreaProvider>
  )
}

export default TokoTani