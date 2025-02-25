import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/authScreens/Login'
import MainStack from './MainStack'
import VistorStack from './VistorStack'
import SplashScreen from '../../SplashScreen'
import Onboarding from '../screens/Onboarding'
import VisitorCatrgorieItemDetails from '../screens/VisitorScreens/VisitorCatrgorieItemDetails'
import VisitorContactUs from '../screens/VisitorScreens/VisitorContactUs'
import AddNewAddress from '../screens/AddNewAdress'
import Search from '../screens/Search'
import AllCategories from '../screens/AllCategories'
import Offers from '../screens/Offers'
import AllBrands from '../screens/AllBrands'
import SuperMarket from '../screens/SuperMarket'
import RecentlyAdded from '../screens/RecentlyAdded'
import MostBuyed from '../screens/MostBuyed'
import CatrgorieItemDetails from '../screens/CatrgorieItemDetails'
import CartPage from '../screens/CartPage'
import OrderSchedule from '../screens/OrderSchedule'
import MyAdresses from '../screens/MyAddresses'
import EditProfile from '../screens/Editprofile'
import OrderDetails from '../screens/OrderDetails'
import EditAddress from '../screens/EditAddress'
import BrandDetailsitem from '../screens/BrandDetailsitem'
import Notifications from '../screens/Notifications'
import PayOrder from '../screens/PayOrder'
import MyOrdersScreen from '../screens/MyOrdersScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import ContactUs from '../screens/ContactUs'
import FAQ from '../screens/FAQ'
import FAQDetails from '../screens/FAQDetails'
import TermsandConditions from '../screens/TermsandConditions'
import ActivateMobileNumber from '../screens/authScreens/ActivateMobileNumber'
import EnterActivationCode from '../screens/authScreens/EnterActivationCode'
import SignUp from '../screens/authScreens/SignUp'
import FlashSale from '../screens/FlashSale'
import ForegtPassWordConfim from '../screens/authScreens/ForegtPassWordConfim'
import ForegtPassWord from '../screens/authScreens/ForegtPassWord'
import NewPassword from '../screens/authScreens/NewPassword'

const Stack = createStackNavigator()

const AllStackScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen
        name="EnterActivationCode"
        component={EnterActivationCode}
      />
      <Stack.Screen
        name="ActivateMobileNumber"
        component={ActivateMobileNumber}
      />

      <Stack.Screen name="MainStack" component={MainStack} />
      <Stack.Screen name="CatrgorieItemDetails" component={CatrgorieItemDetails} />
      <Stack.Screen name="CartPage" component={CartPage} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="FAQDetails" component={FAQDetails} />
      <Stack.Screen name="TermsandConditions" component={TermsandConditions} />
      <Stack.Screen name="Editprofile" component={EditProfile} />
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="OrderSchedule" component={OrderSchedule} />
      <Stack.Screen name="PayOrder" component={PayOrder} />
      <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen} />
      <Stack.Screen name="MostBuyed" component={MostBuyed} />
      <Stack.Screen name="AllCategories" component={AllCategories} />
      <Stack.Screen name="Offers" component={Offers} />
      <Stack.Screen name="AllBrands" component={AllBrands} />

      <Stack.Screen name="MyAdresses" component={MyAdresses} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="SuperMarket" component={SuperMarket} />
      <Stack.Screen name="RecentlyAdded" component={RecentlyAdded} />
      <Stack.Screen name="BrandDetailsitem" component={BrandDetailsitem} />
      <Stack.Screen name="SearchScreen" component={Search} />
      <Stack.Screen name="FlashSale" component={FlashSale} />

      <Stack.Screen name="ForegtPassWordConfim" component={ForegtPassWordConfim} />
      <Stack.Screen name="ForegtPassWord" component={ForegtPassWord} />

      <Stack.Screen name="NewPassword" component={NewPassword} />




      <Stack.Screen
        name="VistorStack"
        component={VistorStack}
      />
      <Stack.Screen
        name="VisitorCatrgorieItemDetails"
        component={VisitorCatrgorieItemDetails}
      />
      <Stack.Screen
        name="VisitorContactUs"
        component={VisitorContactUs}
      />
    </Stack.Navigator>
  )
}

export default AllStackScreens
