"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {};

const TodoForm = ({ session }) => {
  const router = useRouter();
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newTodo, session }),
    });

    router.refresh();
    setNewTodo("");
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border border-1 p-2"
        type="text"
        name="content"
        placeholder="Enter your todo..."
        required
        value={newTodo}
        onChange={handleInputChange}
      />
      <button className="btn-primary" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
