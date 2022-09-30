import { View, Text, TouchableOpacity, Modal, TextInput, Image, Alert, ScrollView, FlatList, Dimensions, ToastAndroid } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from '../styles/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon, Rating } from '@rneui/base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { GETREQ, POSTREQ } from '../controllers';
import { BacaLokalJson, SimpanLokalJson, HapusLokal } from '../localstorage';

import UserPhotoProfile from '../../assets/boy.png'

const Profile = ({navigation}) => {

    const [BaseURL, setBaseURL] = useState('https://alicestech.com/siketan/')
    const [LoadingApp, setLoadingApp] = useState(false)
    const [IDUser, setIDUser] = useState('')
    const [Nama, setNama] = useState('')
    const [Pekerjaan, setPekerjaan] = useState('Pekerjaan')
    const [Email, setEmail] = useState('')
    const [NoHp, setNoHp] = useState('')
    const [Pengalaman, setPengalaman] = useState('')
    const [Password, setPassword] = useState('')
    const [StatusPassword, setStatusPassword] = useState('')
    const [ModalAmbilFoto, setModalAmbilFoto] = useState(false)
    const [URIFotoProfileCache, setURIFotoProfileCache] = useState('')
    const [Rating, setRating] = useState('')
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

    const GetDataUser = () => {
        BacaLokalJson('@DataUser').then(response => {
          const JsonResponse = JSON.parse(response);
          console.log(JsonResponse.result[0]);
          setIDUser(JsonResponse.result[0].id_user)
          setNama(JsonResponse.result[0].nama)
          setEmail(JsonResponse.result[0].email)
          setNoHp(JsonResponse.result[0].no_telp)
          setPekerjaan(JsonResponse.result[0].pekerjaan)
          setPengalaman(JsonResponse.result[0].pengalaman)
          setRating(JsonResponse.result[0].rating)
          if(JsonResponse.result[0].photo != null){
              setURIFotoProfileCache(BaseURL+'upload/profile/'+JsonResponse.result[0].photo)
          }
          CekRating(JsonResponse.result[0].rating);
        });
    }

    useEffect(() => {
        GetDataUser()
    }, [])

    const SimpanProfile = () => {
        var parameter = {
            id_user:IDUser,
            nama:Nama,
            email:Email,
            no_telp:NoHp,
            pekerjaan:Pekerjaan,
            pengalaman:Pengalaman,
            password:Password
        }
        POSTREQ('api/user/edit', parameter).then(response => {
            SimpanLokalJson(response,'@DataUser').then(responseStorage=>{
                console.log('Status Simpan Lokal : ' + responseStorage);
            })
        });
    }

    const Logout = () => {
        HapusLokal('@DataUser').then(responseStorage=>{
            console.log('Menghapus Data User : ' + responseStorage);
        })
        navigation.navigate('Login');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    const CekKekuatanPassword = (password) => {
        setPassword(password)
        let checklowercase = /(?=.*[a-z])/;
        let checkuppercase = /(?=.*[A-Z])/;
        let checknumeric = /(?=.*[0-9])/;
        let checkelength = /(?=.{8,})/;
        if (!password.match(checklowercase)) {
         setStatusPassword("Password wajib terdiri dari huruf besar dan kecil.");
          return
        }
        if (!password.match(checkuppercase)) {
         setStatusPassword("Password wajib terdiri dari huruf besar dan kecil.");
          return
        }
        if (!password.match(checknumeric)) {
         setStatusPassword("Password wajib memiliki setidaknya 1 angka di dalamnya.");
          return
        }
        if (!password.match(checkelength)) {
         setStatusPassword("Password minimal memiliki 8 karakter.");
          return
        }
       setStatusPassword('valid')
        return
    }

    const AmbilFotoProfile = async (type) => {
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
              setURIFotoProfileCache(resizedImage.uri);
              SimpanFotoProfile(resizedImage.uri);
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

    const SimpanFotoProfile = async (uriImage) => {
        setLoadingApp(true);
        var myHeaders = new Headers();
    
        let filename = uriImage.split('/').pop();
    
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
    
        var formdata = new FormData();
        formdata.append("id_user", IDUser);
        formdata.append("image", { uri: uriImage, name: filename, type: type});
        
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };
    
        await fetch(BaseURL + "api/user/photo_profile", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if(result.status == true){
                SimpanLokalJson(result,'@DataUser').then(responseStorage=>{
                    console.log('Status Simpan Lokal : ' + responseStorage);
                })
            }
            setLoadingApp(false);
            setModalAmbilFoto(!ModalAmbilFoto)
        })
        .catch(error => {
            setLoadingApp(false)
            console.log('error')
            setModalAmbilFoto(!ModalAmbilFoto)
            ToastAndroid.showWithGravity(
                "Gagal Upload, Ulangi Lagi",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
        });
    }

    const CekRating = (rating) => {
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
    }
    

  return (
    <SafeAreaProvider style={{flex:1}}>
      {/* Loading */}
      <Modal
          animationType="fade"
          transparent={true}
          visible={LoadingApp}
          onRequestClose={() => {
            setLoadingApp(!LoadingApp);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, width:'100%', alignItems:'center', justifyContent:'center'}}>
              <Text style={styles.textNormal}>Tunggu sebentar...</Text>
            </View>
        </View>
      </Modal>

      {/* Modal Ambil Foto */}
      <Modal
          animationType="fade"
          transparent={true}
          visible={ModalAmbilFoto}
          onRequestClose={() => {
            setModalAmbilFoto(!ModalAmbilFoto);
          }}
        >
          <View style={{flex: 1, alignItems: "center", justifyContent: 'flex-end', padding: 10, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <View style={{paddingHorizontal:20, paddingVertical:20, marginHorizontal:20, backgroundColor:'white', borderRadius:10, width:'100%', alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>setModalAmbilFoto(!ModalAmbilFoto)} style={{position:'absolute', right:10, top:10}}>
                    <Icon type='font-awesome' name='close' size={16} />
                </TouchableOpacity>
                <Text style={styles.textLargeBold}>Ambil Foto Menggunakan</Text>
                <View style={styles.Devider5}></View>
                <View style={{flexDirection:'row', width:'100%'}}>
                    <TouchableOpacity onPress={()=>AmbilFotoProfile('gallery')} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Icon type='ionicon' name='images' size={50} color='grey' />
                        <Text style={styles.textNormal}>Galeri</Text>
                    </TouchableOpacity>
                    <View style={{width:1, height:'100%', borderWidth:1}}></View>
                    <TouchableOpacity onPress={()=>AmbilFotoProfile('camera')} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Icon type='ionicon' name='camera' size={50} color='grey' />
                        <Text style={styles.textNormal}>Kamera</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </Modal>

      <ScrollView>
        {/* Top Bar */}
        <View style={styles.CardRectangle}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Icon type='ionicon' name='arrow-back' size={20}  color='black' style={{marginRight:20}} />
            </TouchableOpacity>
            <Text style={styles.textLargeBold}>Profile</Text>
            </View>
        </View>
        <View style={styles.Devider5}></View>

        {/* Profile Detail */}
        <View style={styles.CardRectangle}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>setModalAmbilFoto(!ModalAmbilFoto)} style={styles.CardPhotoProfile}>
                    {URIFotoProfileCache ? 
                    <Image source={{uri:URIFotoProfileCache}} style={styles.PhotoProfile} />
                    :
                    <Image source={UserPhotoProfile} style={styles.PhotoProfile} />
                    }
                </TouchableOpacity>
                <View style={{marginLeft:10}}>
                    <Text style={styles.textNormalBold}>{Nama}</Text>
                    <Text style={styles.textNormal}>{Pekerjaan}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Icon type='ionicon' name={IconStar1} size={20} color={ColorStar1} />
                        <Icon type='ionicon' name={IconStar2} size={20} color={ColorStar2} />
                        <Icon type='ionicon' name={IconStar3} size={20} color={ColorStar3} />
                        <Icon type='ionicon' name={IconStar4} size={20} color={ColorStar4} />
                        <Icon type='ionicon' name={IconStar5} size={20} color={ColorStar5} />
                    </View>
                    <View style={styles.Devider5}></View>
                    <TouchableOpacity onPress={()=>Logout()} style={styles.BtnDanger}>
                        <Text style={styles.TextBtnWhite}>Keluar Akun</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.Devider5}></View>

        {/* Form Profile */}
        <View style={styles.CardRectangle}>
            <Text style={styles.textLargeBold}>Form Ubah Profile</Text>
            <Text style={styles.textNormal}>Silahkan melengkapi data Anda, data yang lengkap dapat membantu Anda dalam melakukan transaksi jual beli di dalam aplikasi.</Text>
            <View style={styles.Devider5}></View>
            <View style={styles.UnderlineBoldGreen}></View>
            <View style={styles.Devider5}></View>
            <View style={{marginLeft:5}}>
            <Text style={styles.textNormal}>nama lengkap</Text>
            </View>
            <View style={styles.InputBox}>
                <TextInput 
                    value={Nama}
                    defaultValue={Nama}
                    placeholder='nama lengkap'
                    placeholderTextColor='grey'
                    onChangeText={Nama => setNama(Nama)}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.Devider5}></View>
            <View style={{marginLeft:5}}>
            <Text style={styles.textNormal}>alamat email</Text>
            </View>
            <View style={styles.InputBox}>
                <TextInput 
                    value={Email}
                    defaultValue={Email}
                    placeholder='alamat email'
                    placeholderTextColor='grey'
                    onChangeText={Email => setEmail(Email)}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.Devider5}></View>
            <View style={{marginLeft:5}}>
            <Text style={styles.textNormal}>whatsapp/telp</Text>
            </View>
            <View style={styles.InputBox}>
                <TextInput 
                    value={NoHp}
                    defaultValue={NoHp}
                    placeholder='nomor whatsapp/telp'
                    placeholderTextColor='grey'
                    onChangeText={NoHp => setNoHp(NoHp)}
                    style={styles.textInput}
                    keyboardType='phone-pad'
                />
            </View>
            <View style={styles.Devider5}></View>
            <View style={{marginLeft:5}}>
            <Text style={styles.textNormal}>pekerjaan</Text>
            </View>
            <View style={styles.InputBox}>
                <TextInput 
                    value={Pekerjaan}
                    defaultValue={Pekerjaan}
                    placeholder='pekerjaan'
                    placeholderTextColor='grey'
                    onChangeText={Pekerjaan => setPekerjaan(Pekerjaan)}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.Devider5}></View>
            <View style={{marginLeft:5}}>
            <Text style={styles.textNormal}>pengalaman</Text>
            </View>
            <View style={styles.InputBoxGroup}>
                <TextInput 
                    value={Pengalaman}
                    defaultValue={Pengalaman}
                    placeholder='pengalaman'
                    placeholderTextColor='grey'
                    onChangeText={Pengalaman => setPengalaman(Pengalaman)}
                    style={styles.textInputGroup}
                    keyboardType='number-pad'
                />
                <Text style={styles.textNormal}>tahun</Text>
            </View>
            <View style={styles.Devider5}></View>
            <View style={{marginLeft:5}}>
            <Text style={styles.textNormal}>password</Text>
            </View>
            <View style={styles.InputBoxGroup}>
                <TextInput 
                    value={Password}
                    defaultValue={Password}
                    placeholder='password'
                    placeholderTextColor='grey'
                    onChangeText={Password => CekKekuatanPassword(Password)}
                    style={styles.textInputGroup}
                />
            </View>
            {StatusPassword != 'valid' ?
                <View>
                    {Password != '' ?
                        <Text style={styles.textNormalRed}>{StatusPassword}</Text>
                        :
                        <View></View>
                    }
                </View>
            :
            <View></View>
            }
            {StatusPassword == 'valid'?
            <Text style={styles.textNormalGreen}>Password Anda sudah kuat</Text>
            :
            <View></View>
            }
            <View style={styles.Devider5}></View>
            {Password ? 
                <View>
                    {StatusPassword == 'valid' ?
                        <TouchableOpacity onPress={()=>SimpanProfile()} style={styles.BtnSuccess}>
                            <Text style={styles.TextBtnWhite}>Simpan Profile</Text>
                        </TouchableOpacity>
                        :
                        <View style={styles.BtnSuccessDisable}>
                            <Text style={styles.TextBtnWhite}>Simpan Profile</Text>
                        </View>
                    }
                </View>
                :
                <TouchableOpacity onPress={()=>SimpanProfile()} style={styles.BtnSuccess}>
                    <Text style={styles.TextBtnWhite}>Simpan Profile</Text>
                </TouchableOpacity>
            }
        </View>
        <View style={styles.Devider5}></View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default Profile