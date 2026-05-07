import { axiosClient } from "@/api/axios/axios";
import { Product } from "../model/productResponse";

export const getProductByFranchise = async (franchiseId: string, categoryId?: string): Promise<Product[]> => {
    try{
        const response = await axiosClient.get(
            `/api/clients/products?franchiseId=${franchiseId}&categoryId=${categoryId}`
        )
        return response.data.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};