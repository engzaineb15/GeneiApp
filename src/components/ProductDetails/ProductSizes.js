import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'


const ProductSizes = ({ unit,sizes = [], defaultSize, onSelectSize, selectedSize }) => {
    const { t } = useTranslation()
    const sortedAvailableSizes = useMemo(() => {
      const combined = defaultSize ? [defaultSize, ...sizes.map(String)] : [...sizes.map(String)]
  
      return [...new Set(combined)]
      .map(Number)
      .sort((a,b) => a-b)
      .map(String)
    }, [sizes, defaultSize])

  
    useEffect(() => {
        // Ensure `selectedSize` remains valid when `sortedAvailableSizes` or `defaultSize` changes
        if (!sortedAvailableSizes.includes(selectedSize)) {
          const fallbackSize = defaultSize || sortedAvailableSizes[0]
          onSelectSize(String(fallbackSize))
        }
      }, [defaultSize, sortedAvailableSizes, selectedSize])
  

    
    return (
      <View style={styles.sizeContainer}>
        <Text style={styles.sizeTitle}>{t('Select size')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.sizeOptions}>
            {sortedAvailableSizes.map((size, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sizeBox,
                  selectedSize === size && styles.selectedSizeBox,
                ]}
                onPress={() => {
                  onSelectSize(size)
                }}
              >
                <Text style={styles.sizeText}>{size} {unit}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }

export default ProductSizes

const styles = StyleSheet.create({
    sizeContainer: {
        marginVertical: 10,
        // paddingHorizontal: 20,
      },
      sizeTitle: {
        fontSize: 17,
        fontWeight: '400',
        color: '#30449B',
        marginBottom: 10,
      },
      sizeOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
      },
      sizeBox: {
        // borderWidth: 1,
        // borderColor: "#ccc",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#FFFBE6',
      },
      selectedSizeBox: {
        // borderColor: "#FFC30E",
        backgroundColor: '#FFC30E',
      },
      sizeText: {
        fontSize: 14,
        color: '#333',
      },
})