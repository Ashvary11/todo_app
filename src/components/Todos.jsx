import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { checkingcheckBox, removeTodo, reorderTodos } from "../redux/todoSlice";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
//alretnat to react beautiful dnd

function TodoItem({ todo, index }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
    toast.warn("Todo removed");
  };

  return (
    <Draggable draggableId={String(todo.id)} index={index}>
      {/* -- */}
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="glass-card rounded-2xl p-4 shadow-sm transition hover:bg-white/50 sm:p-5"
        >
          <div className="flex items-start gap-2 sm:gap-3">
            {/* Drag handle */}
            <div
              {...provided.dragHandleProps}
              className="shrink-0 px-1 py-1 text-lg text-yellow-900/50 sm:px-2"
            >
              ⋮⋮
            </div>

            <div className="w-5 shrink-0 pt-1 text-center text-xs font-semibold text-yellow-900 sm:w-7">
              {String(index + 1).padStart(2, "0")}
            </div>

            <button
              type="button"
              onClick={() => dispatch(checkingcheckBox(todo.id))}
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                todo.completed
                  ? "border-yellow-800 bg-yellow-800 text-white"
                  : "border-yellow-900/40 bg-white/30 hover:border-yellow-800"
              }`}
            >
              {todo.completed && <span className="text-xs font-bold">✓</span>}
            </button>

            {/* Todo Text */}
            <div className="min-w-0 flex-1">
              <p
                className={`break-words text-sm leading-6 sm:text-base ${
                  todo.completed
                    ? "text-yellow-900/50 line-through"
                    : "text-yellow-950"
                }`}
              >
                {todo.todo}
              </p>

              <p
                className={`mt-1 text-xs font-medium ${
                  todo.completed ? "text-yellow-800" : "text-yellow-900/50"
                }`}
              >
                {todo.completed ? "Completed" : "Pending"}
              </p>
            </div>

            <div className="flex shrink-0 gap-1 sm:gap-1.5">
              <Link
                to={`/edit/${todo.id}`}
                onClick={(e) => {
                  if (todo.completed) e.preventDefault();
                }}
                className={`rounded-lg px-2 py-2 text-xs font-medium transition sm:px-3 ${
                  todo.completed
                    ? "cursor-not-allowed bg-white/20 text-yellow-900/30"
                    : "bg-white/40 text-yellow-900 hover:bg-white/60"
                }`}
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-red-500/10 px-2 py-2 text-xs font-medium text-red-700 transition hover:bg-red-500/20 sm:px-3"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* -- */}
    </Draggable>
  );
}

function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  if (todos.length === 0) {
    return (
      <div className="glass-card rounded-2xl border-dashed px-6 py-16 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-900/10 text-2xl text-yellow-800">
          ✓
        </div>

        <h2 className="text-lg font-semibold text-yellow-950">No tasks yet</h2>

        <p className="mt-2 text-sm text-yellow-900/60">
          Add your first task above and get started.
        </p>
      </div>
    );
  }
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newTodos = [...todos];

    const [movedTodo] = newTodos.splice(result.source.index, 1);

    newTodos.splice(result.destination.index, 0, movedTodo);

    dispatch(reorderTodos(newTodos));
  };
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-yellow-950">All Tasks</h2>

        <p className="mt-1 text-xs text-yellow-900">
          {todos.length} {todos.length === 1 ? "task" : "tasks"}
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              {todos.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} index={index} />
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
