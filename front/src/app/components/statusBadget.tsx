interface StatusBadgetProps {
  status: string;
}

export const StatusBadget = ({ status }: StatusBadgetProps) => {
  let bgColor = "bg-neutral-300";

  switch (status) {
    case "CONCLUIDA":
      bgColor = "bg-green-500";
      break;
    case "EM_PROGRESSO":
      bgColor = "bg-blue-500";
      break;
    case "PENDENTE":
      bgColor = "bg-yellow-500";
      break;
    default:
      break;
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${bgColor}`} />
    </div>
  );
};
