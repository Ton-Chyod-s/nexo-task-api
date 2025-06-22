import { useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login com:", form);

    if (form.email === "" || form.senha === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    async function fetchLogin() {
      try {
        const response = await fetch("http://localhost:3002/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: form.email, senha: form.senha }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Erro no login");
        }

        if (response.ok) {
          const data = await response.json();

          sessionStorage.setItem("token", data.token);

          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 1000);
        } else {
          window.alert("Falha no login. Verifique suas credenciais.");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        window.alert(
          "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde."
        );
      }
    }

    fetchLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>
        <InputField label="Email" name="email" value={form.email} onChange={handleChange}/>
        <InputField label="Senha" name="senha" type="password" value={form.senha} onChange={handleChange}/>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700">Entrar</button>
        <p className="text-sm text-center mt-4">Não tem conta?{" "} <Link to="/register" className="text-blue-600 hover:underline">Cadastre-se</Link></p>
      </form>
      
    </div>
  );
}
