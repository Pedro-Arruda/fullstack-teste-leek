"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../components/input";
import Label from "../components/label";
import { successToast } from "../components/toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3333/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        throw new Error("Falha ao registrar");
      }

      successToast("Usuário registrado com sucesso.");

      router.push("/");
    } catch (err: any) {
      setError(err.message);
      console.error("Erro ao registrar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        ></a>
        <Image
          className="mr-2 mb-8"
          src="https://static.wixstatic.com/media/fb4fd8_c7622301876c41549507f67e8d981487~mv2.png/v1/fill/w_122,h_67,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/LOGO%20LEEK%20OFICIAL.png"
          alt="logo"
          width={122}
          height={67}
        />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Registrar
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" text="Nome" />

                <Input
                  type="name"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Pedro"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" text="Email" />

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
                <Label htmlFor="password" text="Senha" />

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
                className={`flex w-full justify-center rounded-md bg-purple-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Entrando..." : "Registrar"}
              </button>
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
