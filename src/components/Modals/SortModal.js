import { Modal, StyleSheet, Text, TouchableOpacity, View, I18nManager } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
const isRTL = I18nManager.isRTL;

const SortModal = ({
  setShowSortModal,
  showSortModal,
  setSelectedOption,
  selectedOption
}) => {
  const { t } = useTranslation();
  const options = [
    { label: 'Recently added', value: 'recently_added' },
    { label: 'Highest price', value: 'highest_price' },
    { label: 'Lowest price', value: 'lowest_price' },
  ]
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showSortModal}
      onRequestClose={() => setShowSortModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowSortModal(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text style={styles.modalTitle}>{t('Sort by')}</Text>
          </View>

          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.optionContainer}
              onPress={() => {
                setSelectedOption(option.label)
                setShowSortModal(false)
              }}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedOption === option.label &&
                  styles.selectedRadioButton,
                ]}
              >
                {selectedOption === option.label && (
                  <View style={styles.radioInnerCircle} />
                )}
              </View>
              <Text style={styles.optionText}>{t(option.label)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  )
}

export default SortModal

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
    fontSize: 23,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FFCC00',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '800',
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
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderColor: '#FFCC00',
  },
  optionContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})