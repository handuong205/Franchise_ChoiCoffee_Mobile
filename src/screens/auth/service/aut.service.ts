import { axiosClient } from "@/api/axios/axios";

export const authService = async () => {
  try {
    const response = await axiosClient.get("/api/customer-auth");

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("An error occurred during get profile. Please try again later.");
  }
};