"use client"
import { NewTodo, Todo } from "@/app/lib/drizzle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";




const AddTodo = () => {
  const [task,setTask] = useState<NewTodo | null>(null)
  const {refresh} = useRouter();

  const handleClick = async() => {
    try{
      if(task){
        const res = fetch(
          "/api/todo",
          {
          method :"POST",
          body:JSON.stringify({ task:task.task}),
          }
        )
      }
      refresh();

    }
    catch(error){
      console.log(error)
    }
  }
    return (
      <form className="w-full flex items-center gap-x-4">
        <input onChange={(e) => setTask({ task: e.target.value })} className=" rounded-full w-full p-5 border focus:outline-primary" type="text"></input>
        <IoSendSharp onClick={handleClick} className="h-10 w-10" />
      </form>
    )
  }
  
  export default AddTodo