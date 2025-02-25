import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import Toast from 'react-native-toast-message'

async function get(key, defaultValue = null) {
  try {
    let value = await AsyncStorage.getItem(key)

    if (key != 'first') {
      if (value !== null) {
        value = JSON.parse(value)
      }
    }
    return value
  } catch (error) {
    console.log("couldn't save data: " + key, error)
  }
}

async function set(key, value) {
  try {
    if (key == 'first') {
      return await AsyncStorage.setItem(key, value)
    } else {
      return await AsyncStorage.setItem(key, JSON.stringify(value))
    }
  } catch (error) {
    console.log("couldn't save data: " + key, error)
  }
}
async function clear() {
  try {
    return await AsyncStorage.clear(() => {
      console.log('cleared')
    })
  } catch (error) {
    console.log("couldn't save data: " + key, error)
  }
}

function toastAlert(type = 'success', text1, text2) {
  Toast.show({ type, text1, text2 })
}

export default {
  get,
  set,
  clear,
  toastAlert,
}

export function addToCartToastAlert(type = 'success', text1, text2, navigation) {
  Toast.show({
    type,
    text1,
    text2,
    props: {
      onPress: () => {
        console.log('Navigation object:', navigation); // Debug log
        if (navigation) {
          navigation.navigate('CartPage');
        } else {
          console.error('Navigation object is undefined');
        }
      },
      showButton: true,
    },
    visibilityTime: 3000, // Show for 3 seconds
  });
}

export function convertToCairoTime(utcDateStr) {
  // Parse the UTC date string into a Date object
  const date = new Date(utcDateStr);

  // Convert UTC time to Cairo time by adding 2 hours (UTC+2)
  date.setUTCHours(date.getUTCHours() + 2);

  // Extract date components
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getUTCFullYear();

  // Extract and format hours and minutes
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
  // Convert to 12-hour format and determine AM/PM
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

  // Format and return the final string
  return `${day}/${month}/${year} - ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

export const sortItemsFunction = (items, sortBy) => {
  switch (sortBy) {
    case 'Recently added':
      // Sort by created_at in descending order (newest first)
      return [...items].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    case 'Highest price':
      // Sort by price in descending order (highest first)
      return [...items].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

    case 'Lowest price':
      // Sort by price in ascending order (lowest first)
      return [...items].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    default:
      // Default: return the original items
      return items;
  }
};

export const filterItemsByPriceFunction = (items, priceFrom, priceTo) => {
  console.log('Filtering items with PriceFrom:', priceFrom, 'PriceTo:', priceTo);
  return items.filter(item => {
    const price = parseFloat(item.price);
    
    if (isNaN(price)) return false

    const parsedPriceFrom = parseFloat(priceFrom);
    const parsedPriceTo = parseFloat(priceTo);

    // Check if price is within the range
    const isAboveMin = !isNaN(parsedPriceFrom) ? price >= parsedPriceFrom : true;
    const isBelowMax = !isNaN(parsedPriceTo) ? price <= parsedPriceTo : true;
    console.log('current price', price, parsedPriceFrom, parsedPriceTo, isAboveMin, isBelowMax);

    return isAboveMin && isBelowMax
  });
};

export const useBackHandler = (onBackPress) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (onBackPress) {
          return onBackPress();
        }
        return false; // Default behavior (exit the app)
      }
    );

    return () => backHandler.remove(); // Cleanup the event listener
  }, [onBackPress]);
};
