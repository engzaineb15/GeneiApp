import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import styles from '../../screens/CartPage/styles';
import { images } from '../../constants';

const NotAvailableModal = ({ visible, onClose, buttonLoadDele }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Image source={images.notavailableIcon} style={styles.modalIcon} />
          <Text style={styles.modalTitle}>Not available in this area</Text>
          <Text style={styles.modalDescription}>Not available in this area at the moment</Text>
          <TouchableOpacity 
            style={[styles.modalLoginButton, { opacity: buttonLoadDele ? 0.6 : 1 }]} 
            disabled={buttonLoadDele}
          >
            {buttonLoadDele ? (
              <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
            ) : (
              <Text style={styles.modalLoginText}>Change area</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NotAvailableModal;
