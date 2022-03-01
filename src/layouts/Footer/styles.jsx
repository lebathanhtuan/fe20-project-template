import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.gray2};
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  max-width: 1100px;
  width: 100%;
`;
