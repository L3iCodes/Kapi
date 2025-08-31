import { useQuery } from "@tanstack/react-query";
import { get_products_api } from "../api/product.api";

export default function useProductAPI(){

    const getProductsQuery = useQuery({
        queryKey: ['products'],
        queryFn: get_products_api
    });

    return({ getProductsQuery });
};

