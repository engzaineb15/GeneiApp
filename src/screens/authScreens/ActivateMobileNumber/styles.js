import { StyleSheet, Platform, I18nManager } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const isRTL = I18nManager.isRTL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topSection: {
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 30 : 10,
  },
  backButton: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  logoImage: {
    width: RFValue(150),
    height: RFValue(50),
    resizeMode: 'contain',
  },
  curveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  curveImageLeft: {
    width: RFValue(160),
    height: RFValue(160),
    contentFit: 'contain',
  },
  curveImageRight: {
    width: RFValue(160),
    height: RFValue(160),
    contentFit: 'contain',
  },
  titleContainer: {
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  titleText: {
    color: '#000',
    fontSize: RFValue(17),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    color: '#7D7D7D',
    fontSize: RFValue(15),
    marginTop: 5,
    fontWeight: '400',
    textAlign: 'center',
  },
  inputSection: {
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#000',
  },
  termsLink: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#FFC30E',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  loginText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'center',
  },
});

export default styles;
