import { ChakraProvider as DefaultChakraProvider } from "@chakra-ui/react";

interface ChakraProviderProps {
  children: React.ReactNode;
}

export const ChakraProvider: React.FC<ChakraProviderProps> = ({ children }) => {
  return (
    <DefaultChakraProvider>
      {children}
    </DefaultChakraProvider>
  );
};
