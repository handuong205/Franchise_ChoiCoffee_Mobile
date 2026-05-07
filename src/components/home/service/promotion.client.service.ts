import { axiosClient } from "@/api/axios/axios";

export const getPromotionByFranchiseId = async (franchiseId: string) => {
    try {
        const res = await axiosClient.get(`/api/promotions/franchise/${franchiseId}`);   
        if(res.status === 200){
            return res.data;
        }
    }catch(error){
        console.error('Error fetching promotions:', error);
        throw error;
    }
};

export const getVoucherByFranchiseId = async (franchiseId: string) => {
    try {
        const res = await axiosClient.get(`/api/vouchers/franchise/${franchiseId}`);   
        if(res.status === 200){
            return res.data;
        }
    }catch(error){
        console.error('Error fetching vouchers:', error);
        throw error;
    }
};

