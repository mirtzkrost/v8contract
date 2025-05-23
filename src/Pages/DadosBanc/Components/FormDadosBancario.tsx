import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import ButtonUI from "@/components/Buttons/ButtonUI";
import InputUI from "@/components/Inputs/InputUI";
import { LogoUI } from "@/components/Layout/LogoUI";
import { TextUI } from "@/components/Texts/TextUI";
import { ColorsUI } from "@/Utilitarios/ColorUI";
import { textoXL2Bold, textoXLRegular } from "@/Utilitarios/fontSizeUI";
import { gapUi, paddingUi } from "@/Utilitarios/SizeUI";
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints";
import { formDadosBaseParams } from "@/Pages/DadosBase/Components/FormDadosBase";
import { simulationResponseType } from "@/Pages/Resumo/Resumo";
import { formHomeParams } from "@/Pages/Home/Components/FormHome";
import { banksQueries } from "@/api/bank";
import { TBanksData } from "@/api/bank/response";
import { useMutation } from "@tanstack/react-query";
import { fgtsMutations } from "@/api/fgts";
import { handleBirthDateChange } from "@/helpers/formatDate";
import { getDDD, unMaskPhone } from "@/helpers/unMask";
import { createProposal } from "@/api/fgts/response";
import { z } from "zod";
import { isAxiosError } from "axios";
import { env } from "@/env";

export type formDadosBancParams = {
    tipoDados: string;
    tipoChave: string;
    chavePix: string;
    tipoConta: string;
    numeroConta: string;
    digito: string;
    agencia: string;
    banco: string;
};

export type TCreateProposalResponse = z.infer<typeof createProposal>;

