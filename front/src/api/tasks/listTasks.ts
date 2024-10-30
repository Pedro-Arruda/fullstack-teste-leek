const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const listTasks = async (token?: string) => {
  try {
    const response = await fetch(`${apiUrl}/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
