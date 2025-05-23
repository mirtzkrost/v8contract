import { fgtsMutations } from "@/api/fgts";
import { createSimulation, TFgtsResponseBalanceData } from "@/api/fgts/response";
import ButtonUI from "@/components/Buttons/ButtonUI";
import IconUI from "@/components/Icons/Icon";
import { ContainerUI } from "@/components/Layout/ContainerUI"
import { LogoUI } from "@/components/Layout/LogoUI";
import { TextUI } from "@/components/Texts/TextUI";
import { formatCurrencyBRL } from "@/helpers/formatCurrency";
import { ColorsUI } from "@/Utilitarios/ColorUI";
import { textoLgMedium, textoMdMedium, textoSmMedium, textoXL2Bold, textoXLRegular, textoXsRegular } from "@/Utilitarios/fontSizeUI";
import { gapUi, paddingUi, radiusUi } from "@/Utilitarios/SizeUI"
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints";
import { Flex, Spinner, useToast } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { z } from "zod";
import { formHomeParams } from "../Home/Components/FormHome";
import { isAxiosError } from "axios";

export type simulationResponseType = z.infer<typeof createSimulation>;

export const Resumo = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const { currentBreakpoint } = useBreakpoints();
    const location = useLocation();
    const { balanceData, clientData }: {
        balanceData: TFgtsResponseBalanceData,
        clientData: formHomeParams
    } = location.state || {};
    const { mutateAsync } = useMutation(fgtsMutations.createSimulationFGTS);

    const isMobile = ["base", "sm", "md"].includes(currentBreakpoint);

    const [loading, setLoading] = useState(true);
    const [simulationResponse, setSimulationResponse] = useState<simulationResponseType>();

    const Onreturn = () => {
        navigate("/");
    };

    const OnContinue = () => {
        navigate("/dadosbase", {
            state: {
                simulationData: simulationResponse,
                clientData: clientData
            }
        });
    }

    useEffect(() => {
        if (balanceData) {
            const currentState = balanceData;
            const availableBalance = balanceData.amount;

            if (currentState.status === "success" && availableBalance > 0) {
                const selectedInstallments =
                    balanceData?.periods?.map((period) => ({
                        totalAmount: period.amount,
                        dueDate: period.dueDate,
                    })) || [];

                mutateAsync(
                    {
                        balanceId: balanceData?.id,
                        documentNumber: balanceData.documentNumber,
                        desiredInstallments: selectedInstallments,
                    },
                    {
                        onSuccess: (response) => {
                            setSimulationResponse(response);
                            setLoading(false);
                        }, onError: (error) => {
                            if (isAxiosError(error)) {
                                toast({
                                    title: "Erro na Consulta",
                                    description:
                                        error.response?.data.error?.message ||
                                        error.response?.data.error ||
                                        error.message,
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                                })
                                navigate("/");
                            }
                        }
                    }
                );
            }
        } else {
            navigate("/");
        }
    }, [balanceData, mutateAsync]);

    const handleSimulation = () => {
        OnContinue();
    };

    return (
        <ContainerUI>
            <Flex flexDir="column" w="100%" maxW={isMobile ? "100%" : "620px"} gap={gapUi["4xl"]}>
                <Flex flexDir="column" gap={gapUi.lg} w="100%" justifyContent="center" alignItems="center">
                    <LogoUI />
                    <Flex flexDir="column" gap={gapUi.md}>
                        <TextUI sizeStyle={textoXL2Bold} color={ColorsUI.texto.Primario} textAlign="left" w="100%">
                            Valor Disponível para Saque!
                        </TextUI>
                        <TextUI sizeStyle={textoXLRegular} color={ColorsUI.texto.Secundario} textAlign="left" w="100%">
                            Confira o total que você pode retirar no saque aniversário do FGTS e aproveite essa oportunidade.
                        </TextUI>
                    </Flex>
                </Flex>

                <Flex w='100%' borderRadius={radiusUi.md} border={`1px solid ${ColorsUI.bordas.Primario}`} backgroundColor={ColorsUI.card.Primario} direction='column' padding={paddingUi["2xl"]} gap={gapUi["4xl"]}>
                    {loading ?
                        <>
                            <Flex justifyContent="center" alignItems="center">
                                <Spinner />
                            </Flex>
                        </>
                        : (<>
                            <Flex flexDir='column' gap={gapUi["xl"]}>
                                <TextUI sizeStyle={textoLgMedium} color={ColorsUI.texto.Primario}>Resumo</TextUI>
                                <hr color={ColorsUI.bordas.Primario} />
                                <Flex w='100%' justifyContent='space-between'>
                                    <TextUI sizeStyle={textoSmMedium} color={ColorsUI.texto.Secundario}>Valor disponível para saque</TextUI>
                                    <TextUI sizeStyle={textoMdMedium} color={ColorsUI.texto.Primario}>{formatCurrencyBRL(simulationResponse?.availableBalance)}</TextUI>
                                </Flex>
                            </Flex>

                            <Flex gap={gapUi.md} padding={paddingUi.md} backgroundColor={ColorsUI.card.Secundario} borderRadius={radiusUi.sm}>
                                <IconUI icon="Info" color={ColorsUI.coresPrincipais.Primary} />
                                <TextUI sizeStyle={textoXsRegular} color={ColorsUI.texto.Secundario}>O valor de cada parcela será calculado com base no montante escolhido, acrescido de juros e IOF.</TextUI>
                            </Flex>
                        </>
                        )}
                </Flex>

                <Flex
                    w="100%"
                    justifyContent="space-between"
                    alignContent="center"
                    flexDir={!isMobile ? "row" : "column"}
                    gap={gapUi.lg}
                >
                    <ButtonUI customVariant="Secundário" onClick={Onreturn}>Retornar</ButtonUI>
                    <ButtonUI customVariant="Primário" disabled={loading} onClick={handleSimulation} icon="ArrowUpRight" iconPosition="right">Continuar</ButtonUI>
                </Flex>
            </Flex>
        </ContainerUI>
    );
};