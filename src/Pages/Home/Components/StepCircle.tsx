import { EscalaUI } from "@/Utilitarios/ColorUI";
import { gapUi, radiusUi } from "@/Utilitarios/SizeUI";
import { Box, Flex } from "@chakra-ui/react";

const StepCircle = ({ currentStep }: { currentStep: number }) => {
    return (
      <Flex gap={gapUi.sm} justifyContent='center'>
        {[1, 2, 3].map((step) => (
          <Box
            key={step}
            borderRadius={radiusUi.full}
            w="8px"
            h="8px"
            bgColor={currentStep >= step ? EscalaUI.primary[600] : EscalaUI.gray[200]}
            transition="background-color 0.3s ease"
          />
        ))}
      </Flex>
    );
  };
  
  export default StepCircle;