import { useContext, useState } from "react";
import { TodoListContext } from "../../Context/Context";
import "./TodoItems.css";
import trash_icon from "../Icons/trash_icon.png";
import edit_icon from "../Icons/edit_icon.png";

export default function TodoItems({ filteredList, category }) {
  const { todoList, setTodoList } = useContext(TodoListContext);
  const [editing, setEditing] = useState(null);

  function handleDelete(id) {
    setTodoList(todoList.filter((data) => data.id !== id));
  }

  function handleToggle(id) {
    setTodoList(
      todoList.map((data) => {
        if (data.id === id) {
          return { ...data, completed: !data.completed };
        } else {
          return data;
        }
      })
    );
  }

  function handleChange(e, id) {
    setTodoList(
      todoList.map((data) => {
        if (data.id === id) {
          return { ...data, value: e.target.value };
        } else {
          return data;
        }
      })
    );
    // setEditing(null);
  }

  let emptyDisplay = null;
  if (category === "All") {
    emptyDisplay = "Please enter your todo tasks.";
  } else if (category === "Remaining") {
    emptyDisplay = "No Remaining Tasks";
  } else if (category === "Completed") {
    emptyDisplay = "No Completed Tasks";
  }

  return (
    <ul className="list">
      {filteredList.length === 0
        ? emptyDisplay
        : filteredList.map((todo) => {
            return (
              <li key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    onClick={() => handleToggle(todo.id)}
                    checked={todo.completed === true ? "checked" : ""}
                  />{" "}
                </label>
                <div className="todo-value">
                  <div className="value">
                    {" "}
                    {editing === todo.id && todo.completed === false ? (
                      <form onSubmit={() => setEditing(null)}>
                        <input
                          type="text"
                          defaultValue={todo.value}
                          onChange={(e) => handleChange(e, todo.id)}
                        />
                        <button className="btn">Add</button>
                      </form>
                    ) : (
                      todo.value
                    )}
                  </div>
                  <div className="date">{todo.date}</div>
                </div>

                {/* <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(todo.id)}
                > */}
                <div className="buttons">
                  <div className="btn btn-danger">
                    <img
                      src={trash_icon}
                      alt=""
                      // className="btn btn-danger"
                      onClick={() => handleDelete(todo.id)}
                    />
                  </div>
                  <div className="btn btn-danger">
                    <img
                      src={edit_icon}
                      alt=""
                      // className="btn btn-danger"
                      onClick={() => setEditing(todo.id)}
                    />
                  </div>
                </div>
                {/* </button> */}
              </li>
            );
          })}
    </ul>
  );
}
