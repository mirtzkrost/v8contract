import ButtonUI from "@/components/Buttons/ButtonUI";
import { ContainerUI } from "@/components/Layout/ContainerUI"
import { TextUI } from "@/components/Texts/TextUI";
import { ColorsUI } from "@/Utilitarios/ColorUI";
import { textoXL2Bold, textoXLRegular } from "@/Utilitarios/fontSizeUI";
import { gapUi } from "@/Utilitarios/SizeUI";
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints";
import { Flex, Spinner, useToast } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom";
import { formHomeParams } from "../Home/Components/FormHome";
import { unmaskCpf } from "@/helpers/unMask";
import { fgtsQueries } from "@/api/fgts";
import { useEffect, useState } from "react";

export const Aguarde = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const toast = useToast();
    const navigate = useNavigate();
    const Onreturn = () => {
        navigate("/");
    };
    const Refresh = () => {
        window.location.reload();
    };

    const { clientData }: {
        clientData: formHomeParams
    } = location.state || {};

    const consultBalance = async (formData: formHomeParams) => {
        const documentNumber = unmaskCpf(formData.cpf);
        const data = await fgtsQueries.getBalance({ search: documentNumber, page: 1, limit: 10 });
        setLoading(false);
        const balance = data.data[0];
        if (!balance) {
            toast({
                title: "Erro na Consulta",
                description: "Saldo não encontrado",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            navigate("/")
        }

        if (balance!.status === "error") {
            toast({
                title: "Erro na Consulta",
                description: balance!.statusInfo,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            navigate("/semsaque")
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

    useEffect(() => {
        if (!clientData) {
            toast({
                title: "Erro na navegação",
                description: "Não foi possível acessar os dados necessários para esta página.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            navigate("/");
        }

        consultBalance(clientData);

        const interval = setInterval(() => {
            window.location.reload();

        }, 20000);

        return () => clearInterval(interval);
    }, []);

    const { currentBreakpoint } = useBreakpoints();
    const isMobile = ["base", "sm", "md"].includes(currentBreakpoint);

    return (
        <ContainerUI>
            <Flex flexDir="column" w="100%" maxW={isMobile ? "100%" : "620px"} gap={gapUi["6xl"]} justifyContent="center" alignItems="center">
                {loading ? <Spinner size="xl" /> :
                    <>
                        <TextUI sizeStyle={textoXL2Bold} color={ColorsUI.texto.Primario} textAlign="center" w="100%">
                            Aguarde enquanto analisamos seus dados.
                        </TextUI>
                        <TextUI sizeStyle={textoXLRegular} color={ColorsUI.texto.Secundario} textAlign="center" w="100%">
                            Nosso sistema está verificando seus dados e dentro de alguns minutos teremos todos os resultados do seu FGTS.
                        </TextUI>

                        <Flex
                            w="100%"
                            justifyContent="space-between"
                            alignContent="center"
                            flexDir={!isMobile ? "row" : "column"}
                            gap={gapUi.lg}
                        >
                            <ButtonUI customVariant="Secundário" onClick={Onreturn}>Retornar</ButtonUI>
                            <ButtonUI
                                customVariant="Primário"
                                onClick={Refresh}
                                icon="Refresh"
                                iconPosition="right"
                            >
                                Atualizar pagina
                            </ButtonUI>
                        </Flex>
                    </>
                }
            </Flex>
        </ContainerUI>
    )
}