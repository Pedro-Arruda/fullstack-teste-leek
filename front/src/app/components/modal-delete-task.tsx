import { Button } from "./button";
import { Modal } from "./modal";

interface IModalDeleteTask {
  setIsOpenModal: (isOpen: boolean) => void;
  handleDelete: () => void;
}

export const ModalDeleteTask = ({
  handleDelete,
  setIsOpenModal,
}: IModalDeleteTask) => {
  return (
    <Modal
      onClose={() => {
        setIsOpenModal(false);
      }}
      header={
        <div className="flex flex-wrap gap-3  justify-center">
          <p className="text-xl font-semibold">
            Tem certeza que deseja deletar essa tarefa?
          </p>
        </div>
      }
    >
      <div className="flex gap-5">
        <Button
          className="w-full bg-transparent border-2 border-neutral-600 hover:bg-gray-600"
          onClick={() => setIsOpenModal(false)}
        >
          Cancelar
        </Button>
        <Button
          className="w-full bg-red-800 hover:bg-red-900"
          onClick={() => handleDelete()}
        >
          Confirmar
        </Button>
      </div>
    </Modal>
  );
};
