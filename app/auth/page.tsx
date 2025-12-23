"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin, useRegister } from "@/hooks/useAuth";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { mutate: login, isPending: loginPending } = useLogin();
  const { mutate: register, isPending: registerPending } = useRegister();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    // Handle login logic
    e.preventDefault();
    login(formData);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    // Handle register logic
    e.preventDefault();
    register(formData);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          {isLogin ? "Login to your account" : "Register an account"}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? "Enter your email below to login to your account"
            : "Enter your details below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          <div className="flex flex-col gap-6">
            {isLogin ? null : (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={handleInputChange}
                placeholder="test@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={handleInputChange}
                placeholder="********"
                required
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              {loginPending || registerPending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : isLogin ? (
                "Login"
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        {isLogin ? (
          <p>
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              Sign up
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a
              href="#"
              className="underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              Login
            </a>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
