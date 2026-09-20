import "./App.css";

import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import Todos from "./components/Todos";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-slate-800">
        <ToastContainer
          position="top-center"
          autoClose={1600}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />

        <Routes>
          <Route
            path="/"
            element={
              <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
                <AddTodo />
                <Todos />
              </main>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
                <EditTodo />
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;