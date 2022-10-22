import {ScrollView, Text, View, Image, TextInput, TouchableOpacity, FlatList, SafeAreaView, Modal, Dimensions, ToastAndroid } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from '../styles/Main'
import LogoApp from '../../assets/logo.png'
import { BacaLokalJson, BacaLokal, SimpanLokalJson } from '../localstorage';
import { Icon } from '@rneui/base';
import { GETREQ, POSTREQ } from '../controllers'

import IconChat from '../../assets/chat.png'
import IconInfoTani from '../../assets/infotani.png'
import IconTokoTani from '../../assets/shop.png'
import IconDataPanen from '../../assets/statistics.png'
import IconKelolaProdukModal from '../../assets/kelola_produk.png'
import IconTokoTaniModal from '../../assets/toko_tani.png'
import UserPhotoProfile from '../../assets/boy.png'

const windowWidth = parseInt((Dimensions.get('window').width).toFixed(0))-45;
const windowHeight = parseInt((Dimensions.get('window').height).toFixed(0))-45;

const Dashboard = ({navigation}) => {

  const [BaseURL, setBaseURL] = useState('https://siketan.com/')
  const [IDUser, setIDUser] = useState('')
  const [Role, setRole] = useState('')
  const [Nama, setNama] = useState('')
  const [ValPencarian, setValPencarian] = useState('')
  const [ModalTokoTani, setModalTokoTani] = useState(false)
  const [RekomPenyuluh, setRekomPenyuluh] = useState([]);
  const [Token, setToken] = useState('');
  const [ModalPencarian, setModalPencarian] = useState(false);
  const [HasilPencarian, setHasilPencarian] = useState([]);

  const GetDataUser = () => {
    BacaLokalJson('@DataUser').then(response => {
      const JsonResponse = JSON.parse(response);
      setIDUser(JsonResponse.result[0].id_user)
      setRole(JsonResponse.result[0].role)
      setNama(JsonResponse.result[0].nama)
      UpdateData(JsonResponse.result[0].id_user)
    });
  }

  const CekToken = () => {
    BacaLokal('@token').then(response => {
      // console.log('Token Tersimpan = ' + response)
      setToken(response)
    })
  }

  const UpdateData = (id_user) => {
    if(Token){
      var paramater = {
        id_user : id_user,
        token : Token
      }
      POSTREQ('api/user/new_up',paramater).then(response=>{
        // console.log(response);
        if(response.status == true){
          SimpanLokalJson(response, '@DataUser').then(LocalStorage=>{
              console.log('update token = ' + LocalStorage)
          })
        }
      })
    }
  }

  const GetRekomPenyuluh = async () => {
    var parameter = {
      id_user : null
    }
    GETREQ('api/user/list_ready', parameter).then(response=>{
      // console.log(response.result);
      setRekomPenyuluh(response.result);
    })

  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      CekToken()
      GetDataUser()
      GetRekomPenyuluh()
    });
    return unsubscribe;
  }, [Token, IDUser])

  const ActionTokoTani = (screen) => {
    setModalTokoTani(!ModalTokoTani)
    navigation.navigate(screen);
  }

  const CariBerita = () => {
    setModalPencarian(!ModalPencarian);
    var parameter = {
      query : ValPencarian
    }
    POSTREQ('api/search', parameter).then(response=>{
      if(response.status == true){
        console.log(response.result);
        setHasilPencarian(response.result);
      }else{
        setValPencarian(ValPencarian + ' Tidak Ditemukan')
        setHasilPencarian([])
      }
    });
  }

  const BacaSelengkapnya = (id_berita) => {
    setModalPencarian(!ModalPencarian);
    navigation.navigate('DetilBerita', {id_berita:id_berita})
  }

  return (
    <SafeAreaProvider style={{flex:1, backgroundColor:'white'}}>
      <Modal
          animationType="fade"
          transparent={true}
          visible={ModalTokoTani}
          onRequestClose={() => {
            setModalTokoTani(!ModalTokoTani);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity onPress={()=> setModalTokoTani(!ModalTokoTani)} style={{position:'absolute', top:10, right:10, zIndex:10}}>
                <Icon type='font-awesome' name="close" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>ActionTokoTani('KelolaProduk')} style={{alignItems:'center', flex:1}}>
                <Image source={IconKelolaProdukModal} style={styles.ImageMedium}/>
                <View style={styles.Devider5}></View>
                <View style={styles.BtnPrimary}>
                  <View style={{paddingHorizontal:20}}>
                    <Text style={styles.TextBtnWhite}>Kelola Produk</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{borderLeftWidth:0.5, marginHorizontal:10, borderLeftColor:'grey', height:'100%'}}></View>
              <TouchableOpacity onPress={()=>ActionTokoTani('TokoTani')} style={{alignItems:'center', flex:1}}>
                <Image source={IconTokoTaniModal} style={styles.ImageMedium}/>
                <View style={styles.Devider5}></View>
                <View style={styles.BtnPrimary}>
                  <View style={{paddingHorizontal:20}}>
                    <Text style={styles.TextBtnWhite}>Toko Tani</Text>
                  </View>
                </View>
              </TouchableOpacity>
              </View>
        </View>
      </Modal>

      <Modal
          animationType="fade"
          transparent={true}
          visible={ModalPencarian}
          onRequestClose={() => {
            setModalPencarian(!ModalPencarian);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'flex-end', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <ScrollView style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, width:'100%'}}>
              <TouchableOpacity onPress={()=> setModalPencarian(!ModalPencarian)} style={{position:'absolute', top:0, right:5, zIndex:10}}>
                <Icon type='font-awesome' name="close" size={20} color="black" />
              </TouchableOpacity>
              <View style={styles.Devider10}></View>
              <Text style={styles.textLargeBold}>Hasil Pencarian "{ValPencarian}"</Text>
              <View style={styles.Devider5}></View>
              {HasilPencarian.map((item) => (
                <View style={{marginBottom:10}} key={item.id}>
                  <View style={{flexDirection:'row'}}>
                    <Image source={{uri:BaseURL+'upload/berita/'+item.tumbnail}} style={styles.TumbnailBertia} />
                  </View>
                  <View style={styles.Devider5}></View>
                  <View>
                    <Text style={styles.textLargeBold}>{item.judul}</Text>
                    <View style={styles.Devider5}></View>
                    <Text style={styles.textNormal}>{item.deskripsi}</Text>
                  </View>
                  <View style={styles.Devider5}></View>
                  <TouchableOpacity onPress={()=>BacaSelengkapnya(item.id)} style={styles.BtnSuccess}>
                    <Text style={styles.TextBtnWhite}>Baca Selengkapnya</Text>
                  </TouchableOpacity>
                  <View style={styles.Devider10}></View>
                  <View style={styles.UnderlineStrike}></View>
                  <View style={styles.Devider5}></View>
                </View>
              ))}
            </ScrollView>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={styles.CardWhiteFull}>
          <View style={{flexDirection:'row', marginLeft:10, alignItems:'center', justifyContent:'center'}}>
            <View style={{flex:1, borderRadius:20, paddingLeft:10, justifyContent:'center'}}>
              <View style={styles.Devider10}></View>
              <Text style={styles.textLarge}>SI KETAN - Sistem Infromasi Kegiatan Penyuluhan Pertanian</Text>
              <View style={styles.UnderlineStrike}></View>
              <View style={styles.Devider5}></View>
              <Text style={styles.B3Bold}>Hallo!</Text>
              <Text style={styles.B3}>{Nama}</Text>
              {Role == 'Penyuluh' || Role == 'admin' ?
                <TouchableOpacity onPress={()=>navigation.navigate('LaporPenyuluh')} style={styles.BtnSuccess}>
                  <Text style={styles.TextBtnWhite}>Lapor Penyuluh!</Text>
                </TouchableOpacity>
                :
                <View></View>
              }
              <View style={styles.Devider10}></View>
            </View>
            <View style={{marginRight:10, marginLeft:10, borderWidth:5, borderColor:'green', borderRadius:20, justifyContent:'center', paddingHorizontal:10, paddingVertical:10}}>
              <Image source={LogoApp} style={styles.ImageMedium} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.Devider10}></View>
          <View style={styles.InputBoxGroup}>
            <TextInput 
                placeholder='Masukkan kata kunci, contoh : wereng'
                placeholderTextColor='grey'
                defaultValue={ValPencarian}
                onChangeText={value=>setValPencarian(value)}
                style={styles.textInputGroup}
            />
            <TouchableOpacity onPress={()=>CariBerita()}>
              <Icon type='font-awesome' name='search' size={16} style={{marginRight:10}} />
            </TouchableOpacity>
        </View>

        {/* daftar menu */}
        <View style={styles.Devider10}></View>
        <View style={{flexDirection:'row', paddingHorizontal:10}}>
          <TouchableOpacity onPress={()=>navigation.navigate('RoomChat')} style={{alignItems:'center', flex:1}}>
            <View style={styles.MenuIcon}>
              <Image source={IconChat} style={styles.ImageMenuIcon} />
            </View>
            <View style={styles.Devider3}></View>
            <Text style={styles.textNormal}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setModalTokoTani(!ModalTokoTani)} style={{alignItems:'center', flex:1}}>
            <View style={styles.MenuIcon}>
              <Image source={IconTokoTani} style={styles.ImageMenuIcon} />
            </View>
            <View style={styles.Devider3}></View>
            <Text style={styles.textNormal}>Toko Tani</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('InfoTani')} style={{alignItems:'center', flex:1}}>
            <View style={styles.MenuIcon}>
              <Image source={IconInfoTani} style={styles.ImageMenuIcon} />
            </View>
            <View style={styles.Devider3}></View>
            <Text style={styles.textNormal}>Info Tani</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('DataPanen')} style={{alignItems:'center', flex:1}}>
            <View style={styles.MenuIcon}>
              <Image source={IconDataPanen} style={styles.ImageMenuIcon} />
            </View>
            <View style={styles.Devider3}></View>
            <Text style={styles.textNormal}>Data Panen</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Devider10}></View>
        <View style={styles.UnderlineStrike}></View>
        <View style={styles.Devider10}></View>

        {/* Rekomedasi penyuluh */}
        <Text style={styles.textLargeBold}>Rekomendasi Penyuluh</Text>
        <Text style={styles.textNormal}>Konsultasi online dengan penyuluh siaga kami</Text>
        <View style={styles.Devider10}></View>
        {/* Looping Array Rekomendasi Penyuluh */}
          {RekomPenyuluh.map((item) => (
            <View style={{marginBottom:15}} key={item.id_user}>
              <View style={{flexDirection:'row'}}>
                <View style={styles.CardRectangle}>
                  {item.photo?
                    <View style={styles.CardPhotoProfile}>
                      <Image source={{uri:BaseURL+'upload/profile/'+item.photo}} style={styles.PhotoProfile} />
                    </View>
                    :
                    <View style={styles.CardPhotoProfile}>
                      <Image source={UserPhotoProfile} style={styles.PhotoProfile} />
                    </View>
                  }
                </View>
                <View style={{marginLeft:10}}>
                  <Text style={styles.textNormalBold}>{item.nama}</Text>
                  <Text style={styles.textNormal}>{item.pekerjaan}</Text>
                  <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'#d3d3d3', borderRadius:10, paddingVertical:5}}>
                      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                        <Icon type='font-awesome' name='briefcase' size={12} color='grey' style={{ marginRight:5 }} />
                        <Text style={styles.textSmallGreyBold}>{item.pengalaman} tahun</Text>
                      </View>
                    </View>
                    <View style={{backgroundColor:'#d3d3d3', borderRadius:10, paddingVertical:5, marginLeft:5}}>
                      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                        <Icon type='font-awesome' name='thumbs-up' size={12} color='grey' style={{ marginRight:5 }} />
                        <Text style={styles.textSmallGreyBold}>{item.rating}%</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.Devider5}></View>
                  {Role == 'Pengguna Umum'? 
                    <TouchableOpacity onPress={()=> navigation.navigate('Chat', {id_user2:item.id_user})} style={styles.BtnDanger}>
                      <Text style={styles.TextBtnWhite}>Chat Sekarang!</Text>
                    </TouchableOpacity>
                    :
                    <View></View>
                  }
                </View>
              </View>
              <View style={styles.Devider10}></View>
              <View style={styles.UnderlineStrike}></View>
            </View>
          ))}
          {/* Looping Rekomendasi Penyuluh Selesai */}
        <View style={styles.Devider10}></View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default Dashboard
