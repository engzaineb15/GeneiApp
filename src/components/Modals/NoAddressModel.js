import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, I18nManager } from 'react-native'
import React from 'react'
import { images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
const isRTL = I18nManager.isRTL

const NoAddressModel = ({
    noAvaiblaeAddress, 
    setNoAvaiblaeAddress
}) => {
    const { t } = useTranslation()
    const navigation = useNavigation()
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={noAvaiblaeAddress}
        onRequestClose={() => setNoAvaiblaeAddress(false)}
        >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setNoAvaiblaeAddress(false)}
            >
                <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Image
                source={images.notavailableIcon}
                style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>
                {t('Not available in this area')}
            </Text>
            <Text style={styles.modalDescription}>
                {t('Not available in this area at the moment')}
            </Text>
            <TouchableOpacity 
                onPress={() => {
                    setNoAvaiblaeAddress(false)
                    navigation.navigate('AddNewAddress')
                }}
                style={styles.modalLoginButton}>
                <Text style={styles.modalLoginText}>{t('Add Address')}</Text>
            </TouchableOpacity>
            </View>
        </View>
    </Modal>
  )
}

export default NoAddressModel

const styles = StyleSheet.create({
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
})