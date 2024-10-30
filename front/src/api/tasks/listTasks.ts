export const listTasks = async (token?: string) => {
  try {
    const response = await fetch("http://localhost:3333/task", {
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
