import { useState } from "react";
import { X, Pencil, Droplet }  from "lucide-react";

type TaskItemCardProps = {
  title: string;
  isFavorite: boolean;
  color: string;
};

export default function TaskItemCard({ title, isFavorite, color }: TaskItemCardProps) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [starOn, setStarOn] = useState(isFavorite);

  return (
    <div className={`rounded-[2rem] shadow-md p-4 w-full max-w-sm ${color}`}>
      <header className="flex justify-between items-center mb-3">
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          className="flex-grow bg-transparent text-lg font-bold focus:outline-none border-b border-gray-300 pb-1"
        />
        <button
          type="button"
          onClick={() => setStarOn(!starOn)}
          className="ml-2 text-yellow-500"
          aria-label={starOn ? "Desfavoritar" : "Favoritar"}
        >
          {starOn ? "⭐" : "☆"}
        </button>
      </header>

      <p className="text-sm text-gray-600 pb-50">
        Clique ou arraste o arquivo para esta área para fazer upload
      </p>

      <footer className="flex justify-between items-center mt-6 text-lg">
      <div className="flex gap-3">
        <button title="Editar">
          <Pencil className="w-5 h-5 text-gray-600" />
        </button>
        <button title="Cor">
          <Droplet className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <button title="Excluir">
        <X className="w-5 h-5" />
      </button>
    </footer>

    </div>
  );
}
