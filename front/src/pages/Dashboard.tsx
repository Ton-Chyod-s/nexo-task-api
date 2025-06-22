import SearchHeader from "./../components/SearchHeader";
import TaskCard from "./../components/TaskCard";
import TaskItemCard from "../components/TaskItemCard";

const tasksFromDb = [
  { id: 1, title: "Título", isFavorite: true, color: "bg-white" },
  { id: 2, title: "Título", isFavorite: true, color: "bg-blue-200" },
  { id: 3, title: "Título", isFavorite: false, color: "bg-white" },
  { id: 4, title: "Título", isFavorite: false, color: "bg-yellow-200" },
  { id: 5, title: "Título", isFavorite: false, color: "bg-green-200" },
  { id: 6, title: "Título", isFavorite: false, color: "bg-white" },
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
          />
        ))}
      </div>

        <h1 className="text-2xl font-bold"></h1>
      </main>
    </div>
  );
}
