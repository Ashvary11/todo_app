import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import { toast } from "react-toastify";

function AddTodo() {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const completedTodos = todos.filter((todo) => todo.completed).length;

  const handleTodo = (e) => {
    e.preventDefault();

    const value = input.trim();

    if (!value) {
      toast.error("Please enter a todo.");
      return;
    }

    dispatch(addTodo(value));
    setInput("");

    toast.success("Todo added");
  };

  return (
    <section>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-teal-400">
            YOUR TASKS
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Todo List
          </h1>

          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Keep your day organized, one task at a time.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <p className="text-xs text-slate-500">Total</p>
            <p className="text-xl font-bold">{todos.length}</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <p className="text-xs text-slate-500">Done</p>
            <p className="text-xl font-bold text-teal-400">
              {completedTodos}
            </p>
          </div>
        </div>
      </div>

      {/* Add Todo */}
      <form
        onSubmit={handleTodo}
        className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-xl sm:p-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done?"
              maxLength={100}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />

            {input && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-xl bg-teal-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
          >
            + Add Task
          </button>
        </div>

        <div className="mt-2 flex justify-between px-1 text-xs text-slate-500">
          <span>Press Enter to add</span>
          <span>{input.length}/100</span>
        </div>
      </form>
    </section>
  );
}

export default AddTodo;