import { useState } from "react";
import { Star, StarOff } from "lucide-react";

export default function TaskCard() {
  const [search, setSearch] = useState("");
  const [starOn, setStarOn] = useState(false);

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    window.alert("Buscando notas com o termo: " + search);
  }

  return (
    <div className="bg-white shadow-md rounded w-[90%] sm:w-1/2 mx-auto p-4">
      <header className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Título"
          className="flex-grow pb-2 pl-5 mt-1 border-b border-gray-300 text-xl font-semibold focus:border-blue-600 outline-none"
        />
        <button
          type="button"
          onClick={() => setStarOn(!starOn)}
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

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Criar nota..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pb-5 pl-5 text-xl font-semibold focus:border-blue-600 outline-none"
        />
      </form>
    </div>
  );
}
