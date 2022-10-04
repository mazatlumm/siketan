import { View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, ScrollView, FlatList, Dimensions, Linking } from 'react-native'
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
  const [NamaPenjual, setNamaPenjual] = useState('')
  const [NoHp, setNoHp] = useState('')
  const [Harga, setHarga] = useState('')
  const [Stok, setStok] = useState('')
  const [Deskripsi, setDeskripsi] = useState('')
  const [FotoProduk, setFotoProduk] = useState('')
  const [ArrDataProduk, setArrDataProduk] = useState([])
  const [LoadingProduk, setLoadingProduk] = useState(false)
  const [ModalDetilProduk, setModalDetilProduk] = useState('')

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

  const OpenDetilProduk = (id_produk, id_user, penjual, no_telp, nama_produk, stok, harga, deskripsi, foto, created, updated) => {
    setIDProduk(id_produk);
    setNamaPenjual(penjual);
    setNoHp(no_telp);
    setNamaProduk(nama_produk);
    setStok(stok);
    setHarga(harga);
    setDeskripsi(deskripsi);
    setFotoProduk(BaseURL+'upload/produk/'+foto);
    setModalDetilProduk(!ModalDetilProduk)
  }

  const WhatsAppLink = (nomorWA, penjual, nama_barang) => {
    let msg = "Hai Pak/Bu "+ penjual +", Saya ingin membeli produk yang Anda pasarkan di Aplikasi SIKeTan yakni : " + nama_barang;
    let mobile = nomorWA;
    const regex = new RegExp("^0+(?!$)",'g');
    var strMobileNumber = mobile.toString().replace(regex, "");
    if(mobile){
      if(msg){
      // Kode negara 62 = Indonesia
        let url = 'whatsapp://send?text=' + msg + '&phone=' + strMobileNumber;
        Linking.openURL(url).then((data) => {
          console.log('WhatsApp Opened');
        }).catch(() => {
          Alert.alert('Maaf', 'Silahkan install aplikasi Whatsapp terlebih dahulu');
        });
      }else{
        Alert.alert('Maaf', 'Pesanan masih kosong');
      }
    }else{
      Alert.alert('Maaf', 'Penjual Tidak Memasukkan Nomor WA/Telephone');
    }
  }

  const Item = ({ id_produk, id_user, penjual, no_telp, nama_produk, stok, harga, deskripsi, foto, created, updated}) => (
    <TouchableOpacity onPress={()=>OpenDetilProduk(id_produk, id_user, penjual, no_telp, nama_produk, stok, harga, deskripsi, foto, created, updated)} style={styles.CardProduk}>
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
  no_telp={item.no_telp} 
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

      {/* Detil Produk */}
      <Modal
          animationType="fade"
          transparent={true}
          visible={ModalDetilProduk}
          onRequestClose={() => {
            setModalDetilProduk(!ModalDetilProduk);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'flex-end', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, width:'100%', justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>setModalDetilProduk(!ModalDetilProduk)} style={{position:'absolute', right:10, top:10}}>
                    <Icon type='font-awesome' name='close' size={16} />
                </TouchableOpacity>
                <Text style={styles.textLargeBold}>Detil Produk</Text>
                <View style={styles.Devider5}></View>
                <View style={styles.CardRectangle}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity style={styles.CardPhotoProfile}>
                    <Image source={{uri:FotoProduk}} style={styles.PhotoProfile} />
                </TouchableOpacity>
                <View style={{marginLeft:10}}>
                    <Text style={styles.textNormalBold}>{NamaProduk}</Text>
                    <Text style={styles.textNormal}>{FormatRupiahGo(Harga)}</Text>
                    <Text style={styles.textNormal}>{Stok} kg</Text>
                    <Text style={styles.textNormal}>Penjual : {NamaPenjual}</Text>
                    <Text style={styles.textNormal}>No WA/HP : {NoHp}</Text>
                    <View style={styles.Devider5}></View>
                </View>
            </View>
            <View style={styles.Devider5}></View>
            <Text style={styles.textNormalBold}>Deskripsi Produk</Text>
            <Text style={styles.textNormal}>{Deskripsi}</Text>
            <View style={styles.Devider10}></View>
            <TouchableOpacity onPress={()=> WhatsAppLink(NoHp, NamaPenjual, NamaProduk) } style={styles.BtnSuccess}>
              <Text style={styles.TextBtnWhite}>Hubungi Penjual</Text>
            </TouchableOpacity>
        </View>
                
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