import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { addTodo } from "../redux/todoSlice";

const suggestions = [
  "Finish today's work",
  "Complete assignment",
  "Review project",
  "Practice coding",
  "Read for 30 minutes",
  "Go for a walk",
];

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
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-yellow-950 sm:text-6xl">
            My Todo List
          </h1>

          <p className="ml-1 mt-3 text-sm font-medium text-orange-800 sm:text-base">
            Organize your day, one task at a time.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="glass-card rounded-2xl px-4 py-3">
            <p className="text-xs font-medium text-slate-500">Total</p>
            <p className="text-xl font-bold text-yellow-950">{todos.length}</p>
          </div>

          <div className="glass-card rounded-2xl px-4 py-3">
            <p className="text-xs font-medium text-slate-500">Done</p>
            <p className="text-xl font-bold text-orange-800">
              {completedTodos}
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleTodo}
        className="glass-card mb-8 rounded-2xl p-3 shadow-lg sm:p-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done?"
              maxLength={100}
              autoComplete="off"
              list="todo-suggestions"
              className="w-full rounded-xl border border-white/60 bg-white/45 px-4 py-3.5 pr-10 text-sm font-medium text-yellow-950 shadow-sm outline-none transition placeholder:text-yellow-900/50 focus:border-yellow-800/30 focus:bg-white/60 focus:ring-4 focus:ring-yellow-900/10"
            />

            <datalist id="todo-suggestions">
              {suggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>

            {input && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl leading-none text-yellow-800 transition hover:text-yellow-950"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-xl bg-yellow-800 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-yellow-900 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            + Add Task
          </button>
        </div>

        <div className="mt-2 flex justify-between px-1 text-xs text-slate-600">
          <span>Press Enter to add</span>
          <span>{input.length}/100</span>
        </div>
      </form>
    </section>
  );
}

export default AddTodo;
