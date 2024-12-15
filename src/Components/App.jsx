import TodoListContextProvider from "../Context/Context";

import "./styles.css";
import TodoList from "./TodoList/TodoList";

export default function App() {
  return (
    <TodoListContextProvider>
      <div className="app">
        <h1 className="heading">TODO LIST</h1>
        <TodoList />
      </div>
    </TodoListContextProvider>
  );
}
