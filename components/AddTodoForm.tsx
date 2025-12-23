"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCreateTodo } from "@/hooks/useTodo";
import { Loader2 } from "lucide-react";
import { TodoForm } from "@/app/types";

const AddTodoForm = () => {
  const [formData, setFormData] = useState<TodoForm>({
    title: "",
  });
  const { mutateAsync: createTodo, isPending: isCreateTodoPending } =
    useCreateTodo();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodo(formData);
    setFormData({ title: "" });
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ title: e.target.value })}
        placeholder="Add a todo"
        className="text-white"
      />
      <Button type="submit" className="cursor-pointer">
        {isCreateTodoPending ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          "Add"
        )}
      </Button>
    </form>
  );
};

export default AddTodoForm;
