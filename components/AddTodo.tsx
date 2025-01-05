"use client";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

interface AddTodoProps {
  onAdd: (newTask: { id: number; task: string }) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [task, setTask] = useState("");

  const handleClick = async () => {
    try {
      if (task.trim()) {
        const res = await fetch("/api/todo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task }),
        });

        if (!res.ok) {
          throw new Error(`Failed to add task: ${res.statusText}`);
        }

        const result = await res.json();
        if (result.task) {
          onAdd(result.task); // Assuming result.task contains { id, task }
          setTask(""); // Clear input field
        }
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form
      className="w-full flex items-center gap-x-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="rounded-full w-full p-5 border focus:outline-primary"
        type="text"
        placeholder="Add a new task"
      />
      <button
        type="button"
        onClick={handleClick}
        className="h-10 w-10 flex items-center justify-center"
      >
        <IoSendSharp />
      </button>
    </form>
  );
};

export default AddTodo;
