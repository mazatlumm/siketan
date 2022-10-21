import { Text, TouchableOpacity, View, Modal } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { BacaLokalJson } from '../localstorage'
import styles from '../styles/Main'
import { GETREQ, POSTREQ } from '../controllers';
import { Icon } from '@rneui/base';

let id_userku = 0;
let id_usernya = 0;
let id_chat = 0;
let roleku = '';
var PesanTersimpan = [];
let SedangKirim = 0;

const Chat = ({navigation,route}) => {

    const [BaseUrl, setBaseUrl] = useState('https://siketan.com/');
    const [Messages, setMessages] = useState([]);
    const [IDUser, setIDUser] = useState('');
    const [Nama, setNama] = useState('');
    const [Photo, setPhoto] = useState('');
    const [ModalHapusPesan, setModalHapusPesan] = useState(false);

    const GetDataUser = () => {
      BacaLokalJson('@DataUser').then(response => {
        const JsonResponse = JSON.parse(response);
        id_userku = JsonResponse.result[0].id_user
        roleku = JsonResponse.result[0].role
        setIDUser(JsonResponse.result[0].id_user);
        setNama(JsonResponse.result[0].nama);
        setPhoto(BaseUrl+'upload/profile/'+JsonResponse.result[0].photo);
      });
    }

    const GetDataRoute = () => {
      console.log('Nilai Params: ')
      console.log(route.params.id_user2);
      if(route.params != undefined){
        id_usernya = route.params.id_user2;
        id_chat = route.params.id_chat
      }
    }
  
    useEffect(() => {
      GetDataUser();
      GetDataRoute();
      const interval = setInterval(() => {
        GetPesan();
      }, 1000);
      return () => clearInterval(interval);
    }, [IDUser])

    const onSend = useCallback((messages = []) => {
      SedangKirim = 1;
      const ChatRead = previousMessages => GiftedChat.append(previousMessages, messages)
      setMessages(ChatRead)
      var ArrPesan = PesanTersimpan;
      ArrPesan.sort();
      ArrPesan.reverse();
      ArrPesan.push(messages[0]);
      PesanTersimpan = ArrPesan;
      KirimPesan(ArrPesan, messages[0]);
    }, [])

    const KirimPesan = async (Chat, pesan) => {
      var parameter = {
        id_user1 : id_userku,
        id_user2 : id_usernya,
        id_chat : id_chat,
        chat: JSON.stringify(Chat)
      }
      console.log(parameter);
      POSTREQ('api/chat/send',parameter).then(response=>{
        // console.log(response);
        SedangKirim = 0;
      });
      //kirim notifikasi 
      var parameter2 = {
        penerima : id_usernya,
        pesan : pesan
      }
      // console.log(parameter2)
      POSTREQ('api/chat/notifikasi', parameter2).then(response=>{
        // console.log(response);
      })
    }

    const GetPesan = async () => {
      if(SedangKirim == 0){
        var parameter = {
          id_user1 : id_userku,
          id_user2 : id_usernya,
          role : roleku,
          id_chat : id_chat,
        }
        console.log(parameter);
        GETREQ('api/chat/conversation', parameter).then(response=>{
          if(response.status == true){
            // console.log(response)
            id_chat = response.result[0].id;
            var DataGetChat = JSON.parse(response.result[0].chat);
            DataGetChat.sort();
            DataGetChat.reverse();
            // console.log(DataGetChat.sort());
            setMessages(DataGetChat.sort());
            PesanTersimpan = DataGetChat.sort();
          }
          if(response.status == false){
            // console.log(response)
            setMessages([]);
            PesanTersimpan = [];
          }
        });
      }
    }

    const HapusPesan = () => {
      var parameter = {
        id_chat : id_chat
      }
      GETREQ('api/chat/hapus', parameter).then(response=>{
        console.log(response);
        if(response.status == true){
          navigation.navigate('RoomChat');
        }
      })
    }

    return (
      <View style={{flex:1}}>
         <Modal
          animationType="fade"
          transparent={true}
          visible={ModalHapusPesan}
          onRequestClose={() => {
            setModalHapusPesan(!ModalHapusPesan);
          }}
        >
            <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
              <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, alignItems:'center', justifyContent:'center', width:'100%'}}>
                  <TouchableOpacity onPress={()=> setModalHapusPesan(!ModalHapusPesan)} style={{position:'absolute', top:10, right:10, zIndex:10}}>
                      <Icon type='font-awesome' name="close" size={20} color="black" />
                  </TouchableOpacity>
                  <View style={styles.Devider5}></View>
                  <Text style={styles.textLargeBold}>Bersihkan Pesan</Text>
                  <View style={styles.Devider5}></View>
                  <Text style={styles.textNormal}>Pesan yang telah dibersihkan tidak dapat dikembalikan</Text>
                  <View style={styles.Devider5}></View>
                  <TouchableOpacity onPress={()=>HapusPesan()} style={styles.BtnDanger}>
                      <Text style={styles.TextBtnWhite}>Bersihkan Pesan</Text>
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
            <View style={{flex:1, marginRight:10}}>
              <Text style={styles.textLargeBold}>Pesan Anda</Text>
            </View>
            {roleku != 'Pengguna Umum' ?
              <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={()=>setModalHapusPesan(!ModalHapusPesan)}>
                <Icon type='ionicon' name='trash' size={20}  color='black' />
              </TouchableOpacity>
              :
              <View></View>
            }
          </View>
        </View>
        <GiftedChat
            messages={Messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: IDUser,
                name: Nama,
                avatar: Photo,
            }}
            placeholder='Tulis Pesan...'
            textInputStyle={styles.textInput}
        />
      </View>
    )
    }

export default Chat
