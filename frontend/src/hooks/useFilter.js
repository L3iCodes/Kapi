import { useCallback, useState, useEffect, useMemo } from "react";

export default function useFilter(productList){
    const [filteredList, setFilteredList] = useState(productList);

    // Update filtered list when productList changes
    useEffect(() => {
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

    const onFilter = useCallback((range, categories) => {
        const filtered = handleFilter(productList, range, categories);
        setFilteredList(filtered);
    }, [productList, handleFilter]);

    const onSort = useCallback((order) => {
        setFilteredList(prev => handleSorting(prev, order));
    }, [handleSorting]);

    return({ filteredList, onFilter, onSort})
};