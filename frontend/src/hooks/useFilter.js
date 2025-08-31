export default function useFilter(){
    
    const handleFilter = (productList, range, categories) => {
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
    };

    const handleSorting = (list, sortOption) => {
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
    };

    return({handleFilter, handleSorting})
};