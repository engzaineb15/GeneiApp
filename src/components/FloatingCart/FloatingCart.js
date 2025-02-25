import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../constants'
import { useSelector } from 'react-redux'

const FloatingCart = ({ cartItemsCount, right }) => {
  const navigation = useNavigation()
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  return (
    <TouchableOpacity
      style={[
        styles.cartIconContainer,
        right ? { position: 'absolute', right: 20, bottom: 30 } : null,
      ]}
      onPress={() => navigation.navigate('CartPage')}
    >
      <Image source={images.cartCarIcon} style={styles.cartIcon} />
      {totalQuantity > 0 ?
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{totalQuantity}</Text>
      </View> : null }
    </TouchableOpacity>
  )
}

export default FloatingCart

const styles = StyleSheet.create({
  cartIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#FFF',
    // position: "absolute",
    // right: 20,
    // bottom: 30,
    transform: [{ translateY: -20 }],
    backgroundColor: '#30449B',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  cartBadge: {
    position: 'absolute',
    top: 1,
    right: 4,
    backgroundColor: '#FFC30E',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
  },
})
