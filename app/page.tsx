'use client';
import Todolist from "@/components/Todolist";
import AddTodo from "@/components/AddTodo";
import { useState, useEffect } from "react";
import { Todo } from "@/app/lib/drizzle";

export default function Home() {
  const [tasks, setTasks] = useState<Todo[]>([]);

  const getData = async () => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/todo`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (!res.ok) {
            throw new Error(`Failed to fetch the data: ${res.status} ${res.statusText}`);
        }
  
        const result = await res.json();
        console.log(result.message)
        return result.message ||[] ;
        
    } catch (err) {
        console.error('Error fetching data:', err);
        return [];
      }
  }

  useEffect(() => {
    const fetchData = async () => {
      const tasksData = await getData();
      setTasks(tasksData);
    };
    fetchData();
  }, []);

  const addTask = (newTask: { id: number; task: string }) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <main className="bg-gradient-to-tr from-secondary to-primary h-screen flex justify-center items-center">
      <div className="px-3 py-4 w-full bg-white rounded-xl max-w-md">
        <Todolist tasks={tasks} onDelete={deleteTask} />
        <AddTodo onAdd={addTask} />
        <div className="my-2 w-1/2 bg-black/80 h-1.5 mx-auto rounded-md" />
      </div>
    </main>
  );
}