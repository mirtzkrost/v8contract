import ButtonUI from "@/components/Buttons/ButtonUI";
import { ContainerUI } from "@/components/Layout/ContainerUI"
import { TextUI } from "@/components/Texts/TextUI";
import { ColorsUI } from "@/Utilitarios/ColorUI";
import { textoXL2Bold, textoXLRegular } from "@/Utilitarios/fontSizeUI";
import { gapUi } from "@/Utilitarios/SizeUI";
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints";
import { Flex, Image } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

export const SemSaque = () => {

    const navigate = useNavigate();
    const Onreturn = () => {
    navigate("/");
};
const Link = () => {
    window.location.href = "https://www.caixa.gov.br/beneficios-trabalhador/fgts/saque-FGTS/Paginas/default.aspx";
};

    const { currentBreakpoint } = useBreakpoints();
    const isMobile = ["base", "sm", "md"].includes(currentBreakpoint);

    return (
        <ContainerUI>
            <Flex flexDir="column" w="100%" maxW={isMobile ? "100%" : "620px"} gap={gapUi["6xl"]}>
                <TextUI sizeStyle={textoXL2Bold} color={ColorsUI.texto.Primario} textAlign="center" w="100%">
                    Você Não Possui Valor Disponível!
                </TextUI>
                <Flex w="100%" maxW={isMobile ? "100%" : "620px"} gap={gapUi["4xl"]} justifyContent='center'>
                    <Image src="semSaque.svg" alt="Sem Saque" />
                </Flex>
                <TextUI sizeStyle={textoXLRegular} color={ColorsUI.texto.Secundario} textAlign="center" w="100%">
                    Não encontramos saldo elegível para retirada no saque aniversário. Confira seu extrato no app FGTS ou aguarde novas disponibilidades.
                </TextUI>

                <Flex
                    w="100%"
                    justifyContent="space-between"
                    alignContent="center"
                    flexDir={!isMobile ? "row" : "column"}
                    gap={gapUi.lg}
                >
                    <ButtonUI customVariant="Secundário" onClick={Link}>Saiba mais</ButtonUI>
                    <ButtonUI customVariant="Primário" onClick={Onreturn} icon="ArrowUpRight" iconPosition="right">Entendi, vou verificar depois</ButtonUI>
                </Flex>
            </Flex>
        </ContainerUI>
    )
}