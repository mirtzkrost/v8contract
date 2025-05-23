import { Image, ImageProps } from "@chakra-ui/react";

interface LogoUIProps extends ImageProps {
  width?: string | number;
  height?: string | number;
}

export const LogoUI = ({ width = "100%", height = "100%", ...props  }: LogoUIProps) => {
  return (
    <Image
      src="Logo.svg"
      maxH="70px"
      maxW="70px"
      w={width}
      h={height}
      {...props}
    />
  );
};