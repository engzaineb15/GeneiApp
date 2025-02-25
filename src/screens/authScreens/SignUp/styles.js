import { StyleSheet, I18nManager } from 'react-native';
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
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 108,
    height: 108,
    resizeMode: 'contain',
  },
  profileImageRounded: {
    borderRadius: 54,
  },
  addPhotoText: {
    color: '#30449B',
    fontSize: RFValue(13),
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 5,
    textDecorationLine: 'underline',
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
  inputContainerDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ececec',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 0,
  },
  input: {
    flex: 1,
    fontSize: RFValue(14),
    color: '#374957',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  mailIcon: {
    width: 20,
    height: 20,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  countryCode: {
    fontSize: RFValue(14),
    color: '#374957',
    marginLeft: 5,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: RFValue(12),
    marginTop: 5,
  },
  signUpButton: {
    backgroundColor: '#FFC30E',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  signUpText: {
    color: '#000',
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
});

export default styles;
