export const formatDateTime = (value: string | Date | null | undefined) =>
  value
    ? new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(value))
    : "";
