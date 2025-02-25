import React, { useState, } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Platform, I18nManager } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { BASE_IMG_URL } from '../../utils/variables'
import { useTranslation } from 'react-i18next'
const isRTL = I18nManager.isRTL;
const ProductCard = (
  {
    toggleFavorite,
    addItemToCart,
    updateQuantity,
    cartItemId,
    countInCart,
    inCart,
    item,
  }) => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false)
  const navigation = useNavigation()



  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('CatrgorieItemDetails', { item })}
    >
      <TouchableOpacity
        onPress={() => toggleFavorite(item.id)}
        style={styles.favoriteIcon}
      >
        <Image
          source={
            item?.is_favorite ? images?.FavoutieIconSelected : images?.FavoutieIcon
          }
          style={styles.heartIcon}
        />
      </TouchableOpacity>

      {item?.offer_count_in_percentage > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{`${item?.offer_count_in_percentage}%`}</Text>
        </View>
      )}

      <Image
        source={{ uri: BASE_IMG_URL + item?.default_image }}
        style={styles.productImage}
      />

      <Text style={styles.productTitle} numberOfLines={1}>{item?.name}</Text>
      <Text style={styles.productCategory}>{item?.sub_category_name}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>{`${item?.offer_count_in_percentage > 0 ? item.price * (1 - item.offer_count_in_percentage / 100) : item?.price} ${t('EGP')}`}</Text>
        {item?.offer_count_in_percentage > 0 && (
          <Text style={styles.oldPrice}>{`${item?.price} ${t('EGP')}`}</Text>
        )}
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#C4C4C4',
          marginVertical: 5,
        }}
      />
      {inCart ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={[styles.circleButton, { marginRight: 10 }]}
            onPress={() => {
              item?.details?.length === 0 ? updateQuantity(cartItemId, -1) : navigation.navigate('CatrgorieItemDetails', { item: item });
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <Text style={[styles.cartText, { textAlign: 'center' }]}>
            {countInCart}
          </Text>

          <TouchableOpacity
            style={[styles.circleButton, { marginLeft: 10 }]}
            onPress={() => item?.details?.length === 0 ? updateQuantity(cartItemId, 1) : navigation.navigate('CatrgorieItemDetails', { item: item })}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <TouchableOpacity
              onPress={() => {
                item?.details?.length === 0
                  ? addItemToCart(item?.id)
                  : navigation.navigate('CatrgorieItemDetails', { item: item });
              }}
              style={styles.cartButton}
            >
              <Image
                source={images.addToCaryIcon}
                style={styles.addToimageView}
              />
              <Text style={styles.cartText}>{t('Add to cart')}</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: Platform.OS === 'ios' ? 175 : 160,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 5,
    zIndex: 1,
  },
  heartIcon: {
    width: 20,
    height: 18,
    // tintColor: "#C4C4C4",
    resizeMode: 'contain',
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15, // Creates the circular shape
    backgroundColor: '#F8F3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#30449B',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    zIndex: 1,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  discountText: {
    fontSize: RFValue(10),
    fontWeight: 'bold',
    color: '#000',
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  productCategory: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  currentPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#30449B',
  },
  oldPrice: {
    fontSize: 10,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  cartButton: {
    // backgroundColor: "#30449B",
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cartText: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  addToimageView: {
    width: 20,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  }
})

export default ProductCard
