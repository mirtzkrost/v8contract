
import { Flex, Modal, ModalBody, ModalContent, ModalOverlay} from "@chakra-ui/react";
import { EtapaModalA } from "./EtapaModalA";
import ButtonUI from "@/components/Buttons/ButtonUI";
import { EtapaModalB } from "./EtapaModalB";
import { EtapaModalC } from "./EtapaModalC";
import StepCircle from "./StepCircle";
import { gapUi, paddingUi } from "@/Utilitarios/SizeUI";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentStep: number;
    nextStep: () => void;
  }
  
  export const ModalHelp: React.FC<ModalProps> = ({ isOpen, onClose, currentStep, nextStep }) => {
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
      <Modal isOpen={isOpen} onClose={onClose} size='4xl' isCentered>
        <ModalOverlay />
        <ModalContent padding={paddingUi.lg}>
          <ModalBody>
            <Flex flexDir="column" gap={gapUi["2xl"]} justifyContent='center' alignContent='center' width='100%' h='100%'>
              {renderStepContent()}
              <StepCircle currentStep={currentStep} />
              <Flex w='100%' justifyContent='end'>
                <ButtonUI customVariant="Primário" onClick={nextStep}>
                  {currentStep === 3 ? "Entendi!" : "Próximo"}
                </ButtonUI>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };