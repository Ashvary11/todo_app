import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { editTodo } from "../redux/todoSlice";

function EditTodo() {
  const { id } = useParams();

  const todos = useSelector((state) => state.todos);
  const selectedTodo = todos.find((todo) => todo.id === id);
  const [updatingTodo, setUpdatingTodo] = useState(selectedTodo?.todo || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!selectedTodo) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="glass-card rounded-2xl p-8 text-center">
          <h1 className="text-xl font-semibold text-yellow-950">
            Todo not found
          </h1>

          <Link
            to="/"
            className="mt-4 inline-block rounded-xl bg-yellow-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-yellow-900"
          >
            Back to Todos
          </Link>
        </div>
      </div>
    );
  }

  const hasChanges = updatingTodo.trim() !== selectedTodo.todo;

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = updatingTodo.trim();

    if (!value) {
      toast.error("Todo cannot be empty");
      return;
    }

    dispatch(
      editTodo({
        id,
        updatedTodo: value,
      }),
    );

    toast.success("Todo updated");
    navigate("/");
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 ml-1 font-medium text-yellow-900/70 transition hover:text-yellow-950 text-3xl"
        >
          ←
        </Link>

        <div className="glass-card rounded-2xl p-5 shadow-xl sm:p-7">
          <div className="mb-6">
            <p className="text-sm font-semibold text-orange-800">EDIT TASK</p>

            <h1 className="mt-1 text-3xl font-bold text-yellow-950">
              Update your todo
            </h1>

            <p className="mt-2 text-sm text-yellow-900/60">
              Make your changes and save when you're ready.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              autoFocus
              value={updatingTodo}
              maxLength={100}
              onChange={(e) => setUpdatingTodo(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-xl border border-white/70 bg-white/45 p-4 text-base leading-7 text-yellow-950 outline-none transition placeholder:text-yellow-900/40 focus:border-yellow-800/30 focus:bg-white/60 focus:ring-4 focus:ring-yellow-900/10"
              placeholder="Enter your todo..."
            />

            <div className="mt-2 text-right text-xs text-yellow-900/60">
              {updatingTodo.length}/100
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                to="/"
                className="rounded-xl border border-white/70 bg-white/30 px-5 py-3 text-center text-sm font-medium text-yellow-900 transition hover:bg-white/50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={!hasChanges}
                className="rounded-xl bg-yellow-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-yellow-900 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
