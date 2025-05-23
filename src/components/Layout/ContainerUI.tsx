import { ColorsUI } from "../../Utilitarios/ColorUI";
import React from "react";
import { styled } from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${ColorsUI.background.Primario};
`;

type ContainerUIProps = {
  children: React.ReactNode;
};

export const ContainerUI: React.FC<ContainerUIProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};