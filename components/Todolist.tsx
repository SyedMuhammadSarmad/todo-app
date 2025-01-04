import { Todo } from "@/app/lib/drizzle";

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
      return result.message ;
      
  } catch (err) {
      console.error('Error fetching data:', err);
      return [];
    }
}


const Todolist = async () => {
  // const [tasks, setTasks] = useState<Todo[]>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  const tasks:Todo[]= await getData();
  //     setTasks(tasks);
  //   };
    
  //   fetchData();
  // }, []); // Empty dependency array ensures this runs once when the component mounts
  
  return (
    <>
    {tasks.map((item)=>
        {return(
          <div  className="flex justify-center items-center gap-x-5 ">
            <div className="bg-slate-100 p-4 rounded-lg flex items-center gap-x-10 my-5 shadow w-full">
              <div className="bg-primary rounded-full h-3 w-3"></div>
              <p className="text-lg font-medium ">{item.task}</p>
            </div>
          </div>
        )
        }
    )}
    </>
)
}

export default Todolist