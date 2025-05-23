import { ColorsUI } from "../../Utilitarios/ColorUI";
import { borderRadiusFullUi } from "../../Utilitarios/SizeUI";
import { Button, ButtonProps } from "@chakra-ui/react";
import { EscalaUI } from "../../Utilitarios/ColorUI";
import IconUI from "../Icons/Icon";  // Importando o IconUI
import { textoSmRegular } from "@/Utilitarios/fontSizeUI";
import { useBreakpoints } from "@/Utilitarios/UseBreakingPoints";

type CustomVariantType = "Primário" | "Secundário";

interface ButtonUIProps extends ButtonProps {
  customVariant: CustomVariantType; // Renomeada para evitar conflito com `variant`
  icon?: "ArrowUpRight" | "Calendar" | "Check" | "ChevronDown" | "ChevronUp" | "CreditCard" | "IdCard" | "MapPin" | "Minus" | "Phone" | "Plus" | "User" | "Refresh"; // Tipagem mais restrita para os ícones
  iconPosition?: "left" | "right"; // Posição do ícone em relação ao texto
}

export const ButtonUI = ({
  customVariant,
  children,
  icon,
  iconPosition = "left",
  ...rest
}: ButtonUIProps) => {

  const { currentBreakpoint } = useBreakpoints();
  const isMobile = ['base', 'sm', 'md'].includes(currentBreakpoint);

  const style: ButtonProps = {
    borderRadius: borderRadiusFullUi, // Estilo compartilhado
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px", // Espaçamento entre o ícone e o texto
    padding: "12px 20px",
    maxHeight: "40px",
    width: isMobile ? "100%" : "auto",
    maxWidth: isMobile ? "100%" : "auto",
    minWidth: isMobile ? "100%" : "150px",
    transition: "background-color 0.2s ease, color 0.2s ease", // Transição suave para hover/active
    _hover: {},
    _active: {},
    _disabled: {}, // Adiciona estilos para estado desabilitado
  };


  switch (customVariant) {
    case "Primário":
      style.backgroundColor = ColorsUI.coresPrincipais.Primary;
      style.color = ColorsUI.texto.Terciario;

      style._hover = {
        backgroundColor: EscalaUI.primary[800],
      };

      style._active = {
        backgroundColor: EscalaUI.primary[900],
      };

      style._disabled = {
        backgroundColor: EscalaUI.gray[100],
        color: EscalaUI.gray[300],
        cursor: "not-allowed", // Para indicar visualmente que o botão está desabilitado
      };
      break;

    case "Secundário":
      style.backgroundColor = "transparent";
      style.border = `1px solid ${ColorsUI.bordas.Primario}`;
      style.color = ColorsUI.texto.Secundario;
      style.fontSize = textoSmRegular.fontSize

      style._hover = {
        backgroundColor: EscalaUI.white[200],
        color: ColorsUI.texto.Primario,
      };

      style._active = {
        backgroundColor: EscalaUI.white[300],
        color: ColorsUI.texto.Primario,
      };

      style._disabled = {
        backgroundColor: EscalaUI.gray[100],
        color: EscalaUI.gray[300],
        cursor: "not-allowed",
      };
      break;

    default:
      console.warn(`A variante "${customVariant}" não foi reconhecida.`);
      break;
  }

  return (
    <Button {...style} {...rest}>
      {icon && iconPosition === "left" && <span>
        <IconUI icon={icon} />
      </span>}
      {children}
      {icon && iconPosition === "right" && <span>
        <IconUI icon={icon} />
      </span>}
    </Button>
  );
};

export default ButtonUI;
