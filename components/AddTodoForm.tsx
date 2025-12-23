"use client"

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  return (
    <form className="flex items-center gap-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a todo"
      />
      <Button type="submit" className="cursor-pointer">
        Add
      </Button>
    </form>
  );
};

export default AddTodoForm;
