"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

const TodoList = ({ todos }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isEditMode, setIsEditMode] = useState({ todoId: null, content: "" });

  const handleDelete = async (todo) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: todo.id }),
    });

    router.refresh();
  };

  const handleToggleCompleted = async (todo) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
        isCompleted: !todo.isCompleted,
        content: todo.content,
      }),
    });
    router.refresh();
  };

  const handleEditTodo = async (todo) => {
    setIsEditMode({ todoId: todo.id, content: todo.content });
  };

  const handleSaveEdit = async (todoId, newContent) => {
    if (!todoId || !newContent) return; // Handle empty content

    await fetch(`/api/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: todoId, content: newContent }),
    });

    router.refresh();
    setIsEditMode({ todoId: null, content: "" });
  };

  const handleCancelEdit = () => {
    setIsEditMode({ todoId: null, content: "" });
  };

  if (status == "loading") {
    return <p>Loading...</p>;
  }

  // const filteredTodos = todos.filter(
  //   (todo) => todo.authorId === session.user.id
  // );

  // console.log(session);

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`border-2 py-1 flex flex-row gap-2 ${
            isEditMode.todoId === todo.id ? "edit-mode" : ""
          }`}
        >
          {isEditMode.todoId === todo.id ? (
            <>
              <input
                onChange={(e) =>
                  setIsEditMode({ ...isEditMode, content: e.target.value })
                }
                type="text"
                className="w-full"
                value={isEditMode.content}
              />
              <button
                onClick={() => handleSaveEdit(todo.id, isEditMode.content)}
                className="text-green-500"
              >
                Save
              </button>
              <button onClick={handleCancelEdit} className="text-gray-500">
                Cancel
              </button>
            </>
          ) : (
            <>
              <input
                onChange={() => handleToggleCompleted(todo)}
                type="checkbox"
                className="w-8"
                checked={todo.isCompleted}
              />
              <span>{todo.content}</span>
              <button
                onClick={() => handleDelete(todo)}
                className="text-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditTodo(todo)}
                className="text-blue-500"
              >
                Edit
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
