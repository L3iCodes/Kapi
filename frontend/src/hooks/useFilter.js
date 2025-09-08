import { useCallback, useState, useEffect, useMemo } from "react";

export default function useFilter(productList){
    const [basedFilter, setBasedFilter] = useState(productList)
    const [filteredList, setFilteredList] = useState(productList);
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState('0,20000');
    
    // Update filtered list when productList changes
    useEffect(() => {
        setBasedFilter(productList);
        setFilteredList(productList);
    }, [productList]);
    
    const handleFilter = useCallback((productList, range, categories) => {
        const priceRange = range.split(",").map(Number);

        const filter = categories.length === 0 
            //Handle Price filter
            ? productList.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
            // Handles price and catefory filters
            : productList.filter(product => {
                const matchesCategory =
                    categories.length === 0 ||
                    categories.some(category => category.toLowerCase() === product.category.toLowerCase());

                const matchesPrice =
                    product.price >= priceRange[0] && product.price <= priceRange[1];

                return matchesCategory && matchesPrice;
            });
        return filter;
    }, []);

    const handleSorting = useCallback((list, sortOption) => {
        const sorted = [...list].sort((a, b) => {
            switch (sortOption) {
                case "name-az":
                    return a.name.localeCompare(b.name);
                case "name-za":
                    return b.name.localeCompare(a.name);
                case "price-lh":
                    return a.price - b.price;
                case "price-hl":
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        return sorted;
    }, []);

    const onSearch = useCallback((text) => {
        if (text === '') {
            setFilteredList(basedFilter);
        } else {
            setFilteredList(basedFilter.filter(product => 
                product.name.toLowerCase().includes(text.toLowerCase())
            ));
        };
    }, [basedFilter, filteredList]);

    const onFilter = useCallback((range, categories) => {
        const filtered = handleFilter(productList, range, categories);
        setBasedFilter(filtered);
        setFilteredList(filtered);
    }, [productList, handleFilter]);

    const onSort = useCallback((order) => {
        setBasedFilter(prev => handleSorting(prev, order));
        setFilteredList(prev => handleSorting(prev, order))
    }, [handleSorting]);

    return({  categories, setCategories, priceRange, setPriceRange, basedFilter, filteredList, onFilter, onSort, onSearch})
};