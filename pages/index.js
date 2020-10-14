import { useEffect, useContext } from "react";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Todo from "../components/Todo";

import { table, minifyRecord } from "./api/utils/airtable";
import { TodosContext } from "../context/TodosContext";
import auth0 from "./api/utils/auth0";
import TodoForm from "../components/TodoForm";

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);
  return (
    <div>
      <Head>
        <title>Authenticated Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar user={user} />
      <main>
        {user && (
          <>
            <h1 className="text-2xl text-center mb-4">My Todos</h1>
            <TodoForm />
            <ul>
              {todos && todos.map((todo) => <Todo todo={todo} key={todo.id} />)}
            </ul>
          </>
        )}

        {!user && (
          <p className="bg-red-200 text-gray-800 text-center font-semibold p-4">
            You should log in to see your TODO's
          </p>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  let todos = [];

  if (session?.user) {
    todos = await table
      .select({ filterByFormula: `userId = '${session.user.sub}'` })
      .firstPage();
  }

  return {
    props: {
      initialTodos: todos.map(minifyRecord),
      user: session?.user || null,
    },
  };
}
