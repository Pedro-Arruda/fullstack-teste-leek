import { FieldsTask } from "@/app/types/task";

export const updateTask = async (
  fields: FieldsTask,
  token?: string,
  taskId?: string
) => {
  const { description, finishedAt, status, title } = fields;

  try {
    await fetch(`http://localhost:3333/task/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description,
        finishedAt: new Date(finishedAt).toISOString(),
        status,
        title,
      }),
    });
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
