interface StatusLabelProps {
  status: string;
}

export const StatusLabel = ({ status }: StatusLabelProps) => {
  let textColor = "text-neutral-300";

  switch (status) {
    case "CONCLUIDA":
      textColor = "text-green-400";
      break;
    case "EM_PROGRESSO":
      textColor = "text-blue-400";
      break;
    case "PENDENTE":
      textColor = "text-yellow-400";
      break;
    default:
      break;
  }

  return (
    <div className="flex items-center gap-2">
      <span className={` text-sm ${textColor}`}>
        {status.replaceAll("_", " ")}
      </span>
    </div>
  );
};
