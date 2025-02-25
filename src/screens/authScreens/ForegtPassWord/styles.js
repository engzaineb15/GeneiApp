import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    topSection: {
  
      backgroundColor: '#F8F3E3',
      justifyContent: 'center',
    },
    curveImageLeft: {
      width: RFValue(100),
      height: RFValue(130),
      position: 'absolute',
      top: RFValue(-55),
      left: -30,
      contentFit: 'contain',
    },
    curveImageRight: {
      width: RFValue(100),
      height: RFValue(130),
      position: 'absolute',
      top: RFValue(-60),
      right: -30,
      contentFit: 'contain',
    },
    logoImage: {
      width: RFValue(165),
      height: RFValue(65),
      contentFit: 'contain',
      alignSelf: 'center',
      // zIndex: 1,
    },
    titleSection: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: RFValue(20),
    },
    title: {
      color: '#000',
      fontSize: RFValue(18),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      color: '#7D7D7D',
      fontSize: RFValue(15),
      fontWeight: '400',
      textAlign: 'center',
    },
    containerTextInput: {
      paddingHorizontal: 20,
      marginVertical: 10,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#333',
      position: 'absolute',
      top: -10,
      left: 30,
      zIndex: 2,
      backgroundColor: '#FFF',
      paddingHorizontal: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      height: 50,
      paddingHorizontal: 10,
    },
    countryCodeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flag: {
      width: 24,
      height: 16,
      marginRight: 5,
    },
    countryCode: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
    },
    separator: {
      width: 1,
      height: '100%',
      backgroundColor: '#ccc',
      marginHorizontal: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
  
    //
  
    rowContainer: {
      flexDirection: 'row',
      paddingHorizontal: 25,
      alignItems: 'center',
      marginVertical: 5,
      // backgroundColor: "#F0F",
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rememberText: { marginLeft: 8, fontSize: 14, color: '#333' },
    forgotPassword: {
      fontSize: 14,
      color: '#30449B',
      textDecorationLine: 'underline',
    },
    loginButton: {
      backgroundColor: '#FFC30E',
      borderRadius: 30,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginHorizontal: 20,
    },
    loginText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
    orContinueText: {
      textAlign: 'center',
      fontSize: 14,
      color: '#7D7D7D',
      marginVertical: 15,
    },
    iconContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
    socialButton: {
      width: 50,
      height: 50,
      backgroundColor: '#30449B1A',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    //
  
    headerTop: {
      backgroundColor: '#F8F3E3',
      paddingBottom: 5,
    },
    errorText: {
      fontSize: 13,
      color: 'red',
      fontWeight: '600',
    },
  })

export default styles