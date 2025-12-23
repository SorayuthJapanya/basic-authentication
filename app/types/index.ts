export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserForm {
  name?: string;
  email: string;
  password: string;
}

export interface Todo {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoFormUpdate {
  taskId: string
  title?: string;
  status?: string;
}
