import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Flex,
} from "@chakra-ui/react";

import { EtapaModalA } from './EtapaModalA';
import { EtapaModalC } from './EtapaModalC';
import { EtapaModalB } from './EtapaModalB';
import StepCircle from './StepCircle';
import { gapUi } from '@/Utilitarios/SizeUI';
import ButtonUI from '@/components/Buttons/ButtonUI';

interface DrawerMobileHelpProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  nextStep: () => void;
}

export const DrawerMobileHelp: React.FC<DrawerMobileHelpProps> = ({ isOpen, onClose, currentStep, nextStep }) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <EtapaModalA />;
      case 2:
        return <EtapaModalB />;
      case 3:
        return <EtapaModalC />;
      default:
        return <EtapaModalA />;
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="full" placement="bottom">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader textAlign="center">Ajuda</DrawerHeader>
        <DrawerBody>
          <Flex flexDir="column" gap={gapUi['2xl']} justifyContent="center" alignItems="center" w="100%" h="100%">
            {renderStepContent()}
            <StepCircle currentStep={currentStep} />
            <Flex w="100%" justifyContent="flex-end">
              <ButtonUI
                customVariant='Primário'
                onClick={nextStep}
              >
                {currentStep === 3 ? "Entendi!" : "Próximo"}
              </ButtonUI>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMobileHelp;