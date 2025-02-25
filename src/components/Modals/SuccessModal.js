import {
    ActivityIndicator,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Pressable,
    I18nManager
  } from 'react-native';
  import React from 'react';
  import { Gif } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
  import { useTranslation } from 'react-i18next';
  const isRTL = I18nManager.isRTL
  
  const SuccessModal = ({ successModal, setSuccessModal }) => {
    const { t } = useTranslation()
    const navigation = useNavigation()
    return (
      <Modal
        animationType="fade"
        transparent
        visible={successModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
  
            {/* Success Content */}
            <View style={styles.content}>
              <FastImage source={Gif.successGif} style={styles.successImage} resizeMode="contain" />
              <Text style={styles.title}>{t('Order Confirmed')}</Text>
              <Text style={styles.description}>
                {t('Order Confirmed desc')}
              </Text>

              <TouchableOpacity 
                onPress={() => {
                    setSuccessModal(false)
                    navigation.navigate('MyOrders')
                }}
                style={styles.ordersButton}>
                <Text style={styles.ordersButtonText}>{t('MyOrders')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  export default SuccessModal;
  
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
    //   paddingVertical: 20,
      paddingHorizontal: 16,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      height : 390
    },
    closeButton: {
      position: 'absolute',
      alignSelf: 'center',
      marginTop: -20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EDEDED',
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    closeButtonText: {
      fontSize: 18,
      color: '#000',
    },
    content: {
      alignItems: 'center',
      marginTop: 30,
    },
    successImage: {
      height: 150,
      width: 150,
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      color: '#30449b',
      marginTop: 10,
    },
    description: {
      fontSize: 16,
      fontWeight: '400',
      color: '#000',
      textAlign: 'center',
      marginTop: 5,
      width: 333,
    },
    ordersButton: {
      backgroundColor: '#30449B',
      borderRadius: 50,
      paddingVertical: 12,
      width: 300,
      marginTop: 15,
      alignItems: 'center',
    },
    ordersButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  