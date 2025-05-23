import { TextUI } from "@/components/Texts/TextUI";
import { ColorsUI } from "@/Utilitarios/ColorUI";
import { textoLgMedium, textoSmRegular, textoXsRegular } from "@/Utilitarios/fontSizeUI";
import { gapUi } from "@/Utilitarios/SizeUI";
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints";
import { Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EtapaModalA = () => {
  const { currentBreakpoint } = useBreakpoints();
  const isMobile = ["base", "sm", "md"].includes(currentBreakpoint);

  return (
    <Flex flexDir={isMobile ? "column" : "row"} gap={gapUi["6xl"]} alignItems="center" justifyContent="center">
      <Image src="EtapaA.svg" w={isMobile ? "100%" : "50%"} />
      <Flex gap={gapUi.lg} flexDir="column" w="100%" alignContent="center" justifyContent="center">
        <Flex flexDir="column" gap={gapUi.lg}>
          <TextUI sizeStyle={textoLgMedium} color={ColorsUI.texto.Primario}>
            Baixe o aplicativo do FGTS!
          </TextUI>
          <TextUI sizeStyle={textoSmRegular} color={ColorsUI.texto.Secundario}>
            Facilite sua experiência acessando a loja de aplicativos do seu celular e instalando o app oficial do FGTS.
          </TextUI>
        </Flex>
        <Flex flexDir="column" gap={gapUi.lg}>
          <TextUI sizeStyle={textoSmRegular}>
            <span style={{ color: ColorsUI.coresPrincipais.Primary }}>✓</span> Acesse sua loja de aplicativos (Google Play ou App Store).
          </TextUI>
          <TextUI sizeStyle={textoSmRegular}>
            <span style={{ color: ColorsUI.coresPrincipais.Primary }}>✓</span> Faça login ou crie uma conta, caso ainda não tenha.
          </TextUI>
        </Flex>
        <Flex flexDir="column" gap={gapUi.lg}>
          <TextUI sizeStyle={textoXsRegular}>
            Caso prefira, clique em uma das opções abaixo para ser redirecionado diretamente à loja de aplicativos do seu celular.
          </TextUI>
          <Flex justifyContent={isMobile ? "center" : "flex-start"} gap={gapUi.md}>
            <Link to="https://apps.apple.com/br/app/fgts/id1038441027">
              <Image src="appstore.svg" w="100px" />
            </Link>
            <Link to="https://play.google.com/store/apps/details?id=br.gov.caixa.fgts.trabalhador&hl=pt_BR&pli=1">
              <Image src="googleplay.svg" w="100px" />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
