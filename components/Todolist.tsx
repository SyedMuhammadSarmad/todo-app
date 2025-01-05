import { Todo } from "@/app/lib/drizzle";
import DeleteTodo from "./DeleteTodo";

interface TodolistProps {
  tasks: Todo[];
  onDelete: (id: number) => void;
}


const Todolist: React.FC<TodolistProps> = ({ tasks, onDelete }) => {
  return (
    <>
    {tasks.map((item)=>
        {return(
          <div key={item.id} className="flex justify-center items-center gap-x-5 ">
            <div className="bg-slate-100 p-4 rounded-lg flex items-center gap-x-10 my-5 shadow w-full">
              <div className="bg-primary rounded-full h-3 w-3"></div>
              <p className="text-lg font-medium ">{item.task}</p>
              <DeleteTodo id={item.id}  onDelete={onDelete}/>
            </div>
          </div>
        )
        }
    )}
    </>
)
}

export default Todolist