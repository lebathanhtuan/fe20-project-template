import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import PrimaryLayout from "./layouts/PrimaryLayout";
import LoginLayout from "./layouts/LoginLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ROUTERS } from "./constants/routers";
import themes from "./constants/themes";

import { getUserInfoAction } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedUserData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodedUserData.sub }));
    }
  }, []);

  return (
    <ThemeProvider theme={themes}>
      <Routes>
        <Route element={<PrimaryLayout />}>
          <Route path={ROUTERS.HOME} element={<HomePage />} />
          <Route path={ROUTERS.PRODUCTS} element={<ProductListPage />} />
          <Route
            path={ROUTERS.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTERS.CART} element={<CartPage />} />
          <Route path={ROUTERS.CHECKOUT} element={<CheckoutPage />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path={ROUTERS.LOGIN} element={<LoginPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
