import Todolist from "@/components/Todolist";
import AddTodo from "@/components/AddTodo";
export default function Home() {
  return (
    <main className=" bg-gradient-to-tr from-secondary to-primary h-screen flex justify-center items-center">
      <div className=" px-3 py-4 w-full  bg-white   rounded-xl max-w-md ">
        <Todolist />
        <AddTodo/>
        <div className="my-2 w-1/2 bg-black/80 h-1.5 mx-auto rounded-md ">
        </div>
        
        

      </div>
    </main>
  );
}
