"use client";

import { loginService, registerService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: registerService,
    onSuccess: (data) => {
      toast.success(data?.message || "User created successfully");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}

export function useLogout() {
  const router = useRouter();

  return useMutation({
    onSuccess: (res) => {
      console.log(res);
      toast.success("Logout successful");
      router.push("/auth");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
}
