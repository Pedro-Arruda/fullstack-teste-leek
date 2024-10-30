"use client";
import { createTask } from "@/api/tasks/createTask";
import { deleteTask } from "@/api/tasks/deleteTask";
import { listTasks } from "@/api/tasks/listTasks";
import { updateTask } from "@/api/tasks/updateTask";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/button";
import withAuth from "../components/withAuth";
import { useAuth } from "../context/AuthContext";
import { Task } from "../types/task";
import { ModalAddTask } from "./components/modal-add-task";
import { ModalDeleteTask } from "./components/modal-delete-task";
import { ModalEditTask } from "./components/modal-edit-task";
import { TableTasks } from "./components/table-tasks";

const Home = () => {
  const { auth } = useAuth();

  const getInitialFields = () => ({
    title: "",
    description: "",
    status: "pendente",
    finishedAt: "",
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [fields, setFields] = useState(getInitialFields);

  const fetchTasks = async () => {
    const data = await listTasks(auth?.token);
    setTasks(data);
  };

  useEffect(() => {
    if (auth) fetchTasks();
  }, [auth]);

  const handleSubmit = async () => {
    await createTask(fields, auth?.token);

    setIsOpenAddModal(false);
    setFields(getInitialFields);
    fetchTasks();
  };

  const handleEdit = async () => {
    await updateTask(fields, auth?.token, selectedTask?.id);

    setIsOpenEditModal(false);
    setFields(getInitialFields);
    fetchTasks();
  };

  const handleDelete = async () => {
    await deleteTask(auth?.token, selectedTask?.id);
    setIsOpenDeleteModal(false);
    fetchTasks();
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

export default withAuth(Home);
