import { useContext, useState, useEffect, createContext } from "react";
import useProductAPI from "../hooks/useProductAPI";

const ProductContext = createContext();

export function ProductProvider({ children }){
    const [productList, setProductList] = useState(null);
    const {getProductsQuery} = useProductAPI();
    
    useEffect(() => {
        if (getProductsQuery.isSuccess) {
                setProductList(getProductsQuery.data);
            }
    }, [getProductsQuery.isSuccess, getProductsQuery.data]);
 
    const value = {
        productList,
        getProductsQuery
    }

    return(
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
    return useContext(ProductContext)
}