import { Star, StarOff, Flag, Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Prioridade = "ALTA" | "MEDIA" | "BAIXA";

type TaskCardProps = {
  onTaskCreated?: () => void;
};

export default function TaskCard({ onTaskCreated }: TaskCardProps) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [starOn, setStarOn] = useState(false);
  const [starTouched, setStarTouched] = useState(false);
  const [prioridade, setPrioridade] = useState<Prioridade>("MEDIA");
  const [dataPrevista, setDataPrevista] = useState(() =>
    new Date().toISOString().split("T")[0]
  ); 
  const [cor, setCor] = useState("#ffffff");

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
      dataPrevista,
      prioridade,
      status: starTouched ? starOn : false,
      cor,
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
      setPrioridade("MEDIA");
      setDataPrevista(new Date().toISOString().split("T")[0]);

      if (onTaskCreated) onTaskCreated();
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
  }, [title, description, starOn, starTouched, prioridade, dataPrevista]);

  return (
    <div
      ref={cardRef}
      className="bg-white shadow-md rounded w-[90%] sm:w-2/5 mx-auto p-4"
    >
      <form onKeyDown={handleKeyDown}>
        <header className="mb-4 flex items-center gap-3">
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
            className="text-yellow-500 focus:outline-none"
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
          className="w-full pl-5 text-xl font-semibold focus:border-blue-600 outline-none"
        />

        <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Flag
              className="w-5 h-5"
              color={
                prioridade === "ALTA"
                  ? "red"
                  : prioridade === "MEDIA"
                  ? "orange"
                  : "green"
              }
            />
            <select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value as Prioridade)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Média</option>
              <option value="BAIXA">Baixa</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="w-5 h-5" />
            <input
              type="date"
              value={dataPrevista}
              onChange={(e) => setDataPrevista(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
