import { StyleSheet, I18nManager } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
const isRTL = I18nManager.isRTL
const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFF', flex: 1 },
  header1: {
    backgroundColor: '#F8F3E3',
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataImage: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  noDataText: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
    marginTop: 15,
    textAlign: 'center',
  },
  noDataSubText: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  homeButton: {
    backgroundColor: '#FFFF',
    width: 130,
    height: 40,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  homeText: { color: '#333' },
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
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
  },
  itemImage: {
    width: 80, // Set width to the desired value
    height: 80, // Set height to the desired value
    resizeMode: 'cover',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDetails: { marginLeft: 10, flex: 1 },
  itemName: { fontWeight: 'bold', fontSize: 16 },
  itemCategory: { color: 'gray' },
  itemSize: { marginVertical: 5, color: 'gray' },
  priceContainer: { flexDirection: 'row', alignItems: 'center' },
  itemPrice: { color: '#30449B', fontSize: 16 },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 5,
  },
  discountBadge: {
    backgroundColor: '#FFC30E',
    color: '#000',
    fontSize: 12,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginLeft: 5,
  },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F3E3',
  },
  conButtonview2: {
    width: 43,
    height: 43,
    borderRadius: 43,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC30E',
  },
  quantity: { marginHorizontal: 10, fontSize: 16 },
  discountSection: { paddingHorizontal: 20, marginTop: 10 },
  discountTitle: { fontWeight: 'bold', fontSize: 16 },
  discountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  discountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  checkButton: {
    backgroundColor: '#FFC30E',
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
  },
  checkIcon: {
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
  },
  summaryContainer: { paddingHorizontal: 20, marginBottom: 20 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: { color: '#000', fontWeight: '700' },
  confirmButton: {
    backgroundColor: '#FFC30E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    margin: 20,
    borderRadius: 5,
  },
  confirmText: { color: '#FFF', fontWeight: 'bold' },
  confirmPrice: { color: '#FFF', fontWeight: 'bold' },
  curveImageRight: {
    width: 160,
    height: 160,
    position: 'absolute',
    // top: -20,
    right: isRTL ? 0 : -10,
    left: isRTL ? -10 : 0,
    contentFit: 'contain',
  },

  //

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
    paddingHorizontal: 10,
    marginTop: 20,
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rowWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderStyle: 'dashed',
  },

  //

  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    //   position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F8F3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityText: {
    fontSize: 20,
    color: '#30449B',
    fontWeight: 'bold',
  },

  quantityNumber: {
    marginHorizontal: 10,
    fontSize: 18,
    // fontWeight: '700',
    color: '#000',
  },

  addToCartButton: {
    // width: 150,
    width: '80%',
    backgroundColor: '#30449B',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
    // paddingHorizontal: 5,
    borderRadius: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },

  addToCartText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '400'
  },
  //

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: -20,
    backgroundColor: '#EDEDED',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22.5,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#000',
  },
  modalIcon: {
    width: 115,
    height: 115,
    marginVertical: 20,
  },
  modalTitle: {
    fontSize: 22,
    color: '#30449B',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  modalDescription: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    // marginVertical: 10,
  },
  modalLoginButton: {
    backgroundColor: '#30449B',
    borderRadius: 30,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  modalLoginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: '#FFC30E',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  },
  loginText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  arrowIcon: {
    width: 17,
    height: 12,
    marginLeft: 5,
    resizeMode: 'contain',
  },
  headerContent: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    width: RFValue(110),
    height: RFValue(35),
    resizeMode: 'contain',
    marginBottom: 20,
  },
  arrowIcon: {
    width: 17,
    height: 12,
    marginLeft: 5,
    resizeMode: 'contain',
  },
  headerContent: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    width: RFValue(110),
    height: RFValue(35),
    resizeMode: 'contain',
    marginBottom: 20,
  },

  discountSectionChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textDiscount:
  {
    fontSize: 20,
    textAlign: 'left',
    color: '#30449B',
  },

  discountSectionChild: {
    width: '70%',
    height: 1,
    backgroundColor: '#ccc',
  },
  ViewCopon: {
    backgroundColor: '#FFC30E',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ViewSchudule: {
    borderColor: '#ccc',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F3E3',
    padding: 5,
  }, ViewDiscount: {
    flexDirection: 'row',
    alignItems: 'center',

  }, TextY: { color: '#FFC30E', fontSize: 17, }
})

export default styles