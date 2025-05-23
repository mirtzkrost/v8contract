import countries from "i18n-iso-countries";
import ptLocale from "i18n-iso-countries/langs/pt.json";

// Registrar o idioma português
countries.registerLocale(ptLocale);

/**
 * Função para obter a lista de países/nacionalidades em pt-BR
 * @returns Array de objetos com `code` e `name`
 */
export const getNationalities = () => {
  const countryNamesPtBr = countries.getNames("pt");

  return Object.entries(countryNamesPtBr).map(([code, name]) => ({
    code,
    name,
  }));
};
