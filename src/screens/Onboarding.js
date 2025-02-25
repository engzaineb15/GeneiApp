import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
  I18nManager,
} from 'react-native'
const { width, height } = Dimensions.get('window')
import images from '../constants/images'
import { RFValue } from 'react-native-responsive-fontsize'
import { completeOnboarding } from '../redux/actions'
import { modifyIsFirst } from '../redux/reducers/UserReducer'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next'
import LangButton from '../components/LangButton'

const isRTL = I18nManager.isRTL

const COLORS = { primary: '#282534', white: '#fff' }

const defaultSlides = [
  {
    id: '1',
    image: images.basket,
    title: '',
    backgroundColor: '#F8F3E3',
    nextBtnColor: '#FFC30E',
    layout: 'default',
  },
  {
    id: '2',
    image: images.furits,
    title: '',
    backgroundColor: '#FFC30E',
    nextBtnColor: '#FFFFFF',
    layout: 'reverse',
  },
  {
    id: '3',
    image: images.bread,
    title: '',
    backgroundColor: '#30449B',
    nextBtnColor: '#FFC30E',
    layout: 'default',
  },
]

const Slide = ({ item, isLastSlide }) => {
  const {t } = useTranslation()
  const isReverseLayout = item.layout === 'reverse'
  return (
    <View
      style={{
        flexDirection: isReverseLayout ? 'column-reverse' : 'column',
      }}
    >
      <Image
        source={item?.image}
        style={{
          height: 
            item.id === '1' && Platform.OS === 'ios'
            ? RFValue(370) 
            : item.id === '1' 
            ? RFValue(410) 
            : RFValue(395),
          width,
          resizeMode: 'contain',
          left : Platform.OS === 'ios' && item.id === '1'
          ? 10 : 0
        }}
      />
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 20,
          // backgroundColor:"#0f0",
          //
        }}
      >
        <Text
          style={[
            {
              color: isLastSlide ? COLORS.white : '#000',
              fontSize: 30,
              lineHeight: 32,
              fontWeight: 'bold',
            },
          ]}
        >
          {item?.title}
        </Text>
      </View>
    </View>
  )
}


const OnboardingScreen = ({}) => {
  const dispatch = useDispatch()

  const completeOnboarding = () => {
    dispatch(modifyIsFirst(false))
  }

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0)
  const [slides, setSlides] = useState(defaultSlides)
  const formatTitle = text => {
    const words = text.split(' ');
    let result = '';
    words.forEach((word, index) => {
      if (index === 3 || index === 5 || index === 7) {
        result += `${word}\n`; // Add newline without a trailing space
      } else {
        result += `${word} `; // Add word with a space
      }
    });
    return result.trim(); // Remove the trailing space at the end
  };
  // const [infos, setInfos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.10:8000/api/v1/infos');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
  
        const updatedSlides = defaultSlides.map((slide, index) => ({
          ...slide,
          title: data[index]?.title ? formatTitle(data[index].title) : slide.title,
        }));
        setSlides(updatedSlides);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, []);
  const ref = React.useRef()

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width
      ref?.current.scrollToOffset({ offset })
      setCurrentSlideIndex(nextSlideIndex)
    }
  }

  const skip = () => {
    const lastSlideIndex = slides.length - 1
    const offset = lastSlideIndex * width
    ref?.current.scrollToOffset({ offset })
    setCurrentSlideIndex(lastSlideIndex)
  }

  const Footer = () => {
    const currentSlide = slides[currentSlideIndex]
    const isLastSlide = currentSlideIndex === slides.length - 1
    const navigation = useNavigation()
  const {t } = useTranslation()
    
    return (
      <View style={{ justifyContent: 'space-between', paddingHorizontal: 20 }}>
          {isLastSlide ? (
            <View style={{ height: 50, marginBottom : 10 }}>
              <Image source={images.reverseUP} style={[styles.curveImageRight,
                 { transform: [{ scaleX: isRTL ? -1 : 1 }] },
              ]} />

              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    backgroundColor: '#FFC30E',
                    
                  },
                ]}
                onPress={async () => {
                  try {
                    await AsyncStorage.setItem('first', JSON.stringify(1))
                    navigation.replace('Login')
                  } catch (error) {
                    console.error('Onboarding error:', error)
                  }
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                  {t("Let's shop")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                height: 100,
                width: '100%',
                flexDirection: 'column-reverse',
              }}
            >
              <Image source={ images.reverseUP} style={[styles.curveImageRight,{
                 transform: [{ scaleX: isRTL ? -1 : 1 }] ,
              }]} />

              <TouchableOpacity
                // activeOpacity={0.8}
                style={[styles.btn]}
                onPress={skip}
                // onPress={() => {navigation.navigate('Login')}}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#30449B',
                    textDecorationLine: 'underline',
                  }}
                >
                  {t('Skip')}
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={[
                  styles.btn,
                  {
                    backgroundColor: currentSlide.nextBtnColor,
                  },
                ]}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}
                >
                  {t('Next')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    )
  }

  const currentSlide = slides[currentSlideIndex]


  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: currentSlide.backgroundColor }}
    >
      <StatusBar backgroundColor={COLORS.primary} />
      <View
        style={{
          width: '90%',
          marginHorizontal: 20,
          marginTop: RFValue(10),
        }}
      >
       
       <LangButton />


      </View>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => (
          <Slide
            item={item}
            isLastSlide={currentSlideIndex === slides.length - 1}
          />
        )}
      />
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    height: 50,
    borderRadius: RFValue(50),
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  curveImageRight: {
    width: 200,
    height: 200,
    position: 'absolute',
    bottom: 20,
    right: -20,
    contentFit: 'contain',
  },
})

export default OnboardingScreen
