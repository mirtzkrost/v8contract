import ButtonUI from "@/components/Buttons/ButtonUI";

import { ContainerUI } from "@/components/Layout/ContainerUI";

import { TextUI } from "@/components/Texts/TextUI";
import { ColorsUI } from "@/Utilitarios/ColorUI";
import { textoXL2Bold, textoXLRegular, textoMdRegular } from "@/Utilitarios/fontSizeUI";
import { gapUi } from "@/Utilitarios/SizeUI";
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints";
import { Flex, Image } from "@chakra-ui/react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { TCreateProposalResponse } from "../DadosBanc/Components/FormDadosBancario";

export const FidelizacaoCompleta = () => {

    const { currentBreakpoint } = useBreakpoints();
    const isMobile = ["base", "sm", "md"].includes(currentBreakpoint);

    const location = useLocation();
    const { createdProposal }: {
        createdProposal: TCreateProposalResponse
    } = location.state || {};

    const navigate = useNavigate()
    const Onreturn = () => {
        navigate("/dadosbancarios");
    };
    const onSubmit = () => {
        redirect(createdProposal.formalizationLink)
    };

    return (
        <ContainerUI>
            <Flex flexDir="column" w="100%" maxW={isMobile ? "100%" : "620px"} gap={gapUi["4xl"]}>
                <Flex flexDir="column" gap={gapUi.md}>
                    <TextUI sizeStyle={textoXL2Bold} color={ColorsUI.texto.Primario} textAlign="left" w="100%">
                        Fidelização Concluída com Sucesso!
                    </TextUI>
                    <TextUI sizeStyle={textoXLRegular} color={ColorsUI.texto.Secundario} textAlign="left" w="100%">
                        Seu processo foi concluído com sucesso. Agora você pode aproveitar todos os benefícios do seu acordo.
                    </TextUI>
                </Flex>
                <Flex w="100%" maxW={isMobile ? "100%" : "620px"} gap={gapUi["4xl"]} justifyContent='center'>
                    <Image src="success.svg" alt="Sem Saque" />
                </Flex>
                <TextUI sizeStyle={textoMdRegular} color={ColorsUI.texto.Secundario} textAlign="left" w="100%">
                    Agora que sua fidelização foi concluída, você será redirecionado para a validação externa do seu processo. Fique atento às instruções na próxima tela para garantir que tudo esteja em ordem.
                </TextUI>
                <Flex
                    w="100%"
                    justifyContent="space-between"
                    alignContent="center"
                    flexDir={!isMobile ? "row" : "column"}
                    gap={gapUi.lg}
                >
                    <ButtonUI customVariant="Secundário" onClick={Onreturn}>Retornar</ButtonUI>
                    <a href={createdProposal.formalizationLink} target="_blank" rel="noreferrer">
                        <ButtonUI customVariant="Primário" icon="ArrowUpRight" iconPosition="right" onClick={onSubmit}>Continuar para Validação</ButtonUI>
                    </a>
                </Flex>
            </Flex>
        </ContainerUI>
    )
}