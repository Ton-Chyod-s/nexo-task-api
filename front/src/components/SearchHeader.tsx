import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function SearchHeader() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
 
  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    window.alert("Buscando notas com o termo: " + search);
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
      <div className="flex items-center gap-2 ml-5">
        <img src="./assets/img/logo.png" alt="Logo" className="w-6 h-6" />
        <span className="font-semibold text-gray-700">CoreNotes</span>
      </div>

  
      <div className="flex flex-1 ml-10 mr-10 md:mr-96 relative">
        {/* Botão lupa */}
        <button
          type="button"
          onClick={() => handleSearch(new Event('submit') as any)}
          aria-label="Buscar notas"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </button>

        <input
          type="text"
          placeholder="Pesquisar notas"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-1 border-2 border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>


      {/* Botão de busca */}

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
