"use client";
import { NewTodo } from "@/app/lib/drizzle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

const AddTodo = () => {
  const [task, setTask] = useState<NewTodo | null>(null);
  const { refresh } = useRouter();

  const handleClick = async () => {
    try {
      if (task) {
        const res = await fetch("/api/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: task.task }),
        })

        if (!res.ok) {
          throw new Error(`Failed to add task: ${res.statusText}`);
        }
        refresh();
        setTask(null); // Clear input field
         // Refresh the page
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  return (
    <form className="w-full flex items-center gap-x-4">
      <input
        onChange={(e) => setTask({ task: e.target.value })}
        value={task?.task || ""}
        className="rounded-full w-full p-5 border focus:outline-primary"
        type="text"
        placeholder="Add a new task"
      />
      <button type="button" onClick={handleClick} className="h-10 w-10 flex items-center justify-center">
        <IoSendSharp />
      </button>
    </form>
  );
};

export default AddTodo;
