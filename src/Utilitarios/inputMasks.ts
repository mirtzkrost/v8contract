export type MaskType =
  | "telefoneComOpcaoParaCelular"
  | "telefone"
  | "celular"
  | "cpf"
  | "cnpj"
  | "cpfOuCnpj"
  | "rg"
  | "cep"
  | "DD/MM/YYYY"
  | "DD/MM/YYYY HH:mm"
  | "placa"
  | "codigoPais"
  | "numerosSemPontuacaoMax20"
  | "siglaEstado"
  | "agencia"
  | "email"
  | "celularOuTelefonePix";

export const applyMask = (value: string, mask?: MaskType): string => {
  const masks: Record<MaskType, (val: string) => string> = {
    telefoneComOpcaoParaCelular: val =>
      val
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d{4})$/, "$1-$2")
        .slice(0, 15),

    telefone: val =>
      val
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d{4})$/, "$1-$2")
        .slice(0, 14),

    celular: val =>
      val
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})$/, "$1-$2")
        .slice(0, 15),

        celularOuTelefonePix: val =>
          val
            .replace(/\D/g, "")
            .replace(/^(\d{2})/, "+$1 ")
            .replace(/(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
            .replace(/(\d{5})(\d{4})$/, "$1-$2")
            .slice(0, 19),

    cpf: val =>
      val
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{2})$/, "$1-$2")
        .slice(0, 14),

    cnpj: val =>
      val
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{4})$/, "$1/$2")
        .replace(/(\d{4})(\d{2})$/, "$1-$2")
        .slice(0, 18),

    cpfOuCnpj: val =>
      val.length <= 14
        ? applyMask(val, "cpf")
        : applyMask(val, "cnpj"),

    rg: val =>
      val
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)$/, "$1-$2")
        .slice(0, 12),

    cep: val =>
      val.replace(/\D/g, "").replace(/(\d{5})(\d{3})$/, "$1-$2").slice(0, 9),

    "DD/MM/YYYY": val =>
      val
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 10),

    "DD/MM/YYYY HH:mm": val =>
      val
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{2})(\d)/, "$1:$2")
        .slice(0, 16),

    placa: val =>
      val
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .replace(/([A-Z]{3})(\d{4})$/, "$1-$2")
        .slice(0, 8),

    codigoPais: val =>
      val.replace(/\D/g, "").replace(/^(\d{3}).*/, "+$1"),

    numerosSemPontuacaoMax20: val =>
      val.replace(/\D/g, "").slice(0, 20),

    siglaEstado: val =>
      val
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(0, 2),

    agencia: val =>
      val
        .replace(/\D/g, "")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 6),

    email: val =>
      val
        .replace(/[^a-zA-Z0-9@._-]/g, "")
        .replace(/\s/g, "")
        .replace(/@{2,}/g, "@")
        .replace(/\.{2,}/g, ".")
        .replace(/^\./g, "")
        .replace(/@\.|\.@/g, "@"),
  };

  return mask && masks[mask] ? masks[mask](value) : value;
};
