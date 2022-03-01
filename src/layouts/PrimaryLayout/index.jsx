import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

import * as S from "./styles";

const PrimaryLayout = () => {
  return (
    <>
      <Header />
      <S.MainContainer>
        <S.MainContent>
          <Outlet />
        </S.MainContent>
      </S.MainContainer>
      <Footer />
    </>
  );
};

export default PrimaryLayout;
