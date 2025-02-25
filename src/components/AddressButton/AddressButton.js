import { Image, StyleSheet, Text, TouchableOpacity, View,I18nManager } from 'react-native'
import React from 'react'
import { images } from '../../constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useTranslation } from 'react-i18next'
const isRTL = I18nManager.isRTL
const AddressButton = ({
    addresses = [], 
    ModalVisible,

}) => {
    const { t } = useTranslation()
    const safeAddresses = Array.isArray(addresses) ? addresses : [];
    const hasAddresses = safeAddresses.length > 0;
    const defaultAddress = safeAddresses.find(addr => addr?.is_default === 1);
    const firstAddress = safeAddresses[0]?.address_name;

  return (
      <>
          {!hasAddresses ? (
              <TouchableOpacity
                  onPress={() => ModalVisible(true)}
                  style={styles.addButton}
              >
                  <Image source={images.Plus} style={styles.plusIcon} />
                  <Text style={styles.addButtonText}>
                      {t('Add Address')}
                  </Text>
              </TouchableOpacity>
          ) : (
              <TouchableOpacity
                  onPress={() => ModalVisible(true)}
                  style={styles.titleContainer}
              >
                  <Ionicons name="location-outline" size={20} color="#FFD700" />
                  <Text style={styles.titleText}>
                      {defaultAddress?.address_name || firstAddress || t('Select Address')}
                  </Text>
                  <Icon name="chevron-down" size={10} />
              </TouchableOpacity>
          )}
      </>
  );
};
export default AddressButton

const styles = StyleSheet.create({
    addButton : {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFC30E',
        alignItems: 'center',
        justifyContent: 'space-round',
        flexDirection: 'row',
    },
    addButtonText : {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        textAlign: 'center',
        marginLeft: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        justifyContent: 'space-between',
    },
      titleText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#06161c',
        paddingHorizontal: 5,
    },
    plusIcon: {
        width: 13,
        height: 13,
    },

})