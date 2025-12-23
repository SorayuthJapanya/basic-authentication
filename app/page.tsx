"use client";

import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useTodos } from "@/hooks/useTodo";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: todos, isLoading: isTodosLoading } = useTodos();
  return (
    <Card className="w-full max-w-sm sm:max-w-md">
      <CardHeader>
        <h1 className="text-2xl sm:text-3xl font-semibold">To-Do-List 📋</h1>
        <CardDescription className="mt-6">
          <AddTodoForm />
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isTodosLoading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <TodoList todos={todos}/>
        )}
      </CardContent>
    </Card>
  );
}
