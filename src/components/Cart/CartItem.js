import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, I18nManager } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../constants'
import { BASE_IMG_URL } from '../../utils/variables'
import { useCart } from '../../api/cartService/useCart'
import { useDispatch } from 'react-redux'
import { removeItem, setTotalQuantity, updateItem } from '../../redux/reducers/cartReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next'
const isRTL = I18nManager.isRTL
const CartItem = ({ item, onCartUpdate, updateQuantity, setSubtotal, subtotal }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const { handleRemoveItem } = useCart()
    const [quantityInCart, setQuantityInCart] = useState(item.quantity_in_cart); // Local state for quantity_in_cart
    const [loading, setloading] = useState(false)

    useEffect(() => {


        setQuantityInCart(item.quantity);
    }, [item.quantity, item.quantity]);



    const hadnleRemove = async () => {
        setloading(true)
        console.log(item.quantity);
        try {
            await dispatch(removeItem(item?.cart_item_id))
            dispatch(setTotalQuantity(parseInt(-item.quantity, 10)));
            await handleRemoveItem(item?.item?.cart_item_id)
            const finishedRemovedPrice = subtotal - (item.quantity * (item?.item?.offer_count_in_percentage > 0 ? item.price * (1 - item?.item?.offer_count_in_percentage / 100) : item.price));
            setSubtotal(finishedRemovedPrice)
            await onCartUpdate()
        } catch (error) {
            console.log(error);

        } finally {
            setloading(false)
        }
    }

    return (
        <View style={styles.itemCard}>
            <View style={styles.itemCardChild}>
                <Image
                    source={{ uri: BASE_IMG_URL + item?.item?.default_image }}
                    style={styles.itemImage}
                />
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item?.item?.name}</Text>
                <Text style={styles.itemCategory}>
                    {item?.item?.sub_category_name}
                </Text>
                <Text style={styles.itemSize}>
                    {t('Kilos')}: {item.weight} {item?.item?.status}
                </Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.itemPrice}>
                        {item?.item?.offer_count_in_percentage > 0 ? item.price * (1 - item?.item?.offer_count_in_percentage / 100) : item.price} {t('EGP')}
                    </Text>
                    {item?.item?.offer_count_in_percentage > 0 && (
                        <Text style={styles.oldPrice}>{`${item?.price} ${t('EGP')}`}</Text>
                    )}
                </View>
                <View style={styles.quantityContainerChild}>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            onPress={() => updateQuantity(item.id, -1, item.quantity, item?.item?.offer_count_in_percentage > 0 ? item.price * (1 - item?.item?.offer_count_in_percentage / 100) : item.price)}
                            disabled={loading}
                            style={styles.quantityButton}
                        >
                            <Text>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <TouchableOpacity
                            onPress={() => updateQuantity(item.id, 1, item.quantity, item?.item?.offer_count_in_percentage > 0 ? item.price * (1 - item?.item?.offer_count_in_percentage / 100) : item.price)}
                            disabled={loading}
                            style={styles.quantityButton}
                        >
                            <Text>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={hadnleRemove}
                        disabled={loading}
                        style={styles.removeButton}
                    >
                        <Image
                            source={images.DeletIcon}
                            style={styles.imageView}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    itemCard: {
        marginHorizontal: 15,
        flexDirection: 'row',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#FFFF',
        margin: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    itemCardChild: {
        width: 90,
        height: 90,
        borderRadius: 38,
        backgroundColor: '#FFC30E47',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: '100%',
    },
    itemImage: {
        width: 80, // Set width to the desired value
        height: 80, // Set height to the desired value
        resizeMode: 'cover',
    },
    itemDetails: {
        marginLeft: 10,
        flex: 1,
    },
    oldPrice: {
        fontSize: 10,
        color: '#888',
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    itemCategory: {
        color: 'gray'
    },
    itemSize: {
        marginVertical: 5,
        color: 'gray'
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemPrice: {
        color: '#30449B',
        fontSize: 16
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantityContainerChild: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F3E3',
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16
    },
    imageView: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    }
})