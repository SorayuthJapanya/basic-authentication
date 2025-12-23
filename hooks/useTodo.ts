"use client";

import {
  createTodoService,
  deleteTodoService,
  getTodoService,
  getTodosService,
  updateTodoService,
} from "@/services/todo.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Get Todos
export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosService,
  });
}

export function useTodo(taskId: string) {
  return useQuery({
    queryKey: ["todo"],
    queryFn: () => getTodoService(taskId),
    enabled: !!taskId,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodoService,
    onSuccess: (res) => {
      toast.success(res.message || "Todo created successfully");
      queryClient.refetchQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodoService,
    onSuccess: (res) => {
      toast.success(res.message || "Todo updated successfully");
      queryClient.refetchQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodoService,
    onSuccess: (res) => {
      toast.success(res.message || "Todo deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}
