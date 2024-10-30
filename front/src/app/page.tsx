"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "./components/input";
import Label from "./components/label";
import { errorToast, successToast } from "./components/toast";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  const { updateAuth } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3333/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Falha ao fazer login");

      const data = await response.json();
      if (data) {
        updateAuth({ token: data.token });
        router.push("/home");
        successToast("Usuário logado com sucesso.");
      }
    } catch (err: any) {
      errorToast(err.message);
      console.error("Erro ao fazer login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          <Image
            className="mr-2"
            src="https://static.wixstatic.com/media/fb4fd8_c7622301876c41549507f67e8d981487~mv2.png/v1/fill/w_122,h_67,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/LOGO%20LEEK%20OFICIAL.png"
            alt="logo"
            width={122}
            height={67}
          />
        </a>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
              Entrar na sua conta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label text="Email" htmlFor="email" />
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pedro@leeksolucoes.com.br"
                  required
                />
              </div>
              <div>
                <Label text="Senha" htmlFor="password" />

                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-purple-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Não tem uma conta ainda?
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2 underline"
                >
                  Registrar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
