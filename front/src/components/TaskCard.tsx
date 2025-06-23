import { Star, StarOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type TaskCardProps = {
  onTaskCreated?: () => void;
};

export default function TaskCard({ onTaskCreated }: TaskCardProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [starOn, setStarOn] = useState(false);
  const [starTouched, setStarTouched] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  async function handleCreateTask(): Promise<void> {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!title.trim() || !description.trim()) return;

    const taskPayload = {
      titulo: title,
      descricao: description,
      dataPrevista: new Date().toISOString(),
      prioridade: "MEDIA",
      status: starTouched ? starOn : false,
    };

    try {
      const response = await fetch("http://localhost:3002/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskPayload),
      });

      if (!response.ok) throw new Error("Erro ao criar tarefa");

      setTitle("");
      setDescription("");
      setStarOn(false);
      setStarTouched(false);

      if (onTaskCreated) onTaskCreated(); // Chama o callback

    } catch (error) {
      console.error("Erro:", error);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreateTask();
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        (title.trim() || description.trim())
      ) {
        handleCreateTask();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [title, description, starOn, starTouched]);

  return (
    <div
      ref={cardRef}
      className="bg-white shadow-md rounded w-[90%] sm:w-1/2 mx-auto p-4"
    >
      <form onKeyDown={handleKeyDown}>
        <header className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow pb-2 pl-5 mt-1 border-b border-gray-300 text-xl font-semibold focus:border-blue-600 outline-none"
          />
          <button
            type="button"
            onClick={() => {
              setStarTouched(true);
              setStarOn(!starOn);
            }}
            className="ml-3 text-yellow-500 focus:outline-none"
            aria-label={starOn ? "Desfavoritar" : "Favoritar"}
          >
            {starOn ? (
              <Star className="w-6 h-6 fill-yellow-500" />
            ) : (
              <StarOff className="w-6 h-6" />
            )}
          </button>
        </header>

        <input
          type="text"
          placeholder="Descrição da tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full pb-5 pl-5 text-xl font-semibold focus:border-blue-600 outline-none"
        />
      </form>
    </div>
  );
}
