import {ScrollView, Text, View, Image, TextInput, TouchableOpacity, FlatList, SafeAreaView, Modal, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from '../styles/Main'
import LogoApp from '../../assets/logo.png'
import { BacaLokalJson } from '../localstorage';
import { Icon } from '@rneui/base';

import IconChat from '../../assets/chat.png'
import IconInfoTani from '../../assets/infotani.png'
import IconTokoTani from '../../assets/shop.png'
import IconDataPanen from '../../assets/statistics.png'
import IconKelolaProdukModal from '../../assets/kelola_produk.png'
import IconTokoTaniModal from '../../assets/toko_tani.png'

const windowWidth = parseInt((Dimensions.get('window').width).toFixed(0))-45;
const windowHeight = parseInt((Dimensions.get('window').height).toFixed(0))-45;

const Dashboard = ({navigation}) => {

  const [BaseURL, setBaseURL] = useState('https://alicestech.com/siketan/')
  const [Nama, setNama] = useState('')
  const [ValPencarian, setValPencarian] = useState('')
  const [ModalTokoTani, setModalTokoTani] = useState(false)
  const [RekomPenyuluh, setRekomPenyuluh] = useState([]);

  const GetDataUser = () => {
    BacaLokalJson('@DataUser').then(response => {
      const JsonResponse = JSON.parse(response);
      setNama(JsonResponse.result[0].nama)
    });
  }

  const GetRekomPenyuluh = async () => {
    const datarekomPenyuluh = [
      {
        id_user : 1,
        nama : "Dr. Ahmad Dedu Syathori",
        pekerjaan : "Penyuluh Pertanian",
        pengalaman : 8,
        rating : 100,
        foto : "fotopetani.png"
      },
      {
        id_user : 2,
        nama : "Muhammad Multazam",
        pekerjaan : "Penyuluh Pertanian",
        pengalaman : 2,
        rating : 95,
        foto : "petaniGo.png"
      }
    ];

    setRekomPenyuluh(datarekomPenyuluh);
  }

  useEffect(() => {
    GetDataUser()
    GetRekomPenyuluh()
  }, [])

  const ActionTokoTani = (screen) => {
    setModalTokoTani(!ModalTokoTani)
    navigation.navigate(screen);
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
                placeholder='contoh: cara mengatasi hama wereng...'
                placeholderTextColor='grey'
                defaultValue={ValPencarian}
                onChangeText={value=>setValPencarian(value)}
                style={styles.textInputGroup}
            />
            <Icon type='font-awesome' name='search' size={16} style={{marginRight:10}} />
        </View>

        {/* daftar menu */}
        <View style={styles.Devider10}></View>
        <View style={{flexDirection:'row', paddingHorizontal:10}}>
          <TouchableOpacity style={{alignItems:'center', flex:1}}>
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
                  <Image source={{uri:BaseURL+'upload/profile/'+item.foto}} style={styles.FotoPetani} />
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
                  <TouchableOpacity style={styles.BtnDanger}>
                    <Text style={styles.TextBtnWhite}>Chat Sekarang!</Text>
                  </TouchableOpacity>
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
