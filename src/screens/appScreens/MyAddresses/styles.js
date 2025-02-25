import { StyleSheet, I18nManager } from 'react-native'
const isRTL = I18nManager.isRTL
const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF', flex: 1 },
  header1: {
    backgroundColor: '#F8F3E3',
    paddingBottom: 5,
    paddingHorizontal: 20,
    // marginTop: 20,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  curveImageRight: {
    width: 160,
    height: 160,
    position: 'absolute',
    // top: -20,
    right: isRTL ? 0 : -20,
    left: isRTL ? -20 : 0,
    contentFit: 'contain',
  },
  itemCard: {
    marginHorizontal: 15,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FFFF',
    margin: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  itemImage: {
    resizeMode: 'cover',
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 5,
  },
  itemCategory: {
    color: 'gray',
    fontSize: 17,
    marginBottom: 5,
  },
  itemSize: {
    color: 'gray',
    fontSize: 17,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    color: '#30449B',
    fontSize: 16,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 5,
  },
  AddnewAddress: {
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: '#FFC30E',
    alignItems: 'center',
    justifyContent: 'space-round',
    flexDirection: 'row',
    marginVertical: 10,
  }, imagePuls: { width: 16, height: 16, resizeMode: 'contain' },
  textNewaddress: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginLeft: 5,
  }, imageNewaddress: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  }, noAdress: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 15,
    textAlign: 'center',
  }, adresstextdisplay: {
    fontSize: RFValue(14),
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    // paddingHorizontal: 40
  }
})

export default styles
