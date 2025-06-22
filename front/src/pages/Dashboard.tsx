import SearchHeader from "./../components/SearchHeader";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <SearchHeader />

      <main className="p-4">
        <h1 className="text-2xl font-bold">Bem-vindo ao painel</h1>
        
      </main>
    </div>
  );
}
