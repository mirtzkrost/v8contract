import { ChakraProvider } from "./ChakraProvider";
import { QueryProvider } from "./QueryProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </QueryProvider>
  );
};
