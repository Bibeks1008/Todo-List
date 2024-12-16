import { createContext, useState } from "react";

export const TodoListContext = createContext(null);

export default function TodoListContextProvider({ children }) {
  const [todoList, setTodoList] = useState([]);

  return (
    <TodoListContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoListContext.Provider>
  );
}
