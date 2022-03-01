import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

import { ROUTERS } from "../../constants/routers";
import { registerAction, loginAction } from "../../redux/actions";

import * as S from "./styles";

const LoginPage = () => {
  const [activeKey, setActiveKey] = useState("login");

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loginData, registerData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (loginData.errors) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.errors],
        },
      ]);
    }
  }, [loginData.errors]);

  useEffect(() => {
    if (registerData.errors) {
      registerForm.setFields([
        {
          name: "email",
          errors: [registerData.errors],
        },
      ]);
    }
  }, [registerData.errors]);

  const handleRegister = (values) => {
    dispatch(
      registerAction({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        },
        callback: {
          redirectLogin: () => setActiveKey("login"),
        },
      })
    );
  };

  const handleLogin = (values) => {
    dispatch(
      loginAction({
        data: {
          email: values.email,
          password: values.password,
        },
        callback: {
          redirectHome: () => navigate(ROUTERS.HOME),
        },
      })
    );
  };

  return (
    <S.LoginContainer>
      <S.LoginForm>
        <Tabs
          size="large"
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
        >
          <Tabs.TabPane tab="Đăng nhập" key="login">
            <Form
              form={loginForm}
              name="loginForm"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={(values) => handleLogin(values)}
              autoComplete="off"
              style={{ padding: "0 2px" }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loginData.loading}
              >
                Đăng nhập
              </Button>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đăng ký" key="register">
            <Form
              form={registerForm}
              name="registerForm"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={(values) => handleRegister(values)}
              autoComplete="off"
              style={{ padding: "0 2px" }}
            >
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  { required: true, message: "Please input your fullName!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                block
                loading={registerData.loading}
              >
                Đăng ký
              </Button>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </S.LoginForm>
    </S.LoginContainer>
  );
};

export default LoginPage;
