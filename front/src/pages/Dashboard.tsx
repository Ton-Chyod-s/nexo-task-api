import SearchHeader from "./../components/SearchHeader";
import TaskCard from "./../components/TaskCard";
import TaskItemCard from "../components/TaskItemCard";
import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const navigate = useNavigate();

  interface Task {
    id: number;
    titulo: string;
    descricao?: string;
    status: boolean; 
    color?: string;
  }

  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchTasks() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch("http://localhost:3002/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar tarefas");

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [navigate]);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SearchHeader />

      <main className="w-full flex flex-col items-center mx-auto">

        <div className="p-4 flex items-center justify-between w-full ">
          <TaskCard onTaskCreated={fetchTasks}  />
        </div>

        <div className="flex flex-wrap justify-center gap-4 w-full p-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">Nenhuma tarefa cadastrada</p>
        ) : (
          tasks
            .slice() 
            .sort((a, b) => (b.status === true ? 1 : 0) - (a.status === true ? 1 : 0))
            .map((task) => (
              <TaskItemCard
                key={task.id}
                title={task.titulo}
                isFavorite={task.status}
                color={task.color || "bg-white"}
                body={task.descricao}
              />
            ))
        )}
      </div>

        <h1 className="text-2xl font-bold"></h1>
      </main>
    </div>
  );
}
