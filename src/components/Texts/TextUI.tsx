import { Text, TextProps } from "@chakra-ui/react";
import { IFontesUiType } from "@/Utilitarios/fontSizeUI";

interface TextUIProps extends TextProps {
  sizeStyle?: IFontesUiType;
}

export const TextUI = ({ sizeStyle, ...props }: TextUIProps) => {
  return (
    <Text
      fontFamily={sizeStyle?.fontFamily}
      fontSize={sizeStyle?.fontSize?.toString()}
      fontWeight={sizeStyle?.fontWeight}
      lineHeight={sizeStyle?.lineHeight}
      {...props}
    />
  );
};