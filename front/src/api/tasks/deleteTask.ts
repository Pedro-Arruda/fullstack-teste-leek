import { successToast } from "@/app/components/toast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const deleteTask = async (token?: string, taskId?: string) => {
  try {
    await fetch(`${apiUrl}/task/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    successToast("Task deletada com sucesso.");
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
