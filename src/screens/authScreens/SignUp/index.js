import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { images } from '../../../constants';
import {
  View,
  TextInput,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  I18nManager,
  ScrollView
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PageTitleHeader from '../../../components/PageTitleHeader';
import utils from '../../../utils';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { signUpValidationSchema } from '../../../utils/validation';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { signUp } from '../../../api/auth';
import styles from './styles';
import { globalStyling } from '../../../utils/styling';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signUp } from '../../../api/auth/signup';
const isRTL = I18nManager.isRTL;

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { phoneNumber } = route.params;
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [buttonLoad, setButtonLoad] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    phone: `${phoneNumber}`,
    password: '',
    password_confirmation: '',
    agree: false,
  };


  const formik = useFormik({
    initialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: signUp,
  });

  const handleImagePicker = () => {
    Alert.alert(t('Select Image'), t('Choose an option to pick your profile photo'), [
      { text: t('Cancel'), style: 'cancel' },
      { text: t('Camera'), onPress: () => pickImage('camera') },
      { text: t('Gallery'), onPress: () => pickImage('gallery') },
    ]);
  };

  const pickImage = (source) => {
    const options = { width: 300, height: 300, cropping: true };
    const picker = source === 'camera' ? ImagePicker.openCamera : ImagePicker.openPicker;
    picker(options)
      .then(image => setProfileImage({ uri: image.path, type: image.mime, name: image.path.split('/').pop() }))
      .catch(console.log);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.topSection}>
          <View style={styles.headerContainer}>
            <PageTitleHeader pageTitle={'Sign Up'} />
          </View>

          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image
              source={profileImage ? { uri: profileImage.uri } : images.addpersonalphoto}
              style={[styles.profileImage, profileImage && styles.profileImageRounded]}
            />
            <TouchableOpacity onPress={handleImagePicker}>
              <Text style={styles.addPhotoText}>{t('Add profile photo')}</Text>
            </TouchableOpacity>
          </View>

          {/* Curved Background */}
          <View style={styles.curveContainer}>
            <FastImage source={isRTL ? images.reverseUP : images.SplashScreenCurveUP3} style={styles.curveImageLeft} />
            <FastImage source={isRTL ? images.SplashScreenCurveUP3 : images.reverseUP} style={styles.curveImageRight} />
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name */}
          <View style={styles.containerTextInput}>
            <Text style={styles.label}>{t('username')}</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={t("username")} {...formik.getFieldProps('name')} />
              <Image source={images.person} style={styles.icon} resizeMode="contain" />
            </View>
            {formik.touched.name && formik.errors.name && <Text style={styles.errorText}>{t(formik.errors.name)}</Text>}
          </View>

          {/* Phone */}
          <View style={styles.containerTextInput}>
            <Text style={styles.label}>{t('phone_number')}</Text>
            <View style={styles.inputContainerDisabled}>
              <View style={styles.countryCodeContainer}>
                <Image source={images.egypt} style={globalStyling.flag} />
                <Text style={styles.countryCode}>+20</Text>
              </View>
              <View style={styles.separator} />
              <TextInput style={styles.input} value={formik.values.phone} readOnly />
              <Image source={images.phoneIcon} style={globalStyling.phoneIcon} />
            </View>
          </View>

          {/* Email */}
          <View style={styles.containerTextInput}>
            <Text style={styles.label}>{t('email')}</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={t('enter_your_email')} keyboardType="email-address" {...formik.getFieldProps('email')} />
              <Image source={images.mail} resizeMode="contain" style={styles.mailIcon} />
            </View>
            {formik.touched.email && formik.errors.email && <Text style={styles.errorText}>{t(formik.errors.email)}</Text>}
          </View>

          {/* Password */}
          <View style={styles.containerTextInput}>
            <Text style={styles.label}>{t('Password')}</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={t('enterPassword')} secureTextEntry={!showPassword} {...formik.getFieldProps('password')} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={17} color="#374957" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.signUpButton, { opacity: buttonLoad ? 0.6 : 1 }]}
            onPress={formik.handleSubmit}
            disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
          >
            {buttonLoad ? <ActivityIndicator size="small" color="black" /> : <Text style={styles.signUpText}>{t('Sign up')}</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
