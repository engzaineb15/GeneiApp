import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, LogBox,I18nManager } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { toastConfig } from './src/utils/CustomToast';
import { InitI18n } from './src/Localization/I18n';


LogBox.ignoreAllLogs();

const App = () => {


useEffect(() => {
  InitI18n(); 
}, []);


  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor="transparent" />
          <AppNavigator />
          <Toast />
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    </Provider>
  );
};

export default App;
