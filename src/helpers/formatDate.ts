import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export const formatDate = (date: string) => {
  return dayjs(date).locale("pt-br").format("DD/MM/YYYY");
};

export const handleBirthDateChange = (value: string) => {
  // Remove qualquer máscara e formata como AAAA-MM-DD
  const unmaskedValue = value.replace(/\D/g, ""); // Remove tudo que não for número
  const formattedValue =
    unmaskedValue.length >= 8
      ? `${unmaskedValue.slice(4, 8)}-${unmaskedValue.slice(
          2,
          4
        )}-${unmaskedValue.slice(0, 2)}`
      : unmaskedValue; // Mantém apenas o formato no envio
  return formattedValue;
};
