import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { checkingcheckBox, removeTodo, reorderTodos } from "../redux/todoSlice";

import { toast } from "react-toastify";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTodos = Array.from(todos);

    const [movedTodo] = reorderedTodos.splice(result.source.index, 1);

    reorderedTodos.splice(result.destination.index, 0, movedTodo);

    dispatch(reorderTodos(reorderedTodos));
  };

  const handleRemove = (todo) => {
    dispatch(removeTodo(todo.id));

    toast.warn("Todo removed");
  };

  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl">
          ✓
        </div>

        <h2 className="text-lg font-semibold text-slate-200">No tasks yet</h2>

        <p className="mt-2 text-sm text-slate-500">
          Add your first task above and get started.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-300">All Tasks</h2>

        <span className="text-xs text-slate-500">Drag to reorder</span>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`group rounded-2xl border bg-slate-900 p-4 transition sm:p-5 ${
                        snapshot.isDragging
                          ? "border-teal-500 shadow-2xl shadow-teal-500/10"
                          : "border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Number */}
                        <div className="hidden w-7 pt-1 text-center text-xs font-medium text-slate-600 sm:block">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Checkbox */}
                        <button
                          type="button"
                          onClick={() => dispatch(checkingcheckBox(todo.id))}
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                            todo.completed
                              ? "border-teal-500 bg-teal-500 text-slate-950"
                              : "border-slate-600 hover:border-teal-400"
                          }`}
                        >
                          {todo.completed && (
                            <span className="text-xs font-bold">✓</span>
                          )}
                        </button>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <p
                            className={`break-words text-sm leading-6 transition sm:text-base ${
                              todo.completed
                                ? "text-slate-500 line-through"
                                : "text-slate-200"
                            }`}
                          >
                            {todo.todo}
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            {todo.completed ? "Completed" : "Pending"}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex shrink-0 gap-1.5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                          <Link
                            to={`/edit/${todo.id}`}
                            onClick={(event) => {
                              if (todo.completed) {
                                event.preventDefault();
                              }
                            }}
                            className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                              todo.completed
                                ? "cursor-not-allowed bg-slate-800 text-slate-600"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                            }`}
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleRemove(todo)}
                            className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}

export default Todos;
