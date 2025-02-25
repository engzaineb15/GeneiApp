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
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { loginValidationSchema } from '../../../utils/validation';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { globalStyling } from '../../../utils/styling';

const isRTL = I18nManager.isRTL;

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false);

  const formik = useFormik({
    initialValues: { phoneNumber: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: () => {},
  });

  useFocusEffect(
    useCallback(() => {
      formik.resetForm();
    }, [formik.resetForm])
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      {/* Logo & Header */}
      <View style={styles.topSection}>
        <FastImage source={images.GenieLogoB} style={styles.logoImage} />
        <View style={styles.curveContainer}>
          <FastImage source={isRTL ? images.reverseUP : images.SplashScreenCurveUP3} style={styles.curveImageLeft} />
          <FastImage source={isRTL ? images.SplashScreenCurveUP3 : images.reverseUP} style={styles.curveImageRight} />
        </View>
      </View>

      {/* Welcome Text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>{t('login')}</Text>
        <Text style={styles.welcomeSubtitle}>{t('Welcome to Genie App')}</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.formContainer}>
        {/* Phone Number */}
        <View style={styles.containerTextInput}>
          <Text style={styles.label}>{t('phone_number')}</Text>
          <View style={[styles.inputContainer, formik.touched.phoneNumber && formik.errors.phoneNumber ? styles.errorBorder : null]}>
            <View style={styles.countryCodeContainer}>
              <Image source={images.egypt} style={globalStyling.flag} />
              <Text style={styles.countryCode}>+20</Text>
            </View>
            <View style={styles.separator} />
            <TextInput
              style={styles.input}
              placeholder="123456789"
              keyboardType="numeric"
              maxLength={10}
              {...formik.getFieldProps('phoneNumber')}
            />
            <Image source={images.phoneIcon} style={globalStyling.phoneIcon} resizeMode="contain" />
          </View>
          {formik.touched.phoneNumber && formik.errors.phoneNumber && <Text style={styles.errorText}>{t(formik.errors.phoneNumber)}</Text>}
        </View>

        {/* Password */}
        <View style={styles.containerTextInput}>
          <Text style={styles.label}>{t('Password')}</Text>
          <View style={[styles.inputContainer, formik.touched.password && formik.errors.password ? styles.errorBorder : null]}>
            <TextInput
              style={styles.input}
              placeholder={t('enterPassword')}
              secureTextEntry={!showPassword}
              {...formik.getFieldProps('password')}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye' : 'eye-slash'} size={17} color="#374957" />
            </TouchableOpacity>
          </View>
          {formik.touched.password && formik.errors.password && <Text style={styles.errorText}>{t(formik.errors.password)}</Text>}
        </View>
      </View>

      {/* Remember Me & Forgot Password */}
      <View style={styles.rowContainer}>
        <TouchableOpacity style={[styles.checkbox, rememberMe ? styles.checkboxActive : null]} onPress={() => setRememberMe(!rememberMe)}>
          {rememberMe && <Text style={styles.checkboxText}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.rememberText}>{t('Remember me')}</Text>
        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate('ForegtPassWord')}>
          <Text style={styles.forgotPassword}>{t('Forgot password?')}</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, buttonLoad ? styles.buttonDisabled : null, !formik.isValid || formik.isSubmitting || !formik.dirty ? styles.buttonDisabled : null]}
        onPress={formik.handleSubmit}
        disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
      >
        {buttonLoad ? <ActivityIndicator size="small" color="black" /> : <Text style={styles.loginText}>{t('login')}</Text>}
      </TouchableOpacity>

      {/* Signup & Visitor */}
      <View style={styles.signUpContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('ActivateMobileNumber')}>
          <Text style={styles.signUpText}>
            {t("Don't have an account?")} <Text style={styles.signUpLink}>{t('Sign up')}</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('VistorStack')}>
        <Text style={styles.visitorText}>{t('Continue as visitor')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
