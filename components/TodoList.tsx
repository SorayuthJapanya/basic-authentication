import { Todo } from "@/app/types";
import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { Dot, X } from "lucide-react";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id}>
          <Item>
            <div className="w-full flex items-center justify-between">
              <ItemMedia>
                <Dot className="size-2 rounded-full bg-white"></Dot>
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="ml-3">{todo.title}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <div className="p-1.5 rounded-full hover:bg-gray-400 cursor-pointer duraiton-200">
                  <X className="size-3" />
                </div>
              </ItemActions>
            </div>
          </Item>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
