import { TextUI } from "@/components/Texts/TextUI"
import { ColorsUI } from "@/Utilitarios/ColorUI"
import { textoLgMedium, textoSmRegular} from "@/Utilitarios/fontSizeUI"
import { gapUi } from "@/Utilitarios/SizeUI"
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints"
import { Flex, Image } from "@chakra-ui/react"

export const EtapaModalB = () => {
    const { currentBreakpoint } = useBreakpoints();
    const isMobile = ["base", "sm", "md"].includes(currentBreakpoint);
  
    return (
      <Flex flexDir={isMobile ? "column" : "row"} gap={gapUi["6xl"]} alignItems="center" justifyContent="center">
       <Image src="EtapaB.svg"w={isMobile ? "100%" : "50%"} />
        <Flex gap={gapUi.lg} flexDir="column" w="100%" alignContent="center" justifyContent="center">
          <Flex flexDir="column" gap={gapUi.lg}>
            <TextUI sizeStyle={textoLgMedium} color={ColorsUI.texto.Primario}>
              Habilite o Saque-Aniversário!
            </TextUI>
            <TextUI sizeStyle={textoSmRegular} color={ColorsUI.texto.Secundario}>
              No aplicativo do FGTS, ative a modalidade Saque-Aniversário para aproveitar seus benefícios.
            </TextUI>
          </Flex>
          <Flex flexDir="column" gap={gapUi.lg}>
            <TextUI sizeStyle={textoSmRegular}>
              <span style={{ color: ColorsUI.coresPrincipais.Primary }}>✓</span> Toque na opção “Saque-Aniversário” no menu do app.
            </TextUI>
            <TextUI sizeStyle={textoSmRegular}>
              <span style={{ color: ColorsUI.coresPrincipais.Primary }}>✓</span> Clique em “Optar pelo Saque-Aniversário” e confirme.
            </TextUI>
          </Flex>
        </Flex>
      </Flex>
    );
  };