import React, { useEffect } from "react";
import { Row, Col, Table, Button, Form, Card, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  paymentOrderAction,
} from "../../redux/actions";
import { ROUTERS } from "../../constants/routers";
import { SHIP_FEE } from "../../constants/cart";

const CheckoutPage = () => {
  const [checkoutInfoForm] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { cartList } = useSelector((state) => state.cartReducer);
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.locationReducer
  );

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

  useEffect(() => {
    if (userInfo.data.id) checkoutInfoForm.resetFields();
  }, [userInfo]);

  let provisionalPrice = 0;
  const shipFee = cartList.data.length ? SHIP_FEE : 0;

  const handleOrder = (values) => {
    dispatch(
      paymentOrderAction({
        data: {
          userId: userInfo.data.id,
          products: [...cartList.data],
          totalPrice: provisionalPrice + SHIP_FEE,
          info: {
            ...values,
            city:
              cityList.data.find((city) => city.code === values.city)?.name ||
              "",
            district:
              districtList.data.find(
                (district) => district.code === values.district
              )?.name || "",
            ward:
              wardList.data.find((ward) => ward.code === values.ward)?.name ||
              "",
          },
          payment: {},
        },
        callback: {
          goToHome: () => navigate(ROUTERS.HOME),
        },
      })
    );
  };

  const tableData = cartList.data.map((item) => {
    const newPrice = item.price + (item.option.plusPrice || 0);
    provisionalPrice = provisionalPrice + newPrice * item.quantity;
    return {
      ...item,
      totalPrice: item.price + (item.option.plusPrice || 0),
    };
  });

  const tableColumns = [
    {
      title: "T??n s???n ph???m",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div>
          <h4>{record.name}</h4>
          {record.option.name && <h5>{record.option.name}</h5>}
        </div>
      ),
    },
    {
      title: "????n gi??",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        const newPrice = record.price + (record.option.plusPrice || 0);
        return `${newPrice.toLocaleString()}???`;
      },
    },
    {
      title: "S??? l?????ng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Th??nh ti???n",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) => {
        const newPrice = record.price + (record.option.plusPrice || 0);
        return `${(newPrice * record.quantity).toLocaleString()}???`;
      },
    },
  ];

  const renderCityOptions = () => {
    return cityList.data.map((cityItem) => {
      return (
        <Select.Option key={cityItem.id} value={cityItem.code}>
          {cityItem.name}
        </Select.Option>
      );
    });
  };

  const renderDistrictOptions = () => {
    return districtList.data.map((districtItem) => {
      return (
        <Select.Option key={districtItem.id} value={districtItem.code}>
          {districtItem.name}
        </Select.Option>
      );
    });
  };

  const renderWardOptions = () => {
    return wardList.data.map((wardItem) => {
      return (
        <Select.Option key={wardItem.id} value={wardItem.code}>
          {wardItem.name}
        </Select.Option>
      );
    });
  };

  return (
    <div>
      CheckoutPage
      <Card size="small" title="Th??ng tin ????n h??ng">
        <Table
          columns={tableColumns}
          dataSource={tableData}
          pagination={false}
        />
        <div style={{ maxWidth: 300, width: "100%", marginLeft: "auto" }}>
          <Row justify="space-between">
            <h4>T???m t??nh</h4>
            <h4>{provisionalPrice.toLocaleString()}???</h4>
          </Row>
          <Row justify="space-between">
            <h4>Ph?? v???n chuy???n</h4>
            <h4>{shipFee.toLocaleString()}???</h4>
          </Row>
          <Row justify="space-between">
            <h4>Gi???m gi??</h4>
            <h4>0???</h4>
          </Row>
          <Row justify="space-between">
            <h4>T???ng ti???n</h4>
            <h4>{(provisionalPrice + shipFee - 0).toLocaleString()}???</h4>
          </Row>
        </div>
      </Card>
      <Card size="small" title="Th??ng tin c?? nh??n" style={{ marginTop: 24 }}>
        <Form
          form={checkoutInfoForm}
          name="checkoutInfo"
          layout="vertical"
          initialValues={{
            name: userInfo.data.fullName,
            email: userInfo.data.email,
          }}
          onFinish={(values) => handleOrder(values)}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="T??n kh??ch h??ng"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="S??? ??i???n tho???i"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="T???nh/Th??nh ph???"
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <Select
                  allowClear
                  onChange={(value) => {
                    dispatch(getDistrictListAction({ cityCode: value }));
                    checkoutInfoForm.setFieldsValue({ district: undefined });
                    checkoutInfoForm.setFieldsValue({ ward: undefined });
                  }}
                >
                  {renderCityOptions()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Qu???n/Huy???n"
                name="district"
                rules={[
                  { required: true, message: "Please input your district!" },
                ]}
              >
                <Select
                  allowClear
                  onChange={(value) => {
                    dispatch(getWardListAction({ districtCode: value }));
                    checkoutInfoForm.setFieldsValue({ ward: undefined });
                  }}
                >
                  {renderDistrictOptions()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Ph?????ng/X??"
                name="ward"
                rules={[{ required: true, message: "Please input your ward!" }]}
              >
                <Select allowClear>{renderWardOptions()}</Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="?????a ch??? c??? th???"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Row justify="space-between">
        <Button>Tr??? l???i</Button>
        <Button type="primary" onClick={() => checkoutInfoForm.submit()}>
          Thanh to??n
        </Button>
      </Row>
    </div>
  );
};

export default CheckoutPage;
