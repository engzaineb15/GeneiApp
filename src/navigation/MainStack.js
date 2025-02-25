import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Image, Text } from 'react-native'
import Home from '../screens/Home'
import { images } from '../constants'
import MoreScreen from '../screens/MoreScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import MyOrdersScreen from '../screens/MyOrdersScreen'
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator()

const MainStack = () => {
  const {t,i18n} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown : false,
        tabBarIcon: ({ color, focused }) => {
          let imageSource

          if (route.name === 'Home') {
            imageSource = images.homeIcon
          } else if (route.name === 'MyOrders') {
            imageSource = images.MyOrdersIcon
          } else if (route.name === 'Favorites') {
            imageSource = images.FavoutieIcon
          } else if (route.name === 'More') {
            imageSource = images.MoreIcon
          }

          return (
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: 7,
                  height: 13,
                  backgroundColor: focused ? '#FFC30E' : '#EDEDED',
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              />

              <Image
                source={imageSource}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: color,
                  marginTop: 10,
                }}
                resizeMode='contain'
              />
            </View>
          )
        },
        tabBarLabel: ({ color, focused }) => {
          return (
            <Text
              style={{
                color: color,
                fontSize: 14,
                fontWeight: 'normal',
              }}
            >
              {t(route.name)}
            </Text>
          )
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarStyle: {
          height: 80,
          paddingBottom: 15,
          borderTopEndRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
        },

        tabBarActiveTintColor: '#3A3A8D',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrdersScreen}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
      />
    </Tab.Navigator>
  )
}

export default MainStack
