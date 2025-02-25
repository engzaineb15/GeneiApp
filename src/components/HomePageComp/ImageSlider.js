import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { BASE_IMG_URL } from '../../utils/variables'

const ImageSlider = ({ sliderImages }) => {
  return (
    <View style={styles.sliderContainer}>
      <SwiperFlatList
        autoplay
        autoplayDelay={3}
        autoplayLoop
        showPagination
        paginationActiveColor="#30449B"
        paginationStyleItem={{
          width: 8,
          height: 8,
          marginTop: 40,
        }}
        paginationDefaultColor="#CCCCCC"
        // data={imagesData}
        data={sliderImages}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <Image
              source={{ uri: BASE_IMG_URL + item.img }}
              style={styles.sliderImage}
              resizeMode='cover'
            />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 100,
    paddingHorizontal: 10,
    // marginBottom:-30,
    marginBottom: 30,
  },
  child: {
    width: wp('89%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sliderImage: {
    minWidth: '91%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 30,
  },
})

export default ImageSlider
