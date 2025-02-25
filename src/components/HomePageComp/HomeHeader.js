import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  I18nManager,
  StyleSheet,
   I18nManager,
    Platform 
} from 'react-native';
import { images } from '../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import ImageSlider from './ImageSlider';
import { useNavigation } from '@react-navigation/native';
import AddressButton from '../AddressButton/AddressButton';
import { useTranslation } from 'react-i18next';


const isRTL = I18nManager.isRTL;

const HomeHeader = ({ sliderImages, userData, ModalVisible, addresses, loading }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    // Logging user data for debugging
    console.log("User Data:", userData);
  }, [userData]);

  return (
    <View style={styles.header}>
      {/*  Top navigation bar */}
      <View style={styles.topBar}>
        <Image source={images.GenieLogoB} style={styles.logo} />
        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('Notifications')}>
          <Image source={images.Notify} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      {/*  Background curve */}
      <Image source={images.reverseUP} style={styles.curveImageRight} />

      {/*  Greeting and address selection */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          {t('Hey')}
          <Text style={styles.greetingName}> {userData?.name} 👋</Text>
        </Text>
        {loading ? <ActivityIndicator size={16} /> :
          <AddressButton addresses={addresses} ModalVisible={ModalVisible} />}
      </View>

      {/*  Search box */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.touchableSearch} onPress={() => navigation.navigate('SearchScreen')}>
          <Image source={images.SearchIcon} style={styles.searchIcon} />
          <Text style={styles.searchText}>{t('Searchitems')}</Text>
        </TouchableOpacity>
      </View>

      {/*  Image slider */}
      <View style={styles.imageSliderContainer}>
        <ImageSlider sliderImages={sliderImages} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#F8F3E3',
  },
  topBar: {
    marginTop: Platform.OS === 'android' ? 45 : 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    width: RFValue(110),
    height: RFValue(35),
    resizeMode: 'contain',
  },
  notificationButton: {
    zIndex: 999,
  },
  notificationIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  curveImageRight: {
    width: RFValue(160),
    height: RFValue(160),
    position: 'absolute',
    top: RFValue(40),
    right: isRTL ? 0 : -10,
    left: isRTL ? -10 : 0,
    contentFit: 'contain',
  },
  greetingContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 18,
    color: '#000',
  },
  greetingName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFF',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  touchableSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  searchText: {
    color: '#6D6D6D',
    fontSize: 16,
  },
  imageSliderContainer: {
    marginBottom: -50,
  },
});

export default HomeHeader;

