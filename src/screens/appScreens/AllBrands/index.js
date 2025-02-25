import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  I18nManager
} from 'react-native'
import { images, Gif } from '../../constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import CategoryComp from '../../components/HomePageComp/CategoryComp'
import PagesHeader from '../../components/PagesHeader'
import { useSelector } from 'react-redux'
import axios from 'axios'
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_IMG_URL } from '../../utils/variables'
import styles from './styles'
import { getAllBrandsRequest } from '../../api/getProducts'
import FloatingCart from '../../components/FloatingCart/FloatingCart'
import { selectTotalQuantity } from '../../redux/reducers/cartReducer'
import { useTranslation } from 'react-i18next'
const isRTL = I18nManager.isRTL;
const AllBrands = () => {
  const { t } = useTranslation();
  const navigation = useNavigation()
  const quantity = useSelector(selectTotalQuantity)
  const [Brands, setBrands] = useState([])
  const [filteredBrands, setFilteredBrands] = useState([]) 
  const [searchText, setSearchText] = useState('') 
  const [isLoading, setIsLoading] = useState(true)
  const [noResults, setNoResults] = useState(false) 

  useEffect(() => {
    getAllBrands()
  }, [])

  const getAllBrands = async () => {
    try {
      setIsLoading(true)
      const response = await getAllBrandsRequest()
      setBrands(response?.data?.brands || [])
      setFilteredBrands(response?.data?.brands || []) 
      setNoResults(false)
      // console.log(response?.data)
    } catch (error) {
      console.error(
        'Error fetching Brands:',
        error.response?.data || error.message
      )
      setBrands([])
      setFilteredBrands([]) 
      setNoResults(true) 


    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (text) => {
    setSearchText(text)
    
    if (text.trim() === '') {
      setFilteredBrands(Brands)
      setNoResults(false)
    } else {
      const filtered = Brands.filter((brand) =>
        brand?.name?.toLowerCase().includes(text.toLowerCase()) ||
      brand?.name_ar?.toLowerCase().includes(text.toLowerCase()) 
      )
      setFilteredBrands(filtered)
      setNoResults(filtered.length === 0) 
    }
  }

  return (
    <>
      <View style={styles.header}>
        <PagesHeader
          showSearchBar={true}
          pageTitle="allBrands"
          searchPlaceholder={t('Search by brand name')}
          onSearch={handleSearch}
        />
      </View>

      {isLoading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#30449B" />
        </View>
      ) : (
        <>
        {noResults ? (
            <View style={styles.centeredContainer}>
              <Text  style={{color: '#000', fontSize: 20,textAlign: 'center'}}>{t('Therenoitem')}</Text>
            </View>
          ) : (
          <View
            style={styles.FlatlistView}
          >
            <FlatList
              data={filteredBrands}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listitemTouuchable}
                  onPress={() => {
                    navigation.navigate('BrandDetailsitem', {
                      BrandItemDetails: item,
                    })
                  }}
                >
                  <Image
                    source={{ uri: BASE_IMG_URL + item?.img }}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              )}
              numColumns={4}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'center',
                paddingHorizontal: 10,
                paddingBottom: 20,
              }}
            />
          </View>
          )}
        </>
      )}
      <FloatingCart right={true} cartItemsCount={quantity}/>
    </>
  )
}

export default AllBrands
