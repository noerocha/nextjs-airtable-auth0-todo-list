import { createContext, useState } from "react";

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const result = await fetch("/api/getTodos");
      const latestTodos = await result.json();
      setTodos(latestTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (description) => {
    try {
      const result = await fetch("/api/createTodo", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await result.json();
      setTodos((previousTodos) => [newTodo, ...previousTodos]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (updateTodo) => {
    try {
      const result = await fetch("/api/updateTodo", {
        method: "PUT",
        body: JSON.stringify(updateTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTodos((previousTodos) => {
        const existingTodos = [...previousTodos];
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updateTodo.id
        );

        existingTodo.fields = updateTodo.fields;
        return existingTodos;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const result = await fetch("/api/deleteTodo", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTodos((previousTodos) => {
        return previousTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosContext, TodosProvider };
