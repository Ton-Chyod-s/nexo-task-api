import SearchHeader from "./../components/SearchHeader";
import TaskCard from "./../components/TaskCard";
import TaskItemCard from "../components/TaskItemCard";

const tasksFromDb = [
  { id: 1, title: "Título 1", isFavorite: true, color: "bg-white", body: "Descrição da tarefa 1" },
  { id: 2, title: "Título 2", isFavorite: true, color: "bg-blue-200", body: "Descrição da tarefa 2"},
  { id: 3, title: "Título 3", isFavorite: false, color: "bg-white", body: "Descrição da tarefa 3" },
  { id: 4, title: "Título 4", isFavorite: false, color: "bg-yellow-200", body: "Descrição da tarefa 4" },
  { id: 5, title: "Título 5", isFavorite: false, color: "bg-green-200", body: "Descrição da tarefa 5" },
  { id: 6, title: "Título 6", isFavorite: false, color: "bg-white", body: "Descrição da tarefa 6" },
];

export default function Dashboard() {
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
