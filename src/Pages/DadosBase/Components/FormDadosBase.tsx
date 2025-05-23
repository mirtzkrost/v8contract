import ButtonUI from "@/components/Buttons/ButtonUI";
import InputUI from "@/components/Inputs/InputUI";
import { LogoUI } from "@/components/Layout/LogoUI";
import { TextUI } from "@/components/Texts/TextUI";
import { formHomeParams } from "@/Pages/Home/Components/FormHome";
import { simulationResponseType } from "@/Pages/Resumo/Resumo";
import { ColorsUI } from "@/Utilitarios/ColorUI";
import { textoXL2Bold, textoXLRegular } from "@/Utilitarios/fontSizeUI";
import { getNationalities } from "@/Utilitarios/getNationalities";
import { gapUi, paddingUi } from "@/Utilitarios/SizeUI";
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints";
import { Checkbox, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";


export interface formDadosBaseParams {
  nomeMae: string;
  nacionalidade: string;
  estadoCivil: string;
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  ppe: boolean;
}

type FormFieldNames = keyof formDadosBaseParams;

export const FormDadosBase = () => {
  const navigate = useNavigate();
  const Onreturn = () => {
    navigate("/");
  };
  const { currentBreakpoint } = useBreakpoints();
  const location = useLocation();
  const { simulationData, clientData }: { simulationData: simulationResponseType; clientData: formHomeParams } = location.state || {};
  const isMobile = ["base", "sm", "md"].includes(currentBreakpoint);

  const methods = useForm({
    defaultValues: {
      nomeMae: "",
      nacionalidade: "",
      estadoCivil: "",
      cep: "",
      cidade: "",
      estado: "",
      bairro: "",
      logradouro: "",
      numero: "",
      complemento: "",
      ppe: false,
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  const fetchAddressByCep = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;
        setValue("logradouro", logradouro || "");
        setValue("bairro", bairro || "");
        setValue("cidade", localidade || "");
        setValue("estado", uf || "");
      } catch (error) {
        console.error("Erro ao buscar endereço pelo CEP:", error);
      }
    }
  };

  const allNationalities = getNationalities().map((nat) => ({
    label: nat.name,
    value: nat.code,
  }));

  const mainNationalities = allNationalities.filter((nat) =>
    ["BR", "US", "AR", "PT", "ES", "IT"].includes(nat.value)
  );

  const handleChange = (name: FormFieldNames, value: string | boolean) => {
    setValue(name, value);
    const updatedData = { ...methods.getValues() };
    localStorage.setItem("formDadosBase", JSON.stringify(updatedData));
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    localStorage.setItem("formDadosBase", JSON.stringify(data));
    navigate("/dadosbancarios", {
      state: {
        simulationData,
        clientData,
        dadosBase: data,
      },
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem("formDadosBase");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key as FormFieldNames, parsedData[key]);
      });
    }
    if (location.state?.dadosBase) {
      const { dadosBase } = location.state;
      Object.keys(dadosBase).forEach((key) => {
        setValue(key as FormFieldNames, dadosBase[key]);
      });
    }
  }, [location.state]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir="column" w="100%" maxW={isMobile ? "100%" : "620px"} gap={gapUi["4xl"]} padding={paddingUi.lg}>
          <Flex flexDir="column" gap={gapUi.lg} w="100%" justifyContent="center" alignItems="center">
            <LogoUI />
            <Flex flexDir="column" gap={gapUi.md}>
              <TextUI sizeStyle={textoXL2Bold} color={ColorsUI.texto.Primario} textAlign="left" w="100%">
                Complete suas informações para continuar
              </TextUI>
              <TextUI sizeStyle={textoXLRegular} color={ColorsUI.texto.Secundario} textAlign="left" w="100%">
                Estamos quase lá! Preencha os dados necessários abaixo para finalizar sua solicitação de antecipação do FGTS. É rápido e seguro.
              </TextUI>
            </Flex>
          </Flex>
          <Flex w="100%" gap={gapUi.lg} flexDir="column">
            <InputUI
              required
              label="Nome da mãe"
              value={watch("nomeMae")}
              onChange={(value) => handleChange("nomeMae", value)}
              type="text"
              icon="User"
            />
            <Flex w="100%" gap={gapUi.lg} flexDir={isMobile ? "column" : "row"}>
              <InputUI
                required
                label="Nacionalidade"
                placeholder="Selecione a Nacionalidade"
                value={watch("nacionalidade")}
                onChange={(value) => handleChange("nacionalidade", value)}
                type="select"
                options={mainNationalities}
              />
              <InputUI
                required
                label="Estado civil"
                value={watch("estadoCivil")}
                onChange={(value) => handleChange("estadoCivil", value)}
                type="select"
                placeholder="Selecione o Estado Civil"
                options={[
                  { label: "Solteiro(a)", value: "single" },
                  { label: "Casado(a)", value: "married" },
                  { label: "Divorciado(a)", value: "divorced" },
                  { label: "Viúvo(a)", value: "widower" },
                ]}
              />
            </Flex>
            <Flex w="100%" gap={gapUi.lg} flexDir={isMobile ? "column" : "row"}>
              <InputUI
                required
                label="CEP"
                value={watch("cep")}
                onChange={(value) => {
                  handleChange("cep", value);
                  if (value.length === 8) fetchAddressByCep(value);
                }}
                type="text"
                icon="MapPin"
              />
              <InputUI
                required
                label="Estado"
                value={watch("estado")}
                onChange={(value) => handleChange("estado", value)}
                type="text"
                icon="MapPin"
              />
            </Flex>
            <Flex w="100%" gap={gapUi.lg} flexDir={isMobile ? "column" : "row"}>
              <InputUI
                required
                label="Cidade"
                value={watch("cidade")}
                onChange={(value) => handleChange("cidade", value)}
                type="text"
                icon="MapPin"
              />
              <InputUI
                required
                label="Bairro"
                value={watch("bairro")}
                onChange={(value) => handleChange("bairro", value)}
                type="text"
                icon="MapPin"
              />
            </Flex>
            <InputUI
              required
              label="Logradouro"
              value={watch("logradouro")}
              onChange={(value) => handleChange("logradouro", value)}
              type="text"
              icon="MapPin"
            />
            <Flex w="100%" gap={gapUi.lg} flexDir={isMobile ? "column" : "row"}>
              <InputUI
                required
                label="Número"
                value={watch("numero")}
                onChange={(value) => handleChange("numero", value)}
                type="text"
                icon="MapPin"
              />
              <InputUI
                label="Complemento"
                value={watch("complemento")}
                onChange={(value) => handleChange("complemento", value)}
                type="text"
                icon="MapPin"
              />
            </Flex>
            <Checkbox isChecked={watch("ppe")} onChange={(e) => handleChange("ppe", e.target.checked)}>
              Declaro ser uma Pessoa Politicamente Exposta (PPE) <span color={ColorsUI.sistema.Erro}>*</span>
            </Checkbox>
          </Flex>
          <Flex w="100%" justifyContent="space-between" alignContent="center" flexDir={!isMobile ? "row" : "column"} gap={gapUi.lg}>
            <ButtonUI customVariant="Secundário" onClick={Onreturn}>
              Cancelar
            </ButtonUI>
            <ButtonUI customVariant="Primário" icon="ArrowUpRight" iconPosition="right" type="submit">
              Próximo
            </ButtonUI>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
};