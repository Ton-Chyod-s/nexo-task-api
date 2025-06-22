import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchHeader() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
 
  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    console.log("Buscando notas com o termo:", search);
  }

  async function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleSearch(event);
    }
  }

  async function sair() {
    sessionStorage.removeItem("token");

    setTimeout(() => {
        navigate("/login", { replace: true });
    }, 250);

    console.log("Saindo da sessão");
  }

  const clearSearch = () => setSearch("");

  return (
    <header className="bg-white shadow flex items-center justify-between px-2 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-6 h-6" />
        <span className="font-semibold text-gray-700">CoreNotes</span>
      </div>

  
      <div className="flex flex-1 ml-10 mr-10 md:mr-96">
        <input
          type="text"
          placeholder="Pesquisar notas"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-1 border-2 border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-4">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={clearSearch}
          aria-label="Limpar busca"
          disabled={!search}
        >
          <X className="w-5 h-5" />
        </button>

        <button
          className="text-gray-500 hover:text-gray-700 mr-4"
          onClick={sair}
        >
          sair
        </button>
      </div>
    </header>
  );
}
