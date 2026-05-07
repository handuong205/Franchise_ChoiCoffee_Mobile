import { axiosClient } from "@/api/axios/axios"

export const logoutService = async () => {
    try{
        await axiosClient.post(
            `/api/customer-auth/logout`
        )
    }catch(error){
        console.error('Logout failed:', error);
        throw error;
    }
}