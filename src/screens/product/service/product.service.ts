import { axiosClient } from "@/api/axios/axios";

export const getProductsByCategory = async (franchiseId: string, categoryId: string) => {
    try {
        const response = await axiosClient.get(
            `/api/clients/menu?franchiseId=${franchiseId}&categoryId=${categoryId}`
        );
        if(response.status === 200) {
            return response.data ;
        }
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return null;
    }
}