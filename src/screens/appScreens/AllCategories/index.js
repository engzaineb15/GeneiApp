import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
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
import styles from './styles'
import { getCategories } from '../../api/getProducts'
import { useTranslation } from 'react-i18next'
const isRTL = I18nManager.isRTL;
const AllCategories = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const user = useSelector(state => state.UserReducer.user)

  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredCategories, setFilteredCategories] = useState([]) 
  const [noResults, setNoResults] = useState(false) 
  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    getAllCategories()
  }, [])

  const getAllCategories = async () => {


    try {
      setIsLoading(true)
      const response = await getCategories()
      setCategories(response?.data?.categories || [])
      setFilteredCategories(response?.data?.categories || [])
      setNoResults(false) 
      // console.log('response?.data?.categories',response?.data?.categories)
    } catch (error) {
      console.error(
        'Error fetching categories:',
        error.response?.data || error.message
      )
      setCategories([])
      setFilteredCategories([])
      setNoResults(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (text) => {
    setSearchText(text)
    
    if (text.trim() === '') {
      setFilteredCategories(categories)
      setNoResults(false)
    } else {
      const filtered = categories.filter(category =>
       
        category?.name?.toLowerCase().includes(text.toLowerCase()) ||
        category?.name_ar?.toLowerCase().includes(text.toLowerCase()) 
      )
      setFilteredCategories(filtered)
      setNoResults(filtered.length === 0) 
    }
  }
  return (
    <>
      <View style={styles.header}>
        <PagesHeader
          showSearchBar={true}
          pageTitle='allCategories'
          searchPlaceholder={t('Search by category name')}
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
              <Text style={{color: '#000', fontSize: 20,textAlign: 'center'}}>{t('No categories available')}</Text>
            </View>
          ) : (
        
          <CategoryComp categories={filteredCategories} />
          )}
        </>
      )}
    </>
  )
}

export default AllCategories
