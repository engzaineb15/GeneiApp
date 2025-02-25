import { useEffect, useState } from 'react';
import { filterItemsByPriceFunction, sortItemsFunction } from '.';

const useFilterSort = (initialItems) => {
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [noResults, setNoResults] = useState(false);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('Recently added');

  useEffect(() => {
    // Apply price filtering
    let processedItems = filterItemsByPriceFunction(initialItems, priceFrom, priceTo);

    // Apply search filtering
    if (searchText.trim() !== '') {
      processedItems = processedItems.filter(
        (item) =>
          item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          item?.name_ar?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply sorting
    processedItems = sortItemsFunction(processedItems, selectedOption);

    setFilteredItems(processedItems);
    setNoResults(processedItems.length === 0);
  }, [priceFrom, priceTo, searchText, selectedOption, initialItems]);

  return {
    filteredItems,
    noResults,
    priceFrom,
    setPriceFrom,
    priceTo,
    setPriceTo,
    searchText,
    setSearchText,
    selectedOption,
    setSelectedOption,
  };
};

export default useFilterSort;