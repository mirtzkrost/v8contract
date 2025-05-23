export const formatCurrencyBRL = (value: number | undefined) => {
  if (value === undefined) return "0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
