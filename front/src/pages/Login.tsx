import { useState } from "react";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login com:", form);
    // Aqui você chama sua API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>
        <InputField label="Email" name="email" value={form.email} onChange={handleChange} />
        <InputField label="Senha" name="password" type="password" value={form.password} onChange={handleChange} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700">
          Entrar
        </button>
        <p className="text-sm text-center mt-4">
          Não tem conta? <Link to="/register" className="text-blue-600 hover:underline">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}
