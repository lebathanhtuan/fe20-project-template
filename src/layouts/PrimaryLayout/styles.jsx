import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: calc(100vh - 156px);
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MainContent = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1100px;
  width: 100%;
`;
