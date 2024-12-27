import { useContext, useState } from "react";
import { TodoListContext } from "../../Context/Context";
import "./TodoItems.css";
import trash_icon from "../Icons/trash_icon.png";
import edit_icon from "../Icons/edit_icon.png";
import { TodoListType } from "../../Context/Context";

type TodoItemsProp = {
  filteredList: TodoListType[];
  category: string;
};

export default function TodoItems(props: TodoItemsProp) {
  const { filteredList, category } = props;
  const todoListContext = useContext(TodoListContext);

  if (!todoListContext) {
    throw new Error("Context value must be used within a ContextProvider");
  }

  const { todoList, setTodoList } = todoListContext;
  const [editing, setEditing] = useState<number | null>(null);

  function handleDelete(id: number) {
    setTodoList(todoList.filter((data) => data.id !== id));
  }

  function handleToggle(id: number) {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
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
                    checked={todo.completed === true ? true : false}
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

                {
                  <div className="buttons">
                    <div className="btn btn-danger">
                      <img
                        src={trash_icon}
                        alt=""
                        onClick={() => handleDelete(todo.id)}
                      />
                    </div>
                    <div className="btn btn-danger">
                      <img
                        src={edit_icon}
                        alt=""
                        onClick={() => setEditing(todo.id)}
                      />
                    </div>
                  </div>
                }
              </li>
            );
          })}
    </ul>
  );
}
