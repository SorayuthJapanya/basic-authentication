import { TodoForm, TodoFormUpdate } from "@/app/types";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

// Get todos
export async function getTodosService() {
  try {
    const response = await axiosInstance.get("/api/todo");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message) || "Get todos failed";
    }
    throw new Error("Unexpected error occurred");
  }
}

// Get todo
export async function getTodoService(taskId: string) {
  try {
    const response = await axiosInstance.get(`/api/todo/${taskId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message) || "Get todo failed";
    }
    throw new Error("Unexpected error occurred");
  }
}

// Create todo
export async function createTodoService(data: TodoForm) {
  try {
    const response = await axiosInstance.post("/api/todo", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message) || "Create todo failed";
    }
    throw new Error("Unexpected error occurred");
  }
}

// Update todp
export async function updateTodoService(data: TodoFormUpdate) {
  try {
    const response = await axiosInstance.put("/api/todo", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message) || "Update todo failed";
    }
    throw new Error("Unexpected error occurred");
  }
}

export async function deleteTodoService(taskId: string) {
  try {
    const response = await axiosInstance.delete("/api/todo", {
      data: taskId,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message) || "Create todo failed";
    }
    throw new Error("Unexpected error occurred");
  }
}
