import {ScrollView, Text, View, Image, TextInput, TouchableOpacity, FlatList, SafeAreaView, Modal, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from '../styles/Main'
import { BacaLokalJson } from '../localstorage';
import { Icon } from '@rneui/base';
import { GETREQ, POSTREQ } from '../controllers'

import UserPhotoProfile from '../../assets/boy.png'

const windowWidth = parseInt((Dimensions.get('window').width).toFixed(0))-45;
const windowHeight = parseInt((Dimensions.get('window').height).toFixed(0))-45;

var id_user_cek = '';
var role_cek = '';

const RoomChat = ({navigation}) => {

  const [BaseURL, setBaseURL] = useState('https://siketan.com/')
  const [RekomChat, setRekomChat] = useState([]);
  const [IDUser, setIDUser] = useState([]);
  const [IDUserRating, setIDUserRating] = useState([]);
  const [Nama, setNama] = useState('');
  const [Role, setRole] = useState('');
  const [TitleChat, setTitleChat] = useState('');
  const [DeskripsiChat, setDeskripsiChat] = useState('');
  const [TitleButtonChat, setTitleButtonChat] = useState('');
  const [ModalKasihRating, setModalKasihRating] = useState(false);
  const [ModalTerimakasih, setModalTerimakasih] = useState(false);
  const [IconStar1, setIconStar1] = useState('star-outline')
  const [IconStar2, setIconStar2] = useState('star-outline')
  const [IconStar3, setIconStar3] = useState('star-outline')
  const [IconStar4, setIconStar4] = useState('star-outline')
  const [IconStar5, setIconStar5] = useState('star-outline')
  const [ColorStar1, setColorStar1] = useState('black')
  const [ColorStar2, setColorStar2] = useState('black')
  const [ColorStar3, setColorStar3] = useState('black')
  const [ColorStar4, setColorStar4] = useState('black')
  const [ColorStar5, setColorStar5] = useState('black')
  const [NilaiRating, setNilaiRating] = useState('')

  const GetDataUser = () => {
    BacaLokalJson('@DataUser').then(response => {
      const JsonResponse = JSON.parse(response);
      id_user_cek = JsonResponse.result[0].id_user;
      role_cek = JsonResponse.result[0].role;
      setIDUser(JsonResponse.result[0].id_user)
      setNama(JsonResponse.result[0].nama)
      setRole(JsonResponse.result[0].role)
      if(JsonResponse.result[0].role == 'Pengguna Umum'){
        setTitleChat('Rekomendasi Penyuluh')
        setDeskripsiChat('Konsultasi Online dengan penyuluh siaga kami')
        setTitleButtonChat('Chat Sekarang!')
        GetRekomChat()
      }else{
        setTitleChat('Rekomendasi Chat Pengguna')
        setDeskripsiChat('Periksa chat masuk dari pengguna aplikasi SIKeTan')
        setTitleButtonChat('Lihat Pesan!')
        GetPenggunaUmumChat(id_user_cek, role_cek);
      }
    });
  }

  const GetRekomChat = async () => {
    var parameter = {
      id_user : null
    }
    GETREQ('api/user/list_all', parameter).then(response=>{
      console.log(response.result);
      if(response.status == true){
        setRekomChat(response.result);
      }else{
        setRekomChat([]);
      }
    })

  }
  
  const GetPenggunaUmumChat = async (id_user_cek, role_cek) => {
    if(role_cek == 'Penyuluh'){
      var parameter = {
        id_user2 : id_user_cek
      }
    }
    if(role_cek == 'admin'){
      var parameter = {
        id_user2 : null
      }
    }
    console.log('Penyuluh Get Chat: ');
    console.log(parameter);
    GETREQ('api/chat/list_penyuluh', parameter).then(response=>{
      console.log(response.result);
      if(response.status == true){
        setRekomChat(response.result);
      }else{
        setRekomChat([]);
      }
    })

  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetDataUser()
    });
    return unsubscribe;
  }, [])

  const KasihRating = (id_user) => {
    console.log(id_user)
    setIDUserRating(id_user);
    setModalKasihRating(!ModalKasihRating);
  }

  const Rating = (rating) => {
    const GoldColor = "#FFD700";
    if(!rating){
        setColorStar1('black')
        setIconStar1('star-outline')
        setColorStar2('black')
        setIconStar2('star-outline')
        setColorStar3('black')
        setIconStar3('star-outline')
        setColorStar4('black')
        setIconStar4('star-outline')
        setColorStar5('black')
        setIconStar5('star-outline')
    }
    if(rating == 1){
        setColorStar1(GoldColor)
        setIconStar1('star')
        setColorStar2('black')
        setIconStar2('star-outline')
        setColorStar3('black')
        setIconStar3('star-outline')
        setColorStar4('black')
        setIconStar4('star-outline')
        setColorStar5('black')
        setIconStar5('star-outline')
    }
    if(rating == 2){
        setColorStar1(GoldColor)
        setIconStar1('star')
        setColorStar2(GoldColor)
        setIconStar2('star')
        setColorStar3('black')
        setIconStar3('star-outline')
        setColorStar4('black')
        setIconStar4('star-outline')
        setColorStar5('black')
        setIconStar5('star-outline')
    }
    if(rating == 3){
        setColorStar1(GoldColor)
        setIconStar1('star')
        setColorStar2(GoldColor)
        setIconStar2('star')
        setColorStar3(GoldColor)
        setIconStar3('star')
        setColorStar4('black')
        setIconStar4('star-outline')
        setColorStar5('black')
        setIconStar5('star-outline')
    }
    if(rating == 4){
        setColorStar1(GoldColor)
        setIconStar1('star')
        setColorStar2(GoldColor)
        setIconStar2('star')
        setColorStar3(GoldColor)
        setIconStar3('star')
        setColorStar4(GoldColor)
        setIconStar4('star')
        setColorStar5('black')
        setIconStar5('star-outline')
    }
    if(rating == 5){
        setColorStar1(GoldColor)
        setIconStar1('star')
        setColorStar2(GoldColor)
        setIconStar2('star')
        setColorStar3(GoldColor)
        setIconStar3('star')
        setColorStar4(GoldColor)
        setIconStar4('star')
        setColorStar5(GoldColor)
        setIconStar5('star')
    }
    setNilaiRating(rating)
  }

  const KirimRating = () => {
    setModalKasihRating(!ModalKasihRating)
    setModalTerimakasih(!ModalTerimakasih);
    var parameter = {
      id_user : IDUser,
      id_user_rating : IDUserRating,
      rating : NilaiRating
    }
    POSTREQ('api/rating', parameter).then(response=>{
      console.log(response)
      if(response.status == true){
        GetRekomChat()
      }
    });
  }


  return (
    <SafeAreaProvider style={{flex:1, backgroundColor:'white'}}>
       <Modal
          animationType="fade"
          transparent={true}
          visible={ModalKasihRating}
          onRequestClose={() => {
            setModalKasihRating(!ModalKasihRating);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, alignItems:'center', justifyContent:'center', width:'100%'}}>
                <TouchableOpacity onPress={()=> setModalKasihRating(!ModalKasihRating)} style={{position:'absolute', top:10, right:10, zIndex:10}}>
                    <Icon type='font-awesome' name="close" size={20} color="black" />
                </TouchableOpacity>
                <View style={styles.Devider5}></View>
                <Text style={styles.textLargeBold}>Rating Pelayanan</Text>
                <View style={styles.Devider5}></View>
                <Text style={styles.textNormal}>Berikan Rating Terbaik Anda Kepada Para Penyuluh Kami</Text>
                <View style={styles.Devider5}></View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>Rating(1)}>
                      <Icon type='ionicon' name={IconStar1} size={40} color={ColorStar1} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Rating(2)}>
                      <Icon type='ionicon' name={IconStar2} size={40} color={ColorStar2} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Rating(3)}>
                      <Icon type='ionicon' name={IconStar3} size={40} color={ColorStar3} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Rating(4)}>
                      <Icon type='ionicon' name={IconStar4} size={40} color={ColorStar4} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Rating(5)}>
                      <Icon type='ionicon' name={IconStar5} size={40} color={ColorStar5} />
                    </TouchableOpacity>
                </View>
                <View style={styles.Devider10}></View>
                <TouchableOpacity onPress={()=>KirimRating()} style={styles.BtnSuccess}>
                  <Text style={styles.TextBtnWhite}>Kirim Rating</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

      <Modal
          animationType="fade"
          transparent={true}
          visible={ModalTerimakasih}
          onRequestClose={() => {
            setModalTerimakasih(!ModalTerimakasih);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, alignItems:'center', justifyContent:'center', width:'100%'}}>
                <TouchableOpacity onPress={()=> setModalTerimakasih(!ModalTerimakasih)} style={{position:'absolute', top:10, right:10, zIndex:10}}>
                    <Icon type='font-awesome' name="close" size={20} color="black" />
                </TouchableOpacity>
                <View style={styles.Devider5}></View>
                <Text style={styles.textLargeBold}>Terimakasih</Text>
                <View style={styles.Devider5}></View>
                <View style={styles.Devider5}></View>
                <View style={{flexDirection:'row'}}>
                    <View>
                      <Icon type='ionicon' name={IconStar1} size={40} color={ColorStar1} />
                    </View>
                    <View>
                      <Icon type='ionicon' name={IconStar2} size={40} color={ColorStar2} />
                    </View>
                    <View>
                      <Icon type='ionicon' name={IconStar3} size={40} color={ColorStar3} />
                    </View>
                    <View>
                      <Icon type='ionicon' name={IconStar4} size={40} color={ColorStar4} />
                    </View>
                    <View>
                      <Icon type='ionicon' name={IconStar5} size={40} color={ColorStar5} />
                    </View>
                </View>
                <View style={styles.Devider10}></View>
                <View>
                  <Text style={styles.textNormal}>Rating Berhasil Terkirim,</Text>
                  <Text style={styles.textNormal}>Rating Anda akan membantu kami untuk meningkatkan pelayanan kami</Text>
                </View>
                
            </View>
        </View>
      </Modal>
      <ScrollView style={styles.container}>
        {/* Top Bar */}
        <View style={styles.CardRectangle}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Icon type='ionicon' name='arrow-back' size={20}  color='black' style={{marginRight:20}} />
            </TouchableOpacity>
            <Text style={styles.textLargeBold}>Ruang Chat</Text>
            </View>
        </View>
        <View style={styles.Devider5}></View>
        {/* Rekomedasi penyuluh */}
        <Text style={styles.textLargeBold}>{TitleChat}</Text>
        <Text style={styles.textNormal}>{DeskripsiChat}</Text>
        <View style={styles.Devider10}></View>
        {/* Looping Array Rekomendasi Penyuluh */}
          {RekomChat.map((item) => (
            <View style={{marginBottom:15}} key={item.id}>
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
                <View style={{marginLeft:10, flex:1}}>
                  {Role != 'Pengguna Umum'?
                    <View>
                      <Text style={styles.textNormalBold}>{item.nama}</Text>
                      <Text style={styles.textNormal}>Kepada : {item.nama_penyuluh}</Text>
                      <Text style={styles.textNormal}>{item.pesan_terakhir}</Text>
                      <Text style={styles.textNormal}>Status : {item.status}</Text>
                    </View>
                    :
                    <View>
                      <Text style={styles.textNormalBold}>{item.nama}</Text>
                      <Text style={styles.textNormal}>{item.pekerjaan}</Text>
                    </View>
                  }
                  {Role == 'Pengguna Umum'?
                  <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'#d3d3d3', borderRadius:10, paddingVertical:5}}>
                      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                        <Icon type='font-awesome' name='briefcase' size={12} color='grey' style={{ marginRight:5 }} />
                        <Text style={styles.textSmallGreyBold}>{item.pengalaman} tahun</Text>
                      </View>
                    </View>
                    <View style={{backgroundColor:'#d3d3d3', borderRadius:10, paddingVertical:5, marginLeft:5}}>
                      <TouchableOpacity onPress={()=>KasihRating(item.id_user)} style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                        <Icon type='font-awesome' name='thumbs-up' size={12} color='grey' style={{ marginRight:5 }} />
                        <Text style={styles.textSmallGreyBold}>{item.rating}%</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  :
                  <View></View>
                  }
                  <View style={styles.Devider5}></View>
                  {item.status == 'Sudah Dijawab'?
                    <TouchableOpacity onPress={()=> navigation.navigate('Chat', {id_user2:item.id_user, id_chat:item.id})} style={styles.BtnSuccess}>
                      <Text style={styles.TextBtnWhite}>{TitleButtonChat}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=> navigation.navigate('Chat', {id_user2:item.id_user, id_chat:item.id})} style={styles.BtnDanger}>
                      <Text style={styles.TextBtnWhite}>{TitleButtonChat}</Text>
                    </TouchableOpacity>
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

export default RoomChat
