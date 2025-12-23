import { UserForm } from "@/app/types";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
// Login service
export async function loginService(data: UserForm) {
  try {
    const response = await axiosInstance.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message) || "Login failed";
    }
  }
  throw new Error("Unexpected error occurred");
}

// Register service
export async function registerService(data: UserForm) {
  try {
    const response = await axiosInstance.post("/api/auth/register", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message) || "Login failed";
    }
  }
  throw new Error("Unexpected error occurred");
}

// Logout service
export async function logoutService() {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message) || "Logout failed";
    }
  }
  throw new Error("Unexpected error occurred");
}