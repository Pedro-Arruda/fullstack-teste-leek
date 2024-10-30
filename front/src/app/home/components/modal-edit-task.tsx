"use client";
import { Check, X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../../components/button";
import Input from "../../components/input";
import Label from "../../components/label";
import { Modal } from "../../components/modal";
import Select from "../../components/select";
import TextArea from "../../components/textarea";
import { FieldsTask, Task } from "../../types/task";

interface IModalEditTask {
  fields: FieldsTask;
  setFields: (fields: FieldsTask) => void;
  setIsOpenModal: (isOpen: boolean) => void;
  handleSubmit: () => void;
  task: Task | null;
}

export const ModalEditTask = ({
  fields,
  handleSubmit,
  setIsOpenModal,
  setFields,
  task,
}: IModalEditTask) => {
  useEffect(() => {
    if (task) {
      setFields({
        title: task.title || "",
        description: task.description || "",
        finishedAt: task.finishedAt ? task.finishedAt.slice(0, 10) : "",
        status: task.status,
      });
    }
  }, [task, setFields]);

  return (
    <Modal
      onClose={() => setIsOpenModal(false)}
      header={
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <X
            size={24}
            onClick={() => setIsOpenModal(false)}
            className="cursor-pointer"
          />
          <p className="text-xl font-semibold">Editar tarefa</p>
          <Button
            onClick={() => handleSubmit()}
            className="w-full sm:max-w-max py-1.5"
          >
            Confirmar
            <Check size={22} />
          </Button>
        </div>
      }
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-3">
          <Label text="Título" />
          <Input
            name="title"
            value={fields.title}
            onChange={(e) => setFields({ ...fields, title: e.target.value })}
            placeholder="Título da tarefa"
            required
          />

          <Label text="Descrição" />
          <TextArea
            name="description"
            value={fields.description}
            onChange={(e) =>
              setFields({ ...fields, description: e.target.value })
            }
            placeholder="Descrição da tarefa"
            required
          />

          <Label text="Status" />
          <Select
            name="status"
            value={fields.status}
            onChange={(e) => setFields({ ...fields, status: e.target.value })}
            options={[
              { label: "Pendente", value: "pendente" },
              { label: "Concluída", value: "concluida" },
              { label: "Em Progresso", value: "em_progresso" },
            ]}
          />

          <Label text="Data de Conclusão" />
          <Input
            type="date"
            name="finishedAt"
            value={fields.finishedAt}
            onChange={(e) =>
              setFields({
                ...fields,
                finishedAt: e.target.value,
              })
            }
            required
          />
        </div>
      </form>
    </Modal>
  );
};