export const FormDadosBanc = () => {
    const { currentBreakpoint } = useBreakpoints();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const { mutateAsync } = useMutation(fgtsMutations.createFgtsProposal);
    const methods = useForm({
        defaultValues: {
            tipoDados: "",
            tipoChave: "",
            chavePix: "",
            tipoConta: "",
            numeroConta: "",
            digito: "",
            agencia: "",
            banco: "",
        },
    });
    const [bancos, setBancos] = useState<{ label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const { simulationData, clientData, dadosBase }: {
        simulationData: simulationResponseType,
        clientData: formHomeParams,
        dadosBase: formDadosBaseParams
    } = location.state || {};

    const isMobile = ["base", "sm", "md"].includes(currentBreakpoint);

    const { handleSubmit, setValue, watch } = methods;

    const tipoDados = watch("tipoDados");
    const tipoChave = watch("tipoChave");

    const handleBanks = async () => {
        const banks = await banksQueries.getBanks()
        const banksInputParams = banks.data.map((bank: TBanksData) => ({
            label: bank.name,
            value: bank.id,
        }))
        setBancos(banksInputParams)
    }

    useEffect(() => {  
        handleBanks()
    }, []);

    const handleNavigate = (path: string) => navigate(path);

    const renderChavePixInput = () => {
        const commonProps = {
            required: true,
            value: watch("chavePix"),
            onChange: (value: string) => setValue("chavePix", value),
        };

        switch (tipoChave) {
            case "cpf":
                return <InputUI {...commonProps} label="CPF" mask="cpf" icon="IdCard" />;
            case "email":
                return (
                    <InputUI
                        {...commonProps}
                        type="email"
                        label="Email"
                        mask="email"
                        icon="User"
                    />
                );
            case "celular":
                return (
                    <InputUI {...commonProps} label="Celular" mask="celularOuTelefonePix" icon="Phone" />
                );
            default:
                return null;
        }
    };

    const goToNextStep = (createProposalResponse: TCreateProposalResponse) => {
        navigate("/fidelizacaocompleta", {
            state: {
                createdProposal: createProposalResponse,
            },
        });
    }

    const onSubmit = (data: formDadosBancParams) => {
        setLoading(true);
        const paymentType = data.tipoDados === "dadosBancarios" ? "transfer" : "pix";

        const paymentData =
            paymentType === "transfer"
                ? {
                    bank: bancos.find((bank) => bank.value === data.banco)?.label,
                    agency: data.agencia,
                    account: data.numeroConta,
                    accountType: data.tipoConta === "corrente" ? "checking_account" : "saving_account",
                    digit: data.digito,
                    bankId: data.banco,
                }
                : { pix: data.chavePix };
        const operationData = {
            city: dadosBase.cidade,
            birthDate: handleBirthDateChange(clientData.dataNascimento),
            email: clientData.email,
            maritalStatus: dadosBase.estadoCivil,
            nationality: dadosBase.nacionalidade,
            motherName: dadosBase.nomeMae,
            name: clientData.nomeCompleto,
            neighborhood: dadosBase.bairro,
            personType: "natural",
            phoneCountryCode: "+55",
            phoneRegionCode: getDDD(clientData.celular),
            phone: unMaskPhone(clientData.celular),
            postalCode: dadosBase.cep.replace(/[^0-9]/g, ""),
            isPEP: dadosBase.ppe,
            state: dadosBase.estado,
            street: dadosBase.logradouro,
            complement: dadosBase.complemento,
            addressNumber: dadosBase.numero,
            payment: {
                type: paymentType,
                data: paymentData,
            },
            documentIdentificationNumber: clientData.cpf.replace(/[^0-9]/g, ""),
            fgtsProposalsPeriods: simulationData.installments,
            fgtsSimulationId: simulationData.id,
            individualDocumentNumber: clientData.cpf.replace(/[^0-9]/g, ""),
            qrCodeId: env.VITE_API_CONTRACT_LINK,
            formalizationLink: "",
        }

        mutateAsync(
            {
                ...operationData,
            },
            {
                onSuccess: (response) => {
                    setLoading(false);
                    goToNextStep(response);
                },
                onError: (error) => {
                    setLoading(false);
                    if (isAxiosError(error)) {
                        toast({
                            title: "Erro ao criar proposta",
                            description:
                                error.response?.data.error?.message ||
                                error.response?.data.error ||
                                "Entre em contato com o suporte",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                    } else {
                        toast({
                            title: "Erro ao criar proposta",
                            description: error.message,
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                },
            },
        );
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex
                    flexDir="column"
                    w="100%"
                    maxW={isMobile ? "100%" : "620px"}
                    gap={gapUi["4xl"]}
                    padding={paddingUi.lg}
                >
                    <Flex
                        flexDir="column"
                        gap={gapUi.lg}
                        w="100%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <LogoUI />
                        <Flex flexDir="column" gap={gapUi.md}>
                            <TextUI
                                sizeStyle={textoXL2Bold}
                                color={ColorsUI.texto.Primario}
                                textAlign="left"
                                w="100%"
                            >
                                Complete suas informações para continuar
                            </TextUI>
                            <TextUI
                                sizeStyle={textoXLRegular}
                                color={ColorsUI.texto.Secundario}
                                textAlign="left"
                                w="100%"
                            >
                                Estamos quase lá! Preencha os dados necessários abaixo para
                                finalizar sua solicitação de antecipação do FGTS. É rápido e seguro.
                            </TextUI>
                        </Flex>
                    </Flex>

                    <InputUI
                        required
                        label="Tipo de dados"
                        placeholder="Selecione o Tipo de Dados Bancários"
                        value={tipoDados}
                        onChange={(value) => setValue("tipoDados", value)}
                        type="select"
                        options={[
                            { label: "Dados bancarios", value: "dadosBancarios" },
                            { label: "PIX", value: "pix" },
                        ]}
                    />

                    {tipoDados === "dadosBancarios" && (
                        <Flex flexDir="column" w="100%" gap={gapUi.lg}>
                            <Flex
                                w="100%"
                                gap={gapUi.lg}
                                flexDir={isMobile ? "column" : "row"}
                            >
                                <InputUI
                                    required
                                    label="Tipo de conta"
                                    placeholder="Selecione o Tipo de Conta"
                                    value={watch("tipoConta")}
                                    onChange={(value) => setValue("tipoConta", value)}
                                    type="select"
                                    options={[
                                        { label: "Corrente", value: "corrente" },
                                        { label: "Poupança", value: "poupança" },
                                    ]}
                                />
                                <InputUI
                                    required
                                    label="Banco"
                                    value={watch("banco")}
                                    onChange={(value) => setValue("banco", value)}
                                    type="select"
                                    placeholder="Selecione o Banco"
                                    options={bancos}
                                />
                            </Flex>

                            <Flex
                                w="100%"
                                gap={gapUi.lg}
                                flexDir={isMobile ? "column" : "row"}
                            >
                                <InputUI
                                    required
                                    label="Número da conta"
                                    value={watch("numeroConta")}
                                    onChange={(value) => setValue("numeroConta", value)}
                                    type="text"
                                    icon="IdCard"
                                />
                                <InputUI
                                    required
                                    label="Dígito"
                                    value={watch("digito")}
                                    onChange={(value) => setValue("digito", value)}
                                    type="text"
                                    icon="IdCard"
                                />
                            </Flex>

                            <InputUI
                                type="text"
                                label="Agência"
                                value={watch("agencia")}
                                onChange={(value) => setValue("agencia", value)}
                                icon="IdCard"
                            />
                        </Flex>
                    )}

                    {tipoDados === "pix" && (
                        <Flex flexDir="column" w="100%" gap={gapUi["4xl"]}>
                            <InputUI
                                required
                                label="Tipo de chave"
                                placeholder="Selecione o Tipo de Chave"
                                value={tipoChave}
                                onChange={(value) => setValue("tipoChave", value)}
                                type="select"
                                options={[
                                    { label: "CPF", value: "cpf" },
                                    { label: "Email", value: "email" },
                                    { label: "Celular", value: "celular" },
                                ]}
                            />
                            {tipoChave && renderChavePixInput()}
                        </Flex>
                    )}

                    <Flex
                        w="100%"
                        justifyContent="space-between"
                        flexDir={isMobile ? "column" : "row"}
                        gap={gapUi.lg}
                    >
                        <ButtonUI customVariant="Secundário" onClick={() => handleNavigate("/dadosbase")}>
                            Retornar
                        </ButtonUI>
                        <ButtonUI
                            customVariant="Primário"
                            icon={loading ? undefined : "ArrowUpRight"}
                            iconPosition="right"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ?
                                <Spinner />
                                :
                                "Próximo"}
                        </ButtonUI>
                    </Flex>
                </Flex>
            </form>
        </FormProvider>
    );
};
