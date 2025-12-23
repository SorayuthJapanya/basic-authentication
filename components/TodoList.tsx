"use client";

import { Todo } from "@/app/types";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { Dot, Loader2, X } from "lucide-react";
import { useDeleteTodo } from "@/hooks/useTodo";
import { useState } from "react";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const { mutate: deleteTodo } = useDeleteTodo();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteTodo(id, {
      onSettled: () => setDeletingId(null),
    });
  };
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id}>
          <Item className="p-2 hover:bg-accent rounded-md cursor-pointer duration-200">
            <div className="w-full flex items-center justify-between">
              <ItemMedia>
                <Dot className="size-2 rounded-full bg-white"></Dot>
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="ml-3">{todo.title}</ItemTitle>
              </ItemContent>
              <ItemActions onClick={() => handleDelete(todo.id)}>
                {deletingId === todo.id ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <div className="p-1.5 rounded-full hover:bg-gray-700 cursor-pointer duration-200">
                    <X className="size-3" />
                  </div>
                )}
              </ItemActions>
            </div>
          </Item>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
