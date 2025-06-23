import { useState, useEffect } from "react";
import { X, Pencil, Droplet, Star, StarOff } from "lucide-react";
import ColorPickerModal from "../components/ColorPickerModal";
import { useNavigate } from "react-router-dom";

type TaskItemCardProps = {
  id: string;
  title: string;
  isFavorite: boolean;
  color: string;
  body?: string;
  onDelete?: () => void;
  onStatusChange?: (newStatus: boolean) => void;
};

const fetchDeleteTask = async (id: string, token: string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) throw new Error("ID inválido");

  const response = await fetch(`http://localhost:3002/task/${numericId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro no servidor:", errorText);
    throw new Error("Erro ao excluir a tarefa");
  }
};

export default function TaskItemCard({
  id,
  title,
  isFavorite,
  color,
  body,
  onDelete,
  onStatusChange,
}: TaskItemCardProps) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [starOn, setStarOn] = useState(isFavorite);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardColor, setCardColor] = useState(color);

  const handleDelete = async () => {
    if (!token) {
      console.error("Token não encontrado");
      return;
    }
    try {
      await fetchDeleteTask(id, token);
      onDelete?.();
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  const handleToggleStar = () => {
    const newStatus = !starOn;
    setStarOn(newStatus);
    onStatusChange?.(newStatus);
  };

  return (
    <>
      <div
        id={`task-${id}`}
        className={`rounded-[2rem] shadow-md p-4 w-full max-w-sm ${cardColor}`}
      >
        <header className="flex justify-between items-center mb-3">
          <p className="flex-grow bg-transparent text-lg font-bold border-b border-gray-300 pb-1">
            {title}
          </p>
          <button
            type="button"
            onClick={handleToggleStar}
            className="ml-2 text-yellow-500"
          >
            {starOn ? (
              <Star className="w-5 h-5 fill-yellow-500" />
            ) : (
              <StarOff className="w-5 h-5" />
            )}
          </button>
        </header>

        <p className="text-sm text-gray-600 mb-4">
          {body || "Nenhuma descrição fornecida."}
        </p>

        <footer className="flex justify-between items-center mt-6 text-lg">
          <div className="flex gap-3">
            <button title="Editar">
              <Pencil className="w-5 h-5 text-gray-600" />
            </button>
            <button title="Cor" onClick={() => setIsModalOpen(true)}>
              <Droplet className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button title="Excluir" onClick={handleDelete}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </footer>
      </div>

      {isModalOpen && (
        <ColorPickerModal
          onClose={() => setIsModalOpen(false)}
          onSelect={(color) => {
            setCardColor(color);
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
