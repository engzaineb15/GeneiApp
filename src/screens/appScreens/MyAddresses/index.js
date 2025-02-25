import React, { useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  FlatList,
  I18nManager
} from 'react-native'
import PageTitleHeader from '../../components/PageTitleHeader'
import { images } from '../../constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import utils from '../../utils'
import { deleteLocationRequest, getAddress } from '../../api/address'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeAddress,
  setError,
} from '../../redux/reducers/addressSlice'
import { fetchLocations } from '../../redux/thunks/addressSlice'
import { useTranslation } from 'react-i18next'
const isRTL = I18nManager.isRTL
const MyAdresses = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { addresses, loading, error } = useSelector(state => state.addressList)
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchLocations());
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const deleteLocation = async id => {
    try {
      const response = await deleteLocationRequest(id)

      if (response.status >= 200 && response.status < 300) {
        dispatch(removeAddress(id))
        // console.log(t('locationDeleted'))
        utils.toastAlert('success', t('locationDeleted'))
      } else {
        utils.toastAlert('error', t('deleteLocationError'))
      }
    } catch (error) {
      dispatch(setError(error.message))
      utils.toastAlert('error', t('deleteLocationError'))
    }
  }

  const renderItem = ({ item }) => {
    // console.log('this is the address item', item);

    return (
      <View style={styles.itemCard}>
        <View style={{}}>
          <Image
            source={images.mappinMarkder}
            style={styles.itemImage}
          />
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.address_name}</Text>
          <Text
            style={styles.itemCategory}
          >{`${item.street},${item.area},${item.government},${item.country}`}</Text>
          <Text style={styles.itemSize}>{`${item.phone_number}`}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => deleteLocation(item.id)}
            style={styles.removeButton}
          >
            <Image
              source={images.DeletIcon}
              style={{
                width: 33,
                height: 33,
                resizeMode: 'contain',
                marginBottom: 15,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => {
              navigation.navigate('EditAddress', { item: item })
            }}
          >
            <Image
              source={images.pincleedit}
              style={{ width: 33, height: 33, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  if (error) return <Error message={error} />

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <View style={styles.header1}>
          <PageTitleHeader pageTitle="myAddresses" />
          <Image source={images.reverseUP} style={styles.curveImageRight} />
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={styles.AddnewAddress}
              onPress={() => {
                navigation.navigate('AddNewAddress')
              }}
            >
              <Image
                source={images.Plus}
                style={styles.imagePuls}
              />
              <Text style={styles.textNewaddress}>
                {t('addNewAddress')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color="#30449B" />
          </View>
        ) : addresses?.length > 0 ? (
          <FlatList
            data={addresses}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 50 }}
          />
        ) : (
          <>
            <View style={styles.centeredContainer}>
              <Image
                source={images.noAdressess}
                style={styles.imageNewaddress}
              />
              <Text
                style={styles.noAdress}
              >
                {t('noAddresses')}
              </Text>
              <Text style={styles.adresstextdisplay}  >
                {t('addAddressToDisplay')}
              </Text>
            </View>
          </>
        )}
      </View>
    </>
  )
}

export default MyAdresses
