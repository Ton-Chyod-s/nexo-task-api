import { useState } from "react";
import { X } from "lucide-react";

export default function SearchHeader() {
  const [search, setSearch] = useState("");

  const clearSearch = () => setSearch("");

  return (
    <header className="bg-white shadow flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-6 h-6" />
        <span className="font-semibold text-gray-700">CoreNotes</span>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <input
          type="text"
          placeholder="Pesquisar notas"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="flex justify-end">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={clearSearch}
          aria-label="Limpar busca"
          disabled={!search} 
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
