import React, { useState,useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Gif, images } from '../../constants'
import FastImage from 'react-native-fast-image'
import { BASE_IMG_URL } from '../../utils/variables'
import FloatingCart from '../FloatingCart/FloatingCart'
import { useSelector } from 'react-redux'
import { selectTotalQuantity } from '../../redux/reducers/cartReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
const CategoryComp = ({ categories, home }) => {
  const navigation = useNavigation()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const quantity = useSelector(selectTotalQuantity)


  // Render item for FlatList
  const renderCategory = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        index % 2 === 1 && { backgroundColor: '#e4e7f2' },
      ]}
      onPress={() => {
        if (item?.name === 'Flash Sale') {
          navigation.navigate('FlashSale', { categoryId: item?.id })
        } else {

          setSelectedCategory(item.id)
          navigation.navigate('SuperMarket', { categoryId: item?.id,pagetitle_ar: item?.name_ar,pagetitle_en: item?.name })
        }
      }}
    >
      {item?.name !== 'Flash Sale' && (
        <Image
          source={images.GLatter}
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            top: 5,
            left: 50,
            contentFit: 'contain',
          }}
        />
      )}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <FastImage
          style={
            item?.name === 'Flash Sale'
              ? { width: 120, height: 90, resizeMode: 'contain' } 
              : { width: 95, height: 60, resizeMode: 'contain' } 
          }
          source={
            item?.name === 'Flash Sale'
              ? Gif.FlashsaleGif
              : { uri: BASE_IMG_URL + item.image }
          }
          resizeMode={FastImage.resizeMode.contain}
        />
        {item?.name !== 'Flash Sale' && (
          <Text style={styles.itemText}>
        { item?.name}
        </Text>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <View
      style={{
        ...styles.container,
        paddingVertical: home ? 0 : 20, // Conditionally set paddingVertical
        paddingHorizontal: home ? 0 : 20,
      }}
    >
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => String(item.id)}
        numColumns={3} 
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />

      {categories.length > 0 && !home && (
        <FloatingCart 
          cartItemsCount={quantity}
          right={true}/>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatListContent: {
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#F1DFD2',
    flex: 1,
    maxWidth: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 5,
  },
  itemText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
})

export default CategoryComp
