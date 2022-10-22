import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = parseInt((Dimensions.get('window').width).toFixed(0))-45;
const windowHeight = parseInt((Dimensions.get('window').height).toFixed(0))-45;

const SuccessColor = "#3b8132";
const PrimaryColor = "#1065c0";
const WarningColor = "#e47200";
const DangerColor = "#c61a09";

export default StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:10,
        backgroundColor:'white'
    },
    containerCenter:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:20
    },
    Center:{
        alignItems:'center',
        width:'100%',
    },  
    Devider3:{
        marginVertical:3
    },
    Devider5:{
        marginVertical:5
    },
    Devider10:{
        marginVertical:10
    },
    textSmallGreyBold:{
        fontFamily:'Poppins-Bold',
        fontSize:10,
        color:'grey'
    },
    textNormal:{
        fontFamily:'Poppins-Regular',
        fontSize:10,
        color:'black'
    },
    textNormalRed:{
        fontFamily:'Poppins-Regular',
        fontSize:10,
        color:DangerColor
    },
    textNormalGreen:{
        fontFamily:'Poppins-Regular',
        fontSize:10,
        color:SuccessColor
    },
    textNormalBold:{
        fontFamily:'Poppins-Bold',
        fontSize:10,
        color:'black',
    },
    textLarge:{
        fontFamily:'Poppins-Regular',
        fontSize:12,
        color:'black'
    },
    textLargeBold:{
        fontFamily:'Poppins-Bold',
        fontSize:12,
        color:'black',
    },
    B1:{
        fontFamily:'Poppins-Regular',
        fontSize:22,
        color:'black',
    },
    B1Bold:{
        fontFamily:'Poppins-Bold',
        fontSize:22,
        color:'black',
    },
    B2:{
        fontFamily:'Poppins-Regular',
        fontSize:18,
        color:'black',
    },
    B2Bold:{
        fontFamily:'Poppins-Bold',
        fontSize:18,
        color:'black',

    },
    B3:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        color:'black',
    },
    B3Bold:{
        fontFamily:'Poppins-Bold',
        fontSize:14,
        color:'black',
    },
    B3BoldUnderline:{
        fontFamily:'Poppins-Bold',
        fontSize:14,
        color:'black',
        textDecorationLine:'underline'
    },
    B4:{
        fontFamily:'Poppins-Regular',
        fontSize:12,
        color:'black',
    },
    B4Bold:{
        fontFamily:'Poppins-Bold',
        fontSize:12,
        color:'black',
    },
    BtnSuccess:{
        borderRadius:20,
        backgroundColor:SuccessColor,
        paddingVertical:10,
        alignItems:'center',
        width:'100%',
    },
    BtnSuccessDisable:{
        borderRadius:20,
        backgroundColor:'#99ff99',
        paddingVertical:10,
        alignItems:'center',
        width:'100%',
    },
    BtnPrimary:{
        borderRadius:20,
        backgroundColor:PrimaryColor,
        paddingVertical:10,
        alignItems:'center',
        width:'100%',
    },
    BtnWarning:{
        borderRadius:20,
        backgroundColor:WarningColor,
        paddingVertical:10,
        alignItems:'center',
        width:'100%',
    },
    BtnDanger:{
        borderRadius:20,
        backgroundColor:DangerColor,
        paddingVertical:10,
        alignItems:'center',
        width:'100%',
    },
    TextBtnWhite:{
        fontFamily:'Poppins-Bold',
        fontSize:10,
        color:'white',
        fontWeight:'bold'
    },
    TextBtnWhiteLarge:{
        fontFamily:'Poppins-Bold',
        fontSize:12,
        color:'white',
        fontWeight:'bold'
    },
    Card:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'white',
        borderRadius:10,
        paddingHorizontal:20,
        paddingVertical:10,
        width:'100%'
    },
    CardProduk:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'white',
        borderRadius:10,
        paddingVertical:15,
        flex:1,
        marginVertical:5,
        marginHorizontal:5,
        alignItems:'center'
    },
    CardRectangle:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingVertical:10,
        justifyContent:'center'
    },
    CardRectangleRow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingVertical:10,
        flexDirection:'row'
    },
    CardGreen:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'#77C66E',
        borderRadius:10,
        paddingHorizontal:20,
        paddingVertical:10,
        width:'100%'
    },
    CardWhiteFull:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'white',
        paddingVertical:10,
        width:'100%'
    },
    CardGreenFull:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'#77C66E',
        paddingVertical:10,
        width:'100%'
    },
    BtnCircleSuccess:{
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor:SuccessColor,
        alignItems:'center',
        justifyContent:'center'
    },
    InputBox:{
        borderWidth:0.5,
        borderRadius:10,
        paddingHorizontal:10,
        width:'100%'
    },
    InputBoxGroup:{
        borderWidth:0.5,
        borderRadius:10,
        paddingHorizontal:10,
        width:'100%',
        flexDirection:'row',
        alignItems:'center'
    },
    textInput:{
        fontFamily:'Poppins-Regular',
        fontSize:10,
        color:'black',
        marginLeft:5,
        paddingVertical:5
    },
    textInputGroup:{
        fontFamily:'Poppins-Regular',
        fontSize:10,
        color:'black',
        flex:1,
        marginLeft:5,
        paddingVertical:5
    },
    ImageLarge:{
        width:150,
        height:150,
        resizeMode:'contain'
    },
    ImageMedium:{
        width:80,
        height:80,
        resizeMode:'contain'
    },
    UnderlineStrike : {
        borderBottomColor:'black',
        borderBottomWidth:0.5,
    },
    UnderlineBoldGreen : {
        borderBottomColor:SuccessColor,
        borderWidth:2,
        borderRadius: 1,
        borderStyle:'dashed',
        height: 1,
    },
    MenuIcon:{
        borderRadius:30,
        width:60,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ImageMenuIcon:{
        width:35,
        height:35,
        resizeMode:'contain'
    },
    FotoPetani:{
        height:100,
        width:80,
        resizeMode:'contain'
    },
    ImageProduk:{
        width:120,
        height:120,
        resizeMode:'stretch',
        borderRadius:10,
        marginHorizontal:5
    },
    PhotoProfile:{
        width:80,
        height:80,
        borderRadius:80/2,
        resizeMode:'contain',
        borderWidth:0.5
    },
    CardPhotoProfile:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'white',
        width:90,
        height:90,
        borderRadius:90/2,
        resizeMode:'contain',
        alignItems:'center',
        justifyContent:'center'
    },
    TumbnailBertia:{
        flex: 1,
        aspectRatio: 1.5,
        resizeMode:'contain',
        borderRadius:10
    },
    ImageLaporan:{
        width:windowWidth-30,
        height:windowWidth/2,
        resizeMode:'stretch',
        borderRadius:10,
        marginHorizontal:5
    }
})