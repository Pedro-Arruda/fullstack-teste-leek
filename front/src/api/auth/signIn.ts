const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const signIn = async (fields: {
  email: string;
  password: string;
}): Promise<{ token: string } | undefined> => {
  try {
    const response = await fetch(`${apiUrl}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!response.ok) throw new Error("Falha ao fazer login");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
