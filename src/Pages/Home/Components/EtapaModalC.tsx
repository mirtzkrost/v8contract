import { TextUI } from "@/components/Texts/TextUI"
import { ColorsUI } from "@/Utilitarios/ColorUI"
import { textoLgMedium, textoSmRegular} from "@/Utilitarios/fontSizeUI"
import { gapUi } from "@/Utilitarios/SizeUI"
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints"
import { Flex, Image } from "@chakra-ui/react"

export const EtapaModalC = () => {
    const { currentBreakpoint } = useBreakpoints();
    const isMobile = ["base", "sm", "md"].includes(currentBreakpoint);
  
    return (
      <Flex flexDir={isMobile ? "column" : "row"} gap={gapUi["6xl"]} alignItems="center" justifyContent="center">
        <Image src="EtapaC.svg" w={isMobile ? "100%" : "50%"} />
        <Flex gap={gapUi.lg} flexDir="column" w="100%" alignContent="center" justifyContent="center">
          <Flex flexDir="column" gap={gapUi.lg}>
            <TextUI sizeStyle={textoLgMedium} color={ColorsUI.texto.Primario}>
              Dê permissão ao banco para consulta!
            </TextUI>
            <TextUI sizeStyle={textoSmRegular} color={ColorsUI.texto.Secundario}>
              Autorize o banco a acessar seu saldo do FGTS para concluir a solicitação.
            </TextUI>
          </Flex>
          <Flex flexDir="column" gap={gapUi.lg}>
            <TextUI sizeStyle={textoSmRegular}>
              <span style={{ color: ColorsUI.coresPrincipais.Primary }}>✓</span> No menu do app FGTS, selecione “Autorizar bancos a consultarem seu FGTS”.
            </TextUI>
            <TextUI sizeStyle={textoSmRegular}>
              <span style={{ color: ColorsUI.coresPrincipais.Primary }}>✓</span> Clique em “Adicionar instituição”, busque por banco e confirme.
            </TextUI>
            <TextUI sizeStyle={textoSmRegular}>
              <span style={{ color: ColorsUI.coresPrincipais.Primary }}>✓</span> Garanta que a permissão está vinculada à “Modalidade Saque-Aniversário”.
            </TextUI>
          </Flex>
        </Flex>
      </Flex>
    );
  };