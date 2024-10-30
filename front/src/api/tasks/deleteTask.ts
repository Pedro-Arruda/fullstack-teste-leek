export const deleteTask = async (token?: string, taskId?: string) => {
  try {
    await fetch(`http://localhost:3333/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
