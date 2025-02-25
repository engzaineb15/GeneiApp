import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
  FlatList,
  I18nManager
} from 'react-native'
import PageTitleHeader from '../../components/PageTitleHeader'
import { images } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AddressModal from '../../components/Modals/AddressModal'
import { useDispatch, useSelector } from 'react-redux'
import AddressButton from '../../components/AddressButton/AddressButton'
import CartItem from '../../components/Cart/CartItem'
import { setTotalQuantity } from '../../redux/reducers/cartReducer'
import SuccessModal from '../../components/Modals/SuccessModal'
import NoAddressModel from '../../components/Modals/NoAddressModel'
import { useTranslation } from 'react-i18next'
import NotAvailableModal from '../../components/Modals/NotAvailableModal';
import StoreBusyModal from '../../components/Modals/StoreBusyModal';


const isRTL = I18nManager.isRTL
const CartPage = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [isModalVisible, setModalVisible] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const { addresses, loading, error } = useSelector(state => state.addressList)
  const cartItems = useSelector(state => state.cart.cartItems)
  const dispatch = useDispatch()
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [NewAdressConfiremLoading, setNewAdressConfiremLoading] = useState(false)
  const [noAvaiblaeAddress, setNoAvaiblaeAddress] = useState(false)
  const [NotAvaiblaeModal, SetNotAvaiblaeModal] = useState(false)
  const [StoreBusy, SetStoreBusyModal] = useState(false)
  const [buttonLoadDele, setbuttonLoadDele] = useState(false)
  const [buttonLoad, setButtonLoad] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [copounData, setCopounData] = useState(null);
  const [cartData, setCartData] = useState({
    cart_items: [],
    locations: [],
  })
  const [loading1, setLoading] = useState(true) // state for loading indicator
  const [subtotal, setSubtotal] = useState(0);


  useEffect(() => {
    // console.log('Updated Cart Data:', cartData); // Log the updated cart data
  }, [cartData]);


  const updateQuantity = async (itemId, quantityChange, prevQuantity, price) => {
    try {
      // Find the item by its id and get its current quantity

      // Calculate the new quantity
      const updatedCartItems = cartData.cart_items.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + quantityChange }
          : item
      );

      // Calculate the new quantity
      const newQuantity =
        cartData.cart_items.find(item => item.id === itemId)?.quantity +
        quantityChange;

      if (newQuantity < 1) {
        return; // Prevent negative or zero quantity
      }

      // Send the API request to update the quantity
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`https://api.genie-market.net/api/cart-item/${itemId}/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      // console.log(response.status);

      setCartData(prevState => ({
        ...prevState,
        cart_items: updatedCartItems,
      }));


      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      const data = await response.json();
      dispatch(setTotalQuantity(parseInt(quantityChange, 10)));
      if (quantityChange > 0) {
        const newPrice = subtotal + parseFloat(price);
        setSubtotal(newPrice)
      } else {
        const newPrice = subtotal - parseFloat(price);
        setSubtotal(newPrice);
      }


    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const [fees, setFees] = useState(10);



  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />

        <View style={styles.header1}>
          <PageTitleHeader pageTitle="My Cart" />

          <Image source={images.reverseUP} style={styles.curveImageRight} />
          <View style={{ flexDirection: 'row' }}>
            <AddressButton
              addresses={addresses}
              ModalVisible={setModalVisible} />
            <View />
          </View>

        </View>

        {loading1 ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color="#30449B" />
          </View>
        ) : cartData.cart_items.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Image
              source={images.NoCartProductsAdded}
              style={styles.noDataImage}
            />
            <Text style={styles.noDataText}>{t('No Products Added')}</Text>
            <Text style={styles.noDataSubText}>{t('Shop and add products')}</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={cartData.cart_items}
              renderItem={({ item }) => (
                <CartItem
                  setSubtotal={setSubtotal}
                  subtotal={subtotal}
                  item={item}
                  cartItem={cartItems}
                  updateQuantity={updateQuantity}
                  onCartUpdate={handleCartUpdate}
                />)}
              keyExtractor={(item, index) => item.id}
              showsVerticalScrollIndicator={false} />
            {cartData?.cart_items?.length > 0 ? (
              <>
                <View style={styles.discountSection}>
                  <View style={styles.discountSectionChild}>
                    <Text style={styles.textDiscount}>{t('Discount Code')}  </Text>
                    <View style={styles.discountSectionChild}></View>
                  </View>

                  <View style={styles.containerTextInput}>
                    {!copounData ? <><Text style={styles.label}>{t('Code')}</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={[styles.input, { flex: 1 }]}
                          placeholder={t("Type discount code")}
                          onChangeText={setDiscountCode}
                          value={discountCode}
                        />
                        <TouchableOpacity onPress={applyCopoun} style={styles.checkButton}>
                          <Icon
                            name={'check'}
                            size={30}
                            color="#fff"
                          />
                        </TouchableOpacity>
                      </View></> :
                      <View style={styles.ViewCopon}>
                        <Text style={{ fontWeight: 'bold' }}>{t('Discount')}: {copounData?.coupon?.amount} {copounData?.coupon?.type === t("fixed") ? "%" : t("EGP")}</Text>
                      </View>
                    }
                  </View>
                </View>

                <View style={styles.summaryContainer}>
                  <View style={[styles.summaryRow, styles.rowWithBorder]}>
                    <Text style={styles.summaryText}>{t('Subtotal')}</Text>
                    <Text>{copounData?.cart?.coupon_discount ? copounData?.cart?.coupon_discount : subtotal} {t('EGP')}</Text>
                  </View>
                  <View style={[styles.summaryRow, styles.rowWithBorder]}>
                    <Text style={styles.summaryText}>{t('Delivery Fee')}</Text>
                    <Text>{fees} {t('EGP')}</Text>
                  </View>
                  {copounData?.cart?.coupon_discount && <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>{t('Discount')}</Text>
                    <Text>-{(cartData.total_price - copounData?.cart?.coupon_discount) + fees} {t('EGP')}</Text>
                  </View>}
                </View>
              </>
            ) : null}
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.ViewSchudule}
                onPress={() => navigation.navigate('OrderSchedule', { cartItems: cartData.cart_items, addresses: addresses })}
              >
                <Image
                  source={images.schydleDataIcon}
                  style={{ width: 26, height: 26, resizeMode: 'contain' }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleConfirmOrder(cartData.cart_items[0].cart_id)}
                style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>{t('Confirm order')}</Text>
                <View
                  style={styles.ViewDiscount}
                >
                  <Text style={styles.TextY}>{`${copounData?.cart?.coupon_discount ? copounData?.cart?.coupon_discount + fees : subtotal + fees} ${t('EGP')} `}</Text>
                  <TouchableOpacity
                    onPress={() => handleConfirmOrder(cartData.cart_items[0].cart_id)}
                    style={styles.conButtonview2}>
                    <Image
                      source={images.toArrow}
                      style={{
                        width: 16, height: 16, resizeMode: 'contain',
                        transform: [{ scaleX: isRTL ? -1 : 1 }]
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>


              {/* item not available modal */}

              <NotAvailableModal
                visible={NotAvaiblaeModal}
                onClose={() => SetNotAvaiblaeModal(false)}
                buttonLoadDele={buttonLoadDele}
              />

              {/* The store is buy modal */}


              <StoreBusyModal
                visible={StoreBusy}
                onClose={() => SetStoreBusyModal(false)}
                buttonLoadDele={buttonLoadDele}
              />

            </View>
          </>
        )}
      </View>
      <SuccessModal
        setSuccessModal={setSuccessModal}
        successModal={successModal} />
      <AddressModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        addresses={addresses}
        selectedAddress={selectedAddress}
        NewAdressConfiremLoading={NewAdressConfiremLoading}
        setSelectedAddress={setSelectedAddress}
      />
      <NoAddressModel
        noAvaiblaeAddress={noAvaiblaeAddress}
        setNoAvaiblaeAddress={setNoAvaiblaeAddress} />
    </>
  )
}

export default CartPage
