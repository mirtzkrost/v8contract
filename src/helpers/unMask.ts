export const unmaskCpf = (value: string) => {
  return value.replace(/\D/g, "");
};

export const unMaskPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.slice(2);
};

export const getDDD = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  return digits.slice(0, 2);
};
