import { useEffect } from "react";
import ReactDOM from "react-dom";

type Props = {
  onClose: () => void;
  onSelect: (color: string) => void;
  id: number;
};

const colors = [
  "bg-red-200",    // vermelho pastel
  "bg-green-200",  // verde pastel
  "bg-blue-200",   // azul pastel
  "bg-yellow-200", // amarelo pastel
  "bg-pink-200",   // rosa pastel
  "bg-purple-200", // roxo pastel
  "bg-indigo-200", // índigo pastel
  "bg-teal-200",   // teal pastel
  "bg-orange-200", // laranja pastel
  "bg-gray-200",   // cinza clarinho pastel
  "bg-gray-300",   // cinza um pouco mais escuro, mas ainda pastel
  "bg-gray-400"    // cinza médio pastel
];

export default function ColorPickerModal({ onClose, onSelect, id }: Props) {
  const token = sessionStorage.getItem("token");

  async function updateTaskColor(color: string) {
    try {
      const data = await fetch(`http://localhost:3002/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cor: color }),
      });

      const response = await data.json();
      if (!data.ok) {
        throw new Error(response.message || "Erro ao atualizar cor da tarefa");
      }
      onSelect(color);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar cor da tarefa:", error);
    }
  }

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-xl p-6 shadow-xl flex flex-wrap gap-4 max-w-[90vw] max-h-[70vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ minWidth: 300 }}
      >
        {colors.map((c) => (
          <div
            key={c}
            className={`w-10 h-10 rounded-full cursor-pointer ${c}`}
            onClick={() => updateTaskColor(c)}
            title={c}
          />
        ))}
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-red-500 ml-auto mt-4"
        >
          Cancelar
        </button>
      </div>
    </div>,
    document.body
  );
}
