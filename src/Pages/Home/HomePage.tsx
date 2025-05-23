
import { ContainerUI } from "../../components/Layout/ContainerUI";
import { Flex } from "@chakra-ui/react";
import { FormHome } from "./Components/FormHome";
import { MuralSvg } from "./Components/MuralSvg";
import { ColorsUI } from "@/Utilitarios/ColorUI";
import { gapUi, paddingUi } from "@/Utilitarios/SizeUI";
import { TextUI } from "@/components/Texts/TextUI";
import { textoMdRegular, textoXL2Bold, textoXLRegular } from "@/Utilitarios/fontSizeUI";
import { LogoUI } from "@/components/Layout/LogoUI";
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints";


export const Home: React.FC = () => {
  const { currentBreakpoint } = useBreakpoints()
  const isMobile = ['base', 'sm', 'md'].includes(currentBreakpoint)

  return (
    <ContainerUI>
      {
        !isMobile ?
          <Flex w='100%' h='100%' padding={paddingUi["4xl"]}>
            <MuralSvg />
          </Flex> :
          <></>
      }

      <Flex w='100%' padding={paddingUi["xl"]} justifyContent='center' flexDir='column' gap={gapUi["3xl"]} h='100%'>
        <Flex w='100%' flexDir='column' gap={isMobile ? gapUi.md : gapUi["xl"]} alignItems='center'>
          <LogoUI />
          <TextUI sizeStyle={textoXL2Bold} color={ColorsUI.texto.Primario} textAlign='left' w='100%'>
            Antecipe seu FGTS com facilidade!
          </TextUI>
          <TextUI sizeStyle={textoXLRegular} color={ColorsUI.texto.Secundario} textAlign='left' w='100%'>
            Antecipe seu saldo de forma rápida e segura, sem burocracia, e aproveite as oportunidades que esperam por você.
          </TextUI>
        </Flex>

        <Flex flexDir='column' w='100%' gap={gapUi.lg}>
          <TextUI sizeStyle={textoMdRegular}><span color={ColorsUI.coresPrincipais.Primary}>✓</span> Aprovação em até 24 horas</TextUI>
          <TextUI sizeStyle={textoMdRegular}><span color={ColorsUI.coresPrincipais.Primary}>✓</span> Processo 100% digital, rápido e seguro.</TextUI>
          <TextUI sizeStyle={textoMdRegular}><span color={ColorsUI.coresPrincipais.Primary}>✓</span> Melhores taxas do mercado</TextUI>
        </Flex>
        <FormHome />
      </Flex>
    </ContainerUI>
  );
};