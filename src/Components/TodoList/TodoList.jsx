import { useState, useContext } from "react";
import "./TodoList.css";
import { TodoListContext } from "../../Context/Context";
import TodoItems from "../TodoItems/TodoItems";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const { todoList, setTodoList } = useContext(TodoListContext);

  const [displayAddTask, setDisplayAddTask] = useState(false);
  const [category, setCategory] = useState("All");

  function handleSubmit(event) {
    event.preventDefault();
    if (newTodo != "") {
      setTodoList((prevList) => {
        const updatedList = [
          ...prevList,
          {
            id: Math.random() * 10000,
            value: newTodo,
            completed: false,
            date: new Date().toJSON().slice(0, 10),
          },
        ];
        return updatedList;
      });
      setNewTodo("");
      setDisplayAddTask(false);
    }
  }

  let filteredList = [];
  if (category === "All") {
    filteredList = todoList;
  }

  if (category === "Completed") {
    filteredList = todoList.filter((data) => data.completed === true);
  }

  if (category === "Remaining") {
    filteredList = todoList.filter((data) => data.completed === false);
  }

  return (
    <div className="todo-list">
      <div className="btns">
        <div className="add-task">
          <button
            type="button"
            onClick={() => setDisplayAddTask((prev) => !prev)}
          >
            Add Task
          </button>
        </div>

        <div className="dropdown">
          <button className="dropbtn">{category}</button>
          <div className="dropdown-content">
            <button onClick={() => setCategory("All")}>All</button>
            <button onClick={() => setCategory("Completed")}>Completed</button>
            <button onClick={() => setCategory("Remaining")}>Remaining</button>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className={displayAddTask ? "new-item-form" : "new-item-form collapse"}
      >
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            onChange={(event) => setNewTodo(event.target.value)}
            value={newTodo}
          ></input>
        </div>
        <button className="btn">Add</button>
      </form>
      <div>
        <TodoItems filteredList={filteredList} category={category} />
      </div>
    </div>
  );
}
