
import Todolist from "@/components/Todolist";
import AddTodo from "@/components/AddTodo";

export default function Home() {
  return (
    <main className="bg-gradient-to-tr from-white to-cyan-400 h-screen flex justify-center items-center">
      <div className=" px-6 py-8 max-w-xl w-full  bg-white backdrop-blur-xl  rounded-xl ">
      
      <Todolist />
      <AddTodo/>

      </div>
    </main>
  );
}
