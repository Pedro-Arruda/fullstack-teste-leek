"use client";
import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { ModalAddTask } from "../components/modal-add-task";
import { ModalDeleteTask } from "../components/modal-delete-task";
import { ModalEditTask } from "../components/modal-edit-task";
import { formatDateTime } from "../utils/formatDateTime";

const Home = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0Njg1ZTM4My0yMDA2LTQ4YmMtYWNkMi1mZDk0NGMyZmZkOWEiLCJpYXQiOjE3MzAyODc2MTcsImV4cCI6MTczMDM3NDAxN30.vCJTpVZMuRnW6tACDVFi1DMaJA2kB5OB7GmOy1PjrCQ";

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [fields, setFields] = useState({
    title: "",
    description: "",
    status: "pendente",
    finishedAt: new Date().toISOString().substring(10),
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3333/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async () => {
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
          finishedAt: new Date(finishedAt).toISOString(),
          status,
          title,
        }),
      });

      setIsOpenAddModal(false);
      setFields({
        title: "",
        description: "",
        status: "pendente",
        finishedAt: new Date().toISOString().substring(10),
      });
      fetchTasks();
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleEdit = async () => {
    const { description, finishedAt, status, title } = fields;
    try {
      await fetch(`http://localhost:3333/task/${selectedTask?.id}`, {
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

      setIsOpenEditModal(false);
      setFields({
        title: "",
        description: "",
        status: "pendente",
        finishedAt: new Date().toISOString().substring(10),
      });
      fetchTasks();
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleDelete = async () => {
    setIsOpenDeleteModal(false);
    try {
      await fetch(`http://localhost:3333/task/${selectedTask?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <section className="container mt-10 mx-auto ">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-6">Lista de tarefas</h1>

          <Button className="w-max" onClick={() => setIsOpenAddModal(true)}>
            Adicionar nova tarefa
            <Plus size={20} />
          </Button>
        </div>
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
      </div>

      {isOpenAddModal && (
        <ModalAddTask
          fields={fields}
          setFields={setFields}
          handleSubmit={handleSubmit}
          setIsOpenModal={setIsOpenAddModal}
        />
      )}

      {isOpenEditModal && (
        <ModalEditTask
          fields={fields}
          setFields={setFields}
          handleSubmit={handleEdit}
          setIsOpenModal={setIsOpenEditModal}
          task={selectedTask}
        />
      )}

      {isOpenDeleteModal && (
        <ModalDeleteTask
          handleDelete={handleDelete}
          setIsOpenModal={setIsOpenDeleteModal}
        />
      )}
    </section>
  );
};

export default Home;
