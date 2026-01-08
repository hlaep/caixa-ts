export const formatBRL = (num: number): string =>
  num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatDateHourMinute = (date: Date): string =>
  date.toLocaleString("pt-BR", { hour: "2-digit", minute: "2-digit" });
