import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform,I18nManager } from 'react-native'
import { images } from '../constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import { globalStyling } from '../utils/styling'
import { useTranslation } from 'react-i18next'
const IsRTL = I18nManager.isRTL
const PageTitleHeader = ({ pageTitle = 'Page Title' }) => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={{ zIndex: 999 }}

       onPress={() => {
       navigation.goBack()}
       }
       >
        <Image source={ images.arrawLeft} style={[globalStyling.arrawLeft,{
          transform: [{scaleX: IsRTL ? -1 : 1}]
        }]} />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>{t(pageTitle)}</Text>
      <View style={styles.placeholder} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 30 : 10,
  },
  backButton: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  pageTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    width: 50,
    height: 50,
  },
})

export default PageTitleHeader
