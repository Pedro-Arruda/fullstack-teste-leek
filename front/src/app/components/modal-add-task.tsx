import { Check, X } from "lucide-react";
import { FieldsTask } from "../home/types";
import { Button } from "./button";
import { Modal } from "./modal";

interface IModalAddTask {
  fields: FieldsTask;
  setFields: (fields: FieldsTask) => void;
  setIsOpenModal: (isOpen: boolean) => void;
  handleSubmit: () => void;
}

export const ModalAddTask = ({
  fields,
  handleSubmit,
  setIsOpenModal,
  setFields,
}: IModalAddTask) => {
  return (
    <Modal
      onClose={() => setIsOpenModal(false)}
      header={
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <p>
            <X
              size={24}
              onClick={() => setIsOpenModal(false)}
              className="cursor-pointer"
            />
          </p>
          <p className="text-xl font-semibold">Adicionar tarefa</p>
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
          <label className="block text-sm font-medium  dark:text-white">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={fields.title}
            onChange={(e) => setFields({ ...fields, title: e.target.value })}
            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white"
            placeholder="Título da tarefa"
            required
          />

          <label className="block text-sm font-medium text-neutral-900 dark:text-white">
            Descrição
          </label>
          <textarea
            name="description"
            value={fields.description}
            onChange={(e) =>
              setFields({ ...fields, description: e.target.value })
            }
            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white"
            placeholder="Descrição da tarefa"
            required
          />

          <label className="block text-sm font-medium text-neutral-900 dark:text-white">
            Status
          </label>
          <select
            name="status"
            value={fields.status}
            onChange={(e) => setFields({ ...fields, status: e.target.value })}
            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white"
          >
            <option value="pendente">Pendente</option>
            <option value="concluida">Concluída</option>
            <option value="em_progresso">Em Progresso</option>
          </select>

          <label className="block text-sm font-medium text-neutral-900 dark:text-white">
            Data de Conclusão
          </label>
          <input
            type="date"
            name="finishedAt"
            value={fields.finishedAt}
            onChange={(e) =>
              setFields({
                ...fields,
                finishedAt: e.target.value,
              })
            }
            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white"
            required
          />
        </div>
      </form>
    </Modal>
  );
};
