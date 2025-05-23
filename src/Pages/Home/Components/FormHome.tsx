import { useEffect, useState } from "react";
import InputUI from "@/components/Inputs/InputUI";
import ButtonUI from "../../../components/Buttons/ButtonUI";
import { ColorsUI } from "../../../Utilitarios/ColorUI";
import { gapUi } from "../../../Utilitarios/SizeUI";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { ModalHelp } from "./ModalHelp";
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints";
import DrawerMobileHelp from "./DrawerMobileHelp";
import { useMutation } from "@tanstack/react-query";
import { fgtsMutations, fgtsQueries } from "@/api/fgts";
import { handleErrorLabel } from "@/helpers/handlerErrors";
import { getDDD, unmaskCpf, unMaskPhone } from "@/helpers/unMask";
import { useNavigate } from "react-router-dom";
import { cpf } from "cpf-cnpj-validator";
import { isAxiosError } from "axios";

export interface formHomeParams {
  celular: string
  cpf: string
  dataNascimento: string
  email: string
  nomeCompleto: string
}

export const FormHome = () => {
  const { currentBreakpoint } = useBreakpoints();
  const isMobile = ['base', 'sm', 'md'].includes(currentBreakpoint);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm({
    defaultValues: {
      nomeCompleto: "",
      email: "",
      cpf: "",
      dataNascimento: "",
      celular: "",
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  useEffect(() => {
    const cachedData = localStorage.getItem('formHomeData');
    if (cachedData) {
      methods.reset(JSON.parse(cachedData));
    }
  }, [methods]);

  const cacheData = (data: formHomeParams) => {
    localStorage.setItem("formHomeData", JSON.stringify(data));
  }

  const { mutateAsync } = useMutation(fgtsMutations.createBalance);

  const consultBalance = async (formData: formHomeParams) => {
    const documentNumber = unmaskCpf(formData.cpf);
    const data = await fgtsQueries.getBalance({ search: documentNumber, page: 1, limit: 10 });
    const balance = data.data[0];
    if (!balance) {
      toast({
        title: "Erro na Consulta",
        description: "Saldo não encontrado",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }

    if (balance!.status === "error") {
      toast({
        title: "Erro na Consulta",
        description: balance!.statusInfo,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }

    if (
      balance!.status === "pending"
    ) {
      navigate("/aguarde", {
        state: {
          clientData: formData
        }
      })
    }

    if (
      (balance!.status === "completed" && balance!.amount === 0)
    ) {
      navigate("/semsaque")
    }

    if (balance!.status === "success" && balance!.amount > 0) {
      navigate("/resumo", {
        state: {
          balanceData: balance,
          clientData: formData
        }
      })
    }
  }

  const validateData = (
    data: formHomeParams,
  ) => {
    try {
      // Validação de CPF
      if (!cpf.isValid(data.cpf.replace(/[^0-9]/g, ""))) {
        throw new Error("CPF inválido");
      }
      // Validação de nome
      if (data.nomeCompleto.match(/\s{2,}/)) {
        throw new Error(
          "Nome possui exesso de espaçamentos",
        );
      }
      if (!/^[a-zA-ZçÇ\s]*$/.test(data.nomeCompleto)) {
        throw new Error(
          "Nome deve conter apenas letras sem possuir acentos",
        );
      }
      // Validação de email
      if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
        throw new Error("O email informado é inválido");
      }
      // Validação de celular
      if (!/^9\d{8}$/.test(unMaskPhone(data.celular))) {
        throw new Error("O telefone informado é inválido");
      }
      if (!/^[1-9]{2}$/.test(getDDD(data.celular))) {
        throw new Error("O ddd do telefone informado é inválido");
      }
      
      // Validação de Idade
      const birthDate = data.dataNascimento.split("/");
      const day = parseInt(birthDate[0], 10);
      const month = parseInt(birthDate[1], 10) - 1;
      const year = parseInt(birthDate[2], 10);
      
      const birth = new Date(year, month, day);
      const today = new Date();
      
      if (birth.getDate() !== day || birth.getMonth() !== month || birth.getFullYear() !== year) {
        throw new Error("Data de nascimento inválida");
      }
  
      const age = today.getFullYear() - birth.getFullYear();
      const ageMonthDiff = today.getMonth() - birth.getMonth();
      const ageDayDiff = today.getDate() - birth.getDate();
  
      if (age < 18 || age > 69 || (age === 18 && (ageMonthDiff < 0 || (ageMonthDiff === 0 && ageDayDiff < 0)))) {
        throw new Error("Idade do cliente deve estar entre 18 e 69 anos");
      }
  
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Erro na Consulta",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        throw error;
      }
    }
  }

  const createBalance = async (data: formHomeParams) => {
    const documentNumber = unmaskCpf(data.cpf);
    mutateAsync(
      { documentNumber: documentNumber },
      {
        onSuccess: async () => {
          await consultBalance(data);
          setLoading(false);
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            const errorMessage = handleErrorLabel(
              error?.response?.data.error || "Erro"
            );

            toast({
              title: "Erro na Consulta",
              description: errorMessage,
              status: "error",
              duration: 5000,
              isClosable: true,
            })

          }
          setLoading(false);
        },
      }
    )
  }

  const onSubmit = async (data: formHomeParams) => {
    validateData(data);
    setLoading(true);
    try {
      await cacheData(data);
      await createBalance(data);
    } catch (error) {
      console.error("Erro ao enviar dados do formulário:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      closeModal();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          backgroundColor={ColorsUI.background.Primario}
          flexDir="column"
          gap={gapUi["2xl"]}
        >
          <Flex w="100%" flexDir="column" gap={gapUi["xl"]}>
            <InputUI
              required
              label="Nome Completo"
              value={watch("nomeCompleto")}
              onChange={(value) => setValue("nomeCompleto", value)}
              type="text"
              icon="User"
            />
            <Flex gap={gapUi["md"]}>
              <InputUI
                required
                label="Email"
                value={watch("email")}
                onChange={(value) => setValue("email", value)}
                type="email"
                mask="email"
                icon="User"
              />
              <InputUI
                required
                label="CPF"
                value={watch("cpf")}
                onChange={(value) => setValue("cpf", value)}
                type="text"
                mask="cpf"
                icon="IdCard"
              />
            </Flex>
            <Flex gap={gapUi["md"]}>
              <InputUI
                required
                label="Data de nascimento"
                value={watch("dataNascimento")}
                onChange={(value) => setValue("dataNascimento", value)}
                type="text"
                mask="DD/MM/YYYY"
                icon="Calendar"
              />
              <InputUI
                required
                label="Celular"
                value={watch("celular")}
                onChange={(value) => setValue("celular", value)}
                type="text"
                mask="celular"
                icon="Phone"
              />
            </Flex>
          </Flex>

          <Flex
            w="100%"
            justifyContent="space-between"
            alignContent="center"
            flexDir={!isMobile ? "row" : "column"}
            gap={gapUi.lg}
          >
            <ButtonUI customVariant="Secundário" onClick={openModal}>
              Precisa de ajuda?
            </ButtonUI>
            <ButtonUI
              customVariant="Primário"
              icon={loading ? undefined : "ArrowUpRight"}
              iconPosition="right"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : 'Consultar'}
            </ButtonUI>
          </Flex>
        </Flex>
      </form>

      {isMobile ? (
        <DrawerMobileHelp
          isOpen={isModalOpen}
          onClose={closeModal}
          currentStep={currentStep}
          nextStep={nextStep}
        />
      ) : (
        <ModalHelp
          isOpen={isModalOpen}
          onClose={closeModal}
          currentStep={currentStep}
          nextStep={nextStep}
        />
      )}
    </FormProvider>
  );
};
