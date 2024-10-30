import { Task } from "@/app/types/task";
import { formatDate } from "@/app/utils/formatDate";
import { formatDateTime } from "@/app/utils/formatDateTime";
import { Pencil, Trash } from "lucide-react";

interface TableTasksProps {
  tasks: Task[];
  setSelectedTask: (task: Task) => void;
  setIsOpenEditModal: (isOpenEditModal: boolean) => void;
  setIsOpenDeleteModal: (isOpenDeleteModal: boolean) => void;
}

export const TableTasks = ({
  tasks,
  setIsOpenDeleteModal,
  setIsOpenEditModal,
  setSelectedTask,
}: TableTasksProps) => {
  return (
    <div className="overflow-x-auto mt-5 overflow-hidden rounded-md border border-gray-600 ">
      <table className="min-w-full bg-gray-800 border-collapse">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="py-3 px-6font-semibold text-sm uppercase ">
              Título
            </th>
            <th className="py-3 px-6font-semibold text-sm uppercase ">
              Descrição
            </th>
            <th className="py-3 px-6font-semibold text-sm uppercase ">
              Status
            </th>
            <th className="py-3 px-6font-semibold text-sm uppercase ">
              Data da conclusão
            </th>
            <th className="py-3 px-6font-semibold text-sm uppercase ">
              Data da criação
            </th>
            <th className="py-3 px-6font-semibold text-sm uppercase ">
              Opções
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="border-b border-gray-600">
              <td className="py-4 px-6 text-center">{task.title}</td>
              <td className="py-4 px-6 text-center">{task.description}</td>
              <td className="py-4 px-6 text-center font-bold">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    task.status === "PENDENTE"
                      ? "bg-yellow-100 text-yellow-700"
                      : task.status === "CONCLUIDA"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  <span className="font-semibold">
                    {task.status.replaceAll("_", " ")}
                  </span>
                </span>
              </td>
              <td className="py-4 px-6 border-b border-gray-600 text-center">
                {task.finishedAt
                  ? formatDate(task.finishedAt)
                  : "Não concluído"}
              </td>
              <td className="py-4 px-6 border-b border-gray-600 text-center">
                {formatDateTime(task.createdAt)}
              </td>
              <td className="py-4 px-6 border-b border-gray-600 space-x-4 text-center">
                <button
                  onClick={() => {
                    setSelectedTask(task);
                    setIsOpenEditModal(true);
                  }}
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => {
                    setSelectedTask(task);
                    setIsOpenDeleteModal(true);
                  }}
                >
                  <Trash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
