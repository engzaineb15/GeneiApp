import React, { useCallback, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { images } from '../../../constants';
import {
  View,
  TextInput,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { phoneValidationForgeSchema } from '../../../utils/validation';
import styles from './styles';
import { globalStyling } from '../../../utils/styling';
import { useTranslation } from 'react-i18next';
import { sendOTPForget } from '../../../api/auth';

const IsRTL = I18nManager.isRTL;

const ForegtPassWord = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [buttonLoad, setButtonLoad] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: { phoneNumber: '' },
    validationSchema: phoneValidationForgeSchema,
    onSubmit: async values => {
      setButtonLoad(true);
      try {
        const response = await sendOTPForget({ phone: `+20${values.phoneNumber}` });
        setButtonLoad(false);
        navigation.navigate('ForegtPassWordConfim', { phoneNumber: `+20${values.phoneNumber}` });
      } catch (error) {
        console.error('Error verifying OTP:', error.response.data.message);
        setButtonLoad(false);
      }
    }
  });

  useFocusEffect(
    useCallback(() => {
      formik.resetForm();
    }, [formik.resetForm])
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Header Section */}
      <View style={styles.topSection}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={images.arrawLeft} style={[globalStyling.arrawLeft, { transform: [{ scaleX: IsRTL ? -1 : 1 }] }]} />
          </TouchableOpacity>
        </View>

        {/* Logo & Background */}
        <FastImage source={images.GenieLogoB} style={styles.logoImage} />
        <View style={styles.curveContainer}>
          <FastImage source={IsRTL ? images.reverseUP : images.SplashScreenCurveUP3} style={styles.curveImageLeft} />
          <FastImage source={IsRTL ? images.SplashScreenCurveUP3 : images.reverseUP} style={styles.curveImageRight} />
        </View>

        {/* Title & Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{t('Forgot password?')}</Text>
          <Text style={styles.subtitleText}>{t('forgetdesc')}</Text>
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.containerTextInput}>
          <Text style={styles.label}>{t('phone_number')}</Text>
          <View style={[
            styles.inputContainer,
            formik.touched.phoneNumber && formik.errors.phoneNumber ? { borderColor: 'red' } : null,
          ]}>
            {/* Country Code */}
            <View style={styles.countryCodeContainer}>
              <Image source={images.egypt} style={globalStyling.flag} />
              <Text style={styles.countryCode}>+20</Text>
            </View>
            <View style={styles.separator} />
            {/* Phone Number Input */}
            <TextInput
              style={styles.input}
              placeholder="123456789"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={formik.handleChange('phoneNumber')}
              onBlur={formik.handleBlur('phoneNumber')}
              value={formik.values.phoneNumber}
            />
            <Image source={images.phoneIcon} style={globalStyling.phoneIcon} />
          </View>
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <Text style={styles.errorText}>{t(formik.errors.phoneNumber)}</Text>
          )}
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.loginButton,
          { opacity: buttonLoad ? 0.6 : 1 },
          !formik.isValid || formik.isSubmitting || !formik.dirty ? styles.loginButtonDisabled : null,
        ]}
        onPress={formik.handleSubmit}
        disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
      >
        {buttonLoad ? (
          <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
        ) : (
          <Text style={styles.loginText}>{t('Next')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ForegtPassWord;
