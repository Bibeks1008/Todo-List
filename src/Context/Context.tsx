import React, { createContext, useState } from "react";

type TodoListContextProviderProps = {
  children: JSX.Element;
};

export type TodoListType = {
  id: number;
  value: string;
  completed: boolean;
  date: string;
};

type TodoListContextType = {
  todoList: TodoListType[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListType[]>>;
};

export const TodoListContext = createContext<TodoListContextType | null>(null);

export default function TodoListContextProvider({
  children,
}: TodoListContextProviderProps) {
  const [todoList, setTodoList] = useState<TodoListType[]>([]);

  return (
    <TodoListContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoListContext.Provider>
  );
}
