export const formatBRL = (num: number): string =>
  num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
