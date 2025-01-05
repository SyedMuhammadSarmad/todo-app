"use client";
import { MdDelete } from "react-icons/md";

interface DeleteTodoProps {
  id: number;
  onDelete: (id: number) => void; 
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ id,onDelete }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/todo`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        console.log("Task deleted");
         onDelete(id)// Notify parent component about the deletion
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <MdDelete
      onClick={handleDelete}
      className="cursor-pointer text-red-600 ml-auto hover:text-red-800 transition-colors"
    />
  );
};

export default DeleteTodo;
