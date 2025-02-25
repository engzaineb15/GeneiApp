import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import styles from '../../screens/CartPage/styles';
import { images } from '../../constants';

const StoreBusyModal = ({ visible, onClose, buttonLoadDele }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Image source={images.notavailableIcon} style={styles.modalIcon} />
          <Text style={styles.modalTitle}>The store is busy now.</Text>
          <Text style={styles.modalDescription}>You can just schedule the order.</Text>
          <TouchableOpacity 
            style={[styles.modalLoginButton, { opacity: buttonLoadDele ? 0.6 : 1 }]} 
            disabled={buttonLoadDele}
          >
            {buttonLoadDele ? (
              <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
            ) : (
              <Text style={styles.modalLoginText}>Order Schedule</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default StoreBusyModal;
