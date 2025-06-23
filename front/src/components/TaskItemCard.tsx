import { useState } from "react";
import { X, Pencil, Droplet, Star, StarOff } from "lucide-react";
import ColorPickerModal from "../components/ColorPickerModal";


type TaskItemCardProps = {
  id: string;
  title: string;
  isFavorite: boolean;
  color: string;
  body?: string;
};

export default function TaskItemCard({ id, title, isFavorite, color, body }: TaskItemCardProps) {
  const [starOn, setStarOn] = useState(isFavorite);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardColor, setCardColor] = useState(color);

  return (
    <>
      <div id={id} className={`rounded-[2rem] shadow-md p-4 w-full max-w-sm ${cardColor}`}>
        <header className="flex justify-between items-center mb-3">
          <p className="flex-grow bg-transparent text-lg font-bold border-b border-gray-300 pb-1">
            {title}
          </p>
          <button
            type="button"
            onClick={() => setStarOn(!starOn)}
            className="ml-2 text-yellow-500"
          >
            {starOn ? (
              <Star className="w-5 h-5 fill-yellow-500" />
            ) : (
              <StarOff className="w-5 h-5" />
            )}
          </button>
        </header>

        <p className="text-sm text-gray-600 mb-64">
          {body || "Nenhuma descrição fornecida."}
        </p>

        <footer className="flex justify-between items-center mt-6 text-lg">
          <div className="flex gap-3">
            <button title="Editar">
              <Pencil className="w-5 h-5 text-gray-600" />
            </button>
            <button title="Cor" onClick={() => {
              setIsModalOpen(true)
              }}>
              <Droplet className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button title="Excluir">
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
