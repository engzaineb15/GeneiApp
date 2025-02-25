import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  I18nManager
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import silverColor from '../../components/MapComp/MapColor';
import { images } from '../../constants';
import FastImage from 'react-native-fast-image';
import PagesHeader from '../../components/PagesHeader';
import Geolocation from '@react-native-community/geolocation';
import Dropdown from '../../components/DropDown';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCountries, updateLocationByID } from '../../api/address';
import utils from '../../utils';
import { globalStyling } from '../../utils/styling';
import { useTranslation } from 'react-i18next';

const isRTL = I18nManager.isRTL;

const EditAddress = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const [buttonLoad, setButtonLoad] = useState(false);
  const [countries, setCountries] = useState([]);
  const [governorates, setGovernorates] = useState([]);
  const [areas, setAreas] = useState([]);
  const [region, setRegion] = useState({
    latitude: item.lat ? parseFloat(item.lat) : 30.0444,
    longitude: item.long ? parseFloat(item.long) : 31.2357,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [address, setAddress] = useState({
    name: item.address_name,
    phone: item.phone_number,
    country: item.country,
    governorate: item.government,
    area: item.area,
    street: item.street,
    buildingNumber: item.building_number,
    apartmentNumber: item.apartment_number,
  });

  const handleConfirm = async () => {
    setButtonLoad(true);
    try {
      const updatedAddressData = {
        address_name: address.name,
        phone_number: address.phone,
        country: address.country,
        government: address.governorate,
        area: address.area,
        street: address.street,
        building_number: address.buildingNumber,
        apartment_number: address.apartmentNumber,
        lat: region.latitude.toString(),
        long: region.longitude.toString(),
      };

      const response = await updateLocationByID(item.id, updatedAddressData);
      if (response) {
        utils.toastAlert('success', t('addressUpdated'));
        navigation.goBack();
      }
    } catch (error) {
      console.error('Failed to update address:', error);
      utils.toastAlert('error', t('updateAddressError'));
    } finally {
      setButtonLoad(false);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountries(response?.data || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const filteredGovernorate = (id) => {
    const filtered = countries.find(country => country.id === id);
    setGovernorates(filtered?.cities || []);
  };

  const filterArea = (id) => {
    const filtered = governorates.find(governorate => governorate.id === id);
    setAreas(filtered?.states || []);
  };

  return (
    <>
      <View style={styles.header}>
        <PagesHeader showSearchBar={true} pageTitle="editAddress" searchPlaceholder={t('searchlocation')} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Map Section */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            customMapStyle={silverColor}
            showsUserLocation={true}
            followsUserLocation={true}
            onRegionChangeComplete={newRegion => setRegion(newRegion)}
          >
            <Marker
              coordinate={{ latitude: region.latitude, longitude: region.longitude }}
              icon={images.mappinMarkder}
              style={styles.marker}
              draggable
              onDragEnd={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setRegion(prevRegion => ({ ...prevRegion, latitude, longitude }));
              }}
            />
          </MapView>

          <TouchableOpacity
            style={styles.zoomButton}
            onPress={() =>
              Geolocation.getCurrentPosition(
                position => {
                  const { latitude, longitude } = position.coords;
                  setRegion({ latitude, longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 });
                },
                error => console.log(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
              )
            }
          >
            <Image source={images.zoomin} style={styles.zoomIcon} />
          </TouchableOpacity>
        </View>

        {/* Address Form */}
        <View style={styles.containerTextInput}>
          <Text style={styles.label}>{t('addressName')}</Text>
          <TextInput style={styles.input} placeholder={t('myHome')} onChangeText={text => setAddress({ ...address, name: text })} value={address.name} />
        </View>

        <View style={styles.containerTextInput}>
          <Text style={styles.label}>{t('phone_number')}</Text>
          <View style={styles.inputContainer}>
            <View style={styles.countryCodeContainer}>
              <Image source={images.egypt} style={globalStyling.flag} />
              <Text style={styles.countryCode}>+20</Text>
            </View>
            <View style={styles.separator} />
            <TextInput style={styles.input} placeholder="123456789" keyboardType="numeric" maxLength={10} onChangeText={text => setAddress({ ...address, phone: text })} value={address.phone} />
            <Image source={images.phoneIcon} style={globalStyling.phoneIcon} />
          </View>
        </View>

        {/* Country, Governorate, Area Dropdowns */}
        <Dropdown defaultLabel={address.country} data={countries} width="100%" onSelect={item => {
          setAddress({ ...address, country: item.name, governorate: '', area: '' });
          setGovernorates([]);
          setAreas([]);
          filteredGovernorate(item.id);
        }} />

        <View style={styles.dropdownRow}>
          <Dropdown defaultLabel={address.governorate || t('Select Governorate')} data={governorates} width="49%" onSelect={item => {
            setAddress({ ...address, governorate: item.name, area: '' });
            setAreas([]);
            filterArea(item.id);
          }} />
          <Dropdown defaultLabel={address.area || t('Select Area')} data={areas} width="49%" onSelect={item => setAddress({ ...address, area: item.name })} />
        </View>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={[styles.saveButton, buttonLoad && styles.buttonDisabled]} onPress={handleConfirm} disabled={buttonLoad}>
        {buttonLoad ? <ActivityIndicator size="small" color="black" /> : <Text style={styles.saveButtonText}>{t('save')}</Text>}
      </TouchableOpacity>
    </>
  );
};

export default EditAddress;
