import { axiosClient } from "@/api/axios/axios";
import { Categories } from "../model/categoryResponse";

export const getCategoriesByFranchise = async (franchiseId: string): Promise<Categories[] > => {
    try{
        const response = await axiosClient.get(
            `/api/clients/franchises/${franchiseId}/categories`
        )
        if(response.status === 200){
            return response.data.data;
        }
        throw new Error("Failed to fetch categories");
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}