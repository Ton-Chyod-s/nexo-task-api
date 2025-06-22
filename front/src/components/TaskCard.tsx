import { useState } from "react";

export default function TaskCard() {
  const [title, setTitle] = useState("Título");
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow pb-2 pl-5 mt-1 border-b border-gray-300 text-xl font-semibold focus:border-blue-600 outline-none"
        />
        <button
          type="button"
          onClick={() => setStarOn(!starOn)}
          className=" text-yellow-500 focus:outline-none h-6 w-6"
          aria-label={starOn ? "Desfavoritar" : "Favoritar"}
        >
          {starOn ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-current"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
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
