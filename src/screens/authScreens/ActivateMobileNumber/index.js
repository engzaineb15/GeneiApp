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
  Platform,
  I18nManager
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { phoneValidationSchema } from '../../../utils/validation';
import styles from './styles';
import { globalStyling } from '../../../utils/styling';
import { useTranslation } from 'react-i18next';
import { sendOTP } from '../../../api/auth';

const isRTL = I18nManager.isRTL;

const ActivateMobileNumber = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [buttonLoad, setButtonLoad] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: { phoneNumber: '', agree: false },
    validationSchema: phoneValidationSchema,
    onSubmit: async values => {
      setButtonLoad(true);
      try {
        const response = await sendOTP({ phone: `+20${values.phoneNumber}` });
        setButtonLoad(false);
        navigation.navigate('EnterActivationCode', { phoneNumber: values.phoneNumber });
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
            <Image source={images.arrawLeft} style={[globalStyling.arrawLeft, { transform: [{ scaleX: isRTL ? -1 : 1 }] }]} />
          </TouchableOpacity>
        </View>

        {/* Logo & Background */}
        <FastImage source={images.GenieLogoB} style={styles.logoImage} />
        <View style={styles.curveContainer}>
          <FastImage source={isRTL ? images.reverseUP : images.SplashScreenCurveUP3} style={styles.curveImageLeft} />
          <FastImage source={isRTL ? images.SplashScreenCurveUP3 : images.reverseUP} style={styles.curveImageRight} />
        </View>

        {/* Title & Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{t('Activate Mobile Number')}</Text>
          <Text style={styles.subtitleText}>{t('desccode')}</Text>
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

      {/* Terms & Conditions */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            { backgroundColor: formik.values.agree ? '#FFC30E' : '#FFF' },
          ]}
          onPress={() => formik.setFieldValue('agree', !formik.values.agree)}
        >
          {formik.values.agree && <Text style={styles.checkboxCheck}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.termsText}>{t('I agree to the')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TermsandConditions')}>
          <Text style={styles.termsLink}>{t('termsAndConditions')}</Text>
        </TouchableOpacity>
      </View>
      {formik.touched.agree && formik.errors.agree ? (
        <Text style={styles.errorText}>{t(formik.errors.agree)}</Text>
      ) : null}

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
          <Text style={styles.loginText}>{t('Send code')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ActivateMobileNumber;
