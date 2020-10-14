import React, { useState, useContext } from "react";
import { TodosContext } from "../context/TodosContext";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useContext(TodosContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (todo.length > 0) {
      console.log("well ?");
      addTodo(todo);
      setTodo("");
    }
  };

  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex flex-col text-sm mb-2">
        <label className="font-bold mb-2 text-gray-800" htmlFor="todo">
          Todo
        </label>
        <input
          className="border border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
          type="text"
          name="todo"
          value={todo}
          id="todo"
          placeholder="ex. Learn About Authentication"
          onChange={(evt) => setTodo(evt.target.value)}
        />
      </div>
      <button
        className="rounded w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
