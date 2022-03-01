import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: calc(100vh - 100px);
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const LoginContent = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1100px;
  width: 100%;
`;
