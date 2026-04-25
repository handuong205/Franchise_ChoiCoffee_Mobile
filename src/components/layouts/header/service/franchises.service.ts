import { axiosClient } from "@/api/axios/axios"

export const getAllPublicFranchsies = async () => {
    try{
        const response = await axiosClient.get(
            `/api/clients/franchises`
        )
        if(response){
            return response.data
        }
    } catch (error) {
        console.error("Error fetching public franchises:", error);
        throw error;
    }
}