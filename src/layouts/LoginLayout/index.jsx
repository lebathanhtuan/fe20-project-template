import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import Footer from "../Footer";

import { ROUTERS } from "../../constants/routers";

import * as S from "./styles";

const LoginLayout = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) return <Navigate to={ROUTERS.HOME} />;
  return (
    <>
      <S.LoginContainer>
        <S.LoginContent>
          <Outlet />
        </S.LoginContent>
      </S.LoginContainer>
      <Footer />
    </>
  );
};

export default LoginLayout;
