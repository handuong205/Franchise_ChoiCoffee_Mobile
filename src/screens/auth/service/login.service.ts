import { axiosClient } from "@/api/axios/axios";

export const LoginService = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post("/api/customer-auth", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("An error occurred during login. Please try again later.");
  }
};