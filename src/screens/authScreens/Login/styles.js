import { StyleSheet, I18nManager, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const isRTL = I18nManager.isRTL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topSection: {
    alignItems: 'center',
    backgroundColor: '#F8F3E3',
    paddingVertical: RFValue(20),
  },
  curveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
  },
  curveImageLeft: {
    width: RFValue(100),
    height: RFValue(130),
  },
  curveImageRight: {
    width: RFValue(100),
    height: RFValue(130),
  },
  logoImage: {
    width: RFValue(165),
    height: RFValue(65),
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: RFValue(20),
  },
  welcomeTitle: {
    color: '#000',
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  welcomeSubtitle: {
    color: '#7D7D7D',
    fontSize: RFValue(15),
    fontWeight: '400',
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  containerTextInput: {
    marginBottom: 15,
  },
  label: {
    fontSize: RFValue(14),
    color: '#374957',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: RFValue(14),
    color: '#374957',
  },
  errorText: {
    color: 'red',
    fontSize: RFValue(12),
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: '#FFC30E',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#000',
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
});

export default styles;
