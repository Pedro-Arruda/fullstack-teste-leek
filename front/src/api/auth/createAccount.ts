const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createAccount = async (fields: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response = await fetch(`${apiUrl}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!response.ok) {
      throw new Error("Falha ao registrar");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
