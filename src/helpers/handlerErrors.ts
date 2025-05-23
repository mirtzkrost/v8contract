export const handleErrorLabel = (label: string) => {
  if (!label) return "Erro na Consulta";

  if (label.includes("unauthorized_institution")) {
    return "Não Autorizado";
  }

  if (label.includes("on_locked_date_range")) {
    return "Não permitido na data atual";
  }

  if (label.includes("ongoing_operation")) {
    return "Operação em andamento (CEF)";
  }

  if (label.includes("processing_pending_changes")) {
    return "CPF com pendência saque aniversário";
  }

  if (label.includes("inexistent_anniversary_membership")) {
    return "Não aderiu ao saque aniversário";
  }

  if (
    label.includes(
      "Instituição Fiduciária não possui autorização do Trabalhador"
    )
  ) {
    return "Não Autorizado";
  }

  if (
    label.includes("Cliente não autorizou a instituição financeira a realizar")
  ) {
    return "Não Autorizado";
  }

  if (
    label.includes(
      "Mudanças cadastrais ou lançamentos a débito foram realizadas na conta"
    )
  ) {
    return "Mudanças cadastrais pendente (CEF)";
  }

  if (label.includes("Existe uma Operação Fiduciária em andamento")) {
    return "Operação em andamento (CEF)";
  }

  if (label.includes("Institution isn't authorized by the client")) {
    return "Não Autorizado";
  }

  if (
    label.includes(
      "Client does not have membership for anniversary withdraw on current date"
    )
  ) {
    return "O cliente não possui adesão para saque de aniversário na data atual";
  }

  if (label.includes("There's an ongoing operation")) {
    return "Há uma operação em andamento";
  }

  if (label.includes("Not permitted action on current date")) {
    return "Ação não permitida na data atual";
  }

  if (label.includes("generic_gateway_problem")) {
    return "Erro na Consulta";
  }

  if (
    label.includes("Changes on profile info happened on client's FGTS account")
  ) {
    return "Não Autorizado";
  }

  if (label.includes("Unknown status code [524]")) {
    return "Erro na Consulta";
  }

  return label;
};
