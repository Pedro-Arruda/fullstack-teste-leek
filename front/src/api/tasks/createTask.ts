import { successToast } from "@/app/components/toast";
import { FieldsTask } from "@/app/types/task";

export const createTask = async (fields: FieldsTask, token?: string) => {
  const { description, finishedAt, status, title } = fields;

  try {
    await fetch("http://localhost:3333/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description,
        ...(finishedAt && { finishedAt: new Date(finishedAt).toISOString() }),
        status,
        title,
      }),
    });

    successToast("Task criada com sucesso.");
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
