import SearchHeader from "./../components/SearchHeader";
import TaskCard from "./../components/TaskCard";
import TaskItemCard from "../components/TaskItemCard";
import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";

const tasksFromDb = [
  { id: 1, title: "Título 1", isFavorite: true, color: "bg-white", body: "Descrição da tarefa 1" },
  { id: 2, title: "Título 2", isFavorite: true, color: "bg-blue-200", body: "Descrição da tarefa 2"},
  { id: 3, title: "Título 3", isFavorite: false, color: "bg-white", body: "Descrição da tarefa 3" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3002/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar tarefas");
        }

        const data = await response.json();
        setTasks(data); 
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    }

    fetchTasks();
  }, [navigate]);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SearchHeader />

      <main className="w-full flex flex-col items-center mx-auto">

        <div className="p-4 flex items-center justify-between w-full ">
          <TaskCard />
        </div>

        <div className="flex flex-wrap justify-center gap-4 w-full p-4">
        {tasksFromDb.map((task) => (
          <TaskItemCard
            key={task.id}
            title={task.title}
            isFavorite={task.isFavorite}
            color={task.color}
            body={task.body}
          />
        ))}
      </div>

        <h1 className="text-2xl font-bold"></h1>
      </main>
    </div>
  );
}
