import React, { useState } from 'react'
import { View, Image, TextInput, StyleSheet } from 'react-native'
import { images } from '../constants'
import { RFValue } from 'react-native-responsive-fontsize'
import PageTitleHeader from './PageTitleHeader'

const LocationSearchHeader = ({
  showSearchBar = false,
  showImage = true,
  showCurveImage = true, 
  curveImageStyle = {},
  pageTitle = 'Page Title',
  searchPlaceholder = 'Search by items name',
  onSearch,
  setSearchText,
  searchText
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {showCurveImage && (
          <Image
            source={images.reverseUP}
            style={[styles.curveImageRight, curveImageStyle]} 
          />
        )}

        {showImage && <PageTitleHeader pageTitle={pageTitle} />}

        {showSearchBar && (
          <View style={styles.searchContainer}>
            <Image source={images.SearchIcon} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={searchPlaceholder}
            placeholderTextColor="#6D6D6D"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text); // تحديث النص في الحقل
              onSearch(text); // تنفيذ البحث فورًا عند الكتابة
              onSearch && onSearch(text);
            }}
            onSubmitEditing={() => {
              if (searchText.trim() !== '') {
                onSearch(searchText, true); // عند الضغط على زر الإدخال، احفظه في السجل
              }
            }}
          />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#F8F3E3',
    paddingBottom: 5,
  },
  searchContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9FA',
    borderRadius: 12,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#797979',
  },
  curveImageRight: {
    width: 160,
    height: 160,
    position: 'absolute',
    top: -20,
    right: -20,
    contentFit: 'contain',
  },
})

export default LocationSearchHeader
