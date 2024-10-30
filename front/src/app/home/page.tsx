"use client";
import { createTask } from "@/api/tasks/createTask";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { ModalAddTask } from "../components/modal-add-task";
import { ModalDeleteTask } from "../components/modal-delete-task";
import { ModalEditTask } from "../components/modal-edit-task";
import { useAuth } from "../context/AuthContext";
import { Task } from "../types/task";
import { TableTasks } from "./components/table-tasks";

const Home = () => {
  const { auth } = useAuth();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [fields, setFields] = useState({
    title: "",
    description: "",
    status: "pendente",
    finishedAt: "",
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3333/task", {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchTasks();
    }
  }, [auth]);

  const handleSubmit = async () => {
    await createTask(fields, auth?.token);

    setIsOpenAddModal(false);
    setFields({
      title: "",
      description: "",
      status: "pendente",
      finishedAt: new Date().toISOString().substring(10),
    });
    fetchTasks();
  };

  const handleEdit = async () => {
    const { description, finishedAt, status, title } = fields;
    try {
      await fetch(`http://localhost:3333/task/${selectedTask?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
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
          Authorization: `Bearer ${auth}`,
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

        {tasks && tasks.length > 0 ? (
          <TableTasks
            tasks={tasks}
            setIsOpenDeleteModal={setIsOpenDeleteModal}
            setIsOpenEditModal={setIsOpenEditModal}
            setSelectedTask={setSelectedTask}
          />
        ) : (
          <p className="text-center font-semibold">
            Sem tarefas por enquanto...
          </p>
        )}
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
