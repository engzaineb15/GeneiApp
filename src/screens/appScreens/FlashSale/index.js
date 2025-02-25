import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
  Platform,
  I18nManager,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PagesHeader from '../../components/PagesHeader';
import PageTitleHeader from '../../components/PageTitleHeader';
import ProductCard from '../../components/HomePageComp/ProductCard';
import FloatingFilter from '../../components/FloatingFilter/FloatingFilter';
import FloatingCart from '../../components/FloatingCart/FloatingCart';
import FloatingFilterModel from '../../components/FloatingFilter/FloatingFilterModel';
import SortModal from '../../components/Modals/SortModal';

import { getOffersItems } from '../../api/home';
import { selectTotalQuantity, setTotalQuantity } from '../../redux/reducers/cartReducer';
import { BASE_IMG_URL } from '../../utils/variables';
import utils, { filterItemsByPriceFunction, sortItemsFunction } from '../../utils';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { images } from '../../constants';

const screenWidth = Dimensions.get('window').width;
const isRTL = I18nManager.isRTL;

const FlashSale = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const quantity = useSelector(selectTotalQuantity);

  const [FlashSaleItem, setFlashSale] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showSortModal, setShowSortModal] = useState(false);
  const [FilterModal, SetFilterModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Recently added');
  const [searchText, setSearchText] = useState('');
  const [PriceFrom, setPriceFrom] = useState('');
  const [PriceTo, setPriceTo] = useState('');
  const [noResults, setNoResults] = useState(false);

  const DisCountDataImages = [images.DiscountPhoto1, images.DiscountPhoto2];

  const fetchSalesItems = async () => {
    try {
      const response = await getOffersItems();
      setFlashSale(response?.data?.items);
      setFilteredItems(response?.data?.items);
      setBrands(response?.data?.brands);
      setNoResults(false);
    } catch (error) {
      console.log('Error fetching sales items:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSalesItems();
    }, [])
  );

  useEffect(() => {
    const sortedItems = sortItemsFunction(filteredItems, selectedOption);
    setFilteredItems(sortedItems);
  }, [selectedOption, filteredItems]);

  useEffect(() => {
    const filtered = filterItemsByPriceFunction(filteredItems, PriceFrom, PriceTo);
    setFilteredItems(filtered);
  }, [PriceFrom, PriceTo]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredItems(FlashSaleItem);
      setNoResults(false);
    } else {
      const filtered = FlashSaleItem.filter(
        (item) => item?.name?.toLowerCase().includes(text.toLowerCase()) || 
                  item?.name_ar?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(filtered);
      setNoResults(filtered.length === 0);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.brandItem} onPress={() => navigation.navigate('BrandDetailsitem', { BrandItemDetails: item })}>
      <Image source={{ uri: BASE_IMG_URL + item.img }} style={styles.brandImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <PageTitleHeader pageTitle="flashSale" />
          <Image source={images.reverseUP} style={styles.curveImageRight} />

          <View style={styles.flashSaleContainer}>
            <Image source={images.FlashSales} style={styles.flashSaleBanner} />
            <View style={styles.flashSaleTextContainer}>
              <Image source={images.FiresFlashSales} style={styles.fireIcon} />
              <Text style={styles.flashSaleText}>{t('50% off Delivery')}</Text>
            </View>
          </View>

          <View style={styles.sliderContainer}>
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              data={DisCountDataImages}
              renderItem={({ item }) => (
                <View style={styles.sliderItem}>
                  <Image source={item} style={styles.sliderImage} />
                </View>
              )}
            />
          </View>

          <View style={styles.searchContainer}>
            <Image source={images.SearchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={t('Search by items name')}
              placeholderTextColor="#6D6D6D"
              value={searchText}
              onChangeText={handleSearch}
            />
            <TouchableOpacity style={styles.sortButton} onPress={() => setShowSortModal(true)}>
              <Text style={styles.sortButtonText}>{t('Sort')}</Text>
              <Image source={images.sorticon} style={styles.sortIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.brandListContainer}>
          <FlatList
            data={brands}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandList}
          />
        </View>

        {noResults ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>{t('Therenoitem')}</Text>
          </View>
        ) : (
          <View style={styles.productsContainer}>
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <ProductCard {...item} />}
              numColumns={2}
              columnWrapperStyle={styles.productRow}
              contentContainerStyle={styles.productList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <FloatingFilter SetFilterModal={SetFilterModal} />
        <FloatingCart cartItemsCount={quantity} />
      </View>

      <FloatingFilterModel SetFilterModal={SetFilterModal} FilterModal={FilterModal} setPriceFrom={setPriceFrom} setPriceTo={setPriceTo} PriceFrom={PriceFrom} PriceTo={PriceTo} />
      <SortModal setShowSortModal={setShowSortModal} showSortModal={showSortModal} setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
    </View>
  );
};

export default FlashSale;
