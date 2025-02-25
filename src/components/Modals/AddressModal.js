import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { images } from '../../constants'
import { changeLocationStatus } from '../../api/address'
import { fetchLocations } from '../../redux/thunks/addressSlice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
const isRTL = I18nManager.isRTL
const AddressModal = ({
  isModalVisible,
  setModalVisible,
  navigation,
  addresses,
  selectedAddress,
  setSelectedAddress,
}) => {
  const { t } = useTranslation()
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  console.log(selectedAddress);


  const handleConfirmAddress = () => {
    setModalVisible(false)
  }

  const handleChangeAddressStatus = async (id) => {
    if (!id) return
    setloading(true)
    try {
      const response = await changeLocationStatus(id)
      dispatch(fetchLocations())
      setModalVisible(false)
      console.log('Address status changed:', response.data)
    } catch (error) {
      console.error('Failed to change address status:', error)
    }
    finally {
      setloading(false)
    }
  }

  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity
        style={[
          styles.addressItem,
          selectedAddress === item.id && styles.selectedAddress,
        ]}
        onPress={() => setSelectedAddress(item.id)}
      >
        <View style={styles.addressLeft}>
          <Ionicons
            name={
              item.is_default !== 1
                ? 'location-outline' :
                'location-sharp'
            }
            size={20}
            color="#FFD700"
          />
          <View style={styles.addressDetails}>
            <Text style={styles.addressTitle}>
              {item.address_name}
            </Text>
            <Text style={styles.addressDescription}>
              {`${item.apartment_number !== null
                  ? item.apartment_number + ','
                  : ''
                } ${item.street},\n${item.area}, ${item.government
                }, ${item.country}`}
            </Text>
            {item.phone_number && (
              <Text style={styles.addressPhone}>
                {item.phone_number}
              </Text>
            )}
          </View>
        </View>
        {(item.is_default === 1 && selectedAddress === null) || selectedAddress === item.id ? (
          <Ionicons name="radio-button-on" size={20} color="#FFD700" />
        ) :
          (
            <Ionicons
              name="radio-button-off"
              size={20}
              color="#ccc"
            />
          )}
      </TouchableOpacity>
    )
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.NewAdress}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.selectaddress}>
            <Text style={styles.modalTitle}>{t('Select address')}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyAdresses')
                setModalVisible(false)
              }}
              style={styles.iconPlus}>
              <Image source={images.Plus} style={{ width: 12, height: 12 }} />
              <Text
                style={styles.addAdressText}
              >
                {t('addnew')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 10, }} >

            {/* Address List */}
            <FlatList
              data={addresses}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              style={{ maxHeight: 250 }}
            />
            <TouchableOpacity
              style={[styles.addressItem,]}
              onPress={() => {
                navigation.navigate('AddNewAddress')
                setModalVisible(false)
              }}
            >
              <View style={styles.addressLeft}>
                <Image
                  source={images.currentLocation}
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
                <View style={styles.addressDetails}>
                  <Text style={styles.addressTitle}>{t('Current location')}</Text>
                  <Text style={styles.addressDescription}>
                    {t('Choose Your Current Location')}
                  </Text>
                </View>
              </View>

              <Image
                source={images.arrowOpenPage}
                style={styles.arrowOpenPageView}
              />

            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.modalLoginButton,
              { opacity: 1 },
            ]}

            onPress={() => handleChangeAddressStatus(selectedAddress)}
          >

            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.modalLoginText}>{t('Confirm')}</Text>
            )}
            {/* )} */}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default AddressModal

const styles = StyleSheet.create({
  NewAdress: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // alignItems: "center",
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
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalDescription: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
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
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 5,
  },
  addressLeft: {
    flexDirection: 'row',
    // alignItems: "center",
  },
  addressDetails: {
    marginLeft: 10,
  },
  addressTitle: {
    fontWeight: 'bold',
  },
  addressDescription: {
    color: '#555',
  },
  addressPhone: {
    color: '#888',
    fontSize: 12,
  },
  selectaddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  iconPlus: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFC30E',
    alignItems: 'center',
    justifyContent: 'space-round',
    flexDirection: 'row',
  }, addAdressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginLeft: 5,
  }, arrowOpenPageView: {
    width: 15, height: 15, resizeMode: 'contain',
    transform: [{ scaleX: isRTL ? -1 : 1 }]
  }
})
