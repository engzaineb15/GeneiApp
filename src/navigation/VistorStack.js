import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Image, Text } from 'react-native'

import HomeScreenVistor from '../screens/VisitorScreens/HomeScreenVistor'
import MyOrdersScreenVistor from '../screens/VisitorScreens/MyOrdersScreenVistor'
import FavoritesScreenVistor from '../screens/VisitorScreens/FavoritesScreenVistor'
import MoreScreenVistor from '../screens/VisitorScreens/MoreScreenVistor'
import { useTranslation } from 'react-i18next';

import { images } from '../constants'

const Tab = createBottomTabNavigator()

const VistorStack = () => {
  const {t,i18n} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
                  width: 21,
                  height: 21,
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
        component={HomeScreenVistor}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrdersScreenVistor}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreenVistor}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreenVistor}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default VistorStack
