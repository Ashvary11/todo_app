import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { editTodo } from "../redux/todoSlice";
import { toast } from "react-toastify";

function EditTodo() {
  const { id } = useParams();

  const todos = useSelector((state) => state.todos);
  const selectedTodo = todos.find((todo) => todo.id === id);

  const [updatingTodo, setUpdatingTodo] = useState(
    selectedTodo?.todo || ""
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!selectedTodo) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">
            Todo not found
          </h1>

          <Link
            to="/"
            className="mt-4 inline-block rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950"
          >
            Back to Todos
          </Link>
        </div>
      </div>
    );
  }

  const hasChanges =
    updatingTodo.trim() !== selectedTodo.todo;

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
      })
    );

    toast.success("Todo updated");

    navigate("/");
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full">
        {/* Back */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
        >
          ← Back to todos
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl sm:p-7">
          <div className="mb-6">
            <p className="text-sm font-medium text-teal-400">
              EDIT TASK
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Update your todo
            </h1>

            <p className="mt-2 text-sm text-slate-500">
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
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              placeholder="Enter your todo..."
            />

            <div className="mt-2 text-right text-xs text-slate-600">
              {updatingTodo.length}/100
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                to="/"
                className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={!hasChanges}
                className="rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
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