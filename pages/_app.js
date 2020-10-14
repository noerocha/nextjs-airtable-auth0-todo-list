import "../styles/index.css";
import { TodosProvider } from "../context/TodosContext";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container mx-auto my-10 max-w-xl">
      <TodosProvider>
        <Component {...pageProps} />
      </TodosProvider>
    </div>
  );
}

export default MyApp;
