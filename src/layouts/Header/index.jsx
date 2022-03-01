import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown, Button, Space, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { ROUTERS } from "../../constants/routers";
import { logoutAction } from "../../redux/actions";

import * as S from "./styles";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { cartList } = useSelector((state) => state.cartReducer);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logoutAction());
  };

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <div>Brand</div>
        <S.HeaderMenu onClick={() => navigate(ROUTERS.PRODUCTS)}>
          Danh sách sản phẩm
        </S.HeaderMenu>
        <Space size={32}>
          <Badge count={cartList.data.length} size="small">
            <Button
              type="text"
              onClick={() => navigate(ROUTERS.CART)}
              icon={<ShoppingCartOutlined style={{ color: "white" }} />}
            ></Button>
          </Badge>
          {userInfo.data.id ? (
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <Menu.Item>Thông tin cá nhân</Menu.Item>
                  <Menu.Item onClick={() => handleLogout()}>
                    Đăng xuất
                  </Menu.Item>
                </Menu>
              }
            >
              <div>{userInfo.data.fullName}</div>
            </Dropdown>
          ) : (
            <Button onClick={() => navigate(ROUTERS.LOGIN)}>Đăng nhập</Button>
          )}
        </Space>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default Header;
