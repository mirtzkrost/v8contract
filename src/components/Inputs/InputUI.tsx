import React, { useState, useEffect } from "react";
import { Box, Input, Select, Text, Flex } from "@chakra-ui/react";
import styled from "styled-components";
import { applyMask, MaskType } from "../../Utilitarios/inputMasks";
import { paddingUi, radiusUi } from "../../Utilitarios/SizeUI";
import { ColorsUI, CorErro } from "../../Utilitarios/ColorUI";
import { textoSmRegular, textoXsRegular } from "@/Utilitarios/fontSizeUI";
import IconUI, { IconName } from "../Icons/Icon";

// Props
interface InputUIProps {
  label: string;
  type?: "text" | "email" | "password" | "select" | "number";
  options?: { label: string; value: string }[];
  mask?: MaskType;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  icon?: IconName;
  placeholder?: string;
}

// Estilização com styled-components
const StyledInputWrapper = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledLabel = styled(Text)<{ isFocused: boolean; hasValue: boolean }>`
  color: ${ColorsUI.input.Label};
  font-size: ${textoSmRegular.fontSize};
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1;
  padding: 0 0.5rem;
  background: ${`linear-gradient(to bottom, ${ColorsUI.input.Background}, ${ColorsUI.background.Primario})`};
  border-radius: ${radiusUi.sm};
  height: auto;
  width: auto;

  ${(props) =>
    (props.isFocused || props.hasValue) &&
    `top: -0.1rem;
     z-index: 4;
     font-size: 0.75rem;
     font-weight: 600;
     color: ${ColorsUI.coresPrincipais.Secondary};
    `}
`;

const StyledErrorMessage = styled(Text)`
  color: ${CorErro};
  font-size: ${textoXsRegular.fontSize};
  margin-top: 4px;
`;

const StyledSelectWrapper = styled(Box)`
  position: relative;
  width: 100%;
  color: ${ColorsUI.input.Label};
`;

// Componente principal
const InputUI: React.FC<InputUIProps> = ({
  label,
  type = "text",
  options = [],
  mask,
  value,
  onChange,
  error = "",
  required = false,
  icon,
  placeholder = "Selecione...", // Valor padrão do placeholder
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value.length > 0);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const rawValue = e.target.value;
    const maskedValue = mask ? applyMask(rawValue, mask) : rawValue;
    onChange(maskedValue);
  };

  return (
    <StyledInputWrapper>
      {type !== "select" && (
        <StyledLabel isFocused={isFocused} hasValue={hasValue}>
          {label} {required && "*"}
        </StyledLabel>
      )}
      {type === "select" ? (
        <StyledSelectWrapper>
          <Select
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            bg={ColorsUI.input.Background}
            borderColor={error ? CorErro : ColorsUI.input.Borda}
            borderRadius={radiusUi.sm}
            isRequired={required}
            placeholder={placeholder} // Aqui vai o placeholder
            {...props}
            sx={{
              fontSize: "12px", 
              "::placeholder": {
                fontSize: "12px",
              },
            }}
          >
              {placeholder}
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </StyledSelectWrapper>
      ) : (
        <Flex align="center" position="relative">
          {icon && (
            <Box position="absolute" right="4" zIndex="1" color={ColorsUI.icon.Secundario}>
              <IconUI icon={icon} size={18} />
            </Box>
          )}
          <Input
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            bg={ColorsUI.input.Background}
            borderColor={error ? CorErro : ColorsUI.input.Borda}
            borderRadius={radiusUi.sm}
            paddingLeft={icon ? "2.5rem" : paddingUi.sm}
            padding={paddingUi.sm}
            isRequired={required}
            {...props}
          />
        </Flex>
      )}
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
    </StyledInputWrapper>
  );
};

export default InputUI;
