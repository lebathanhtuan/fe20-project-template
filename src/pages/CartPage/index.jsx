import React from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Popconfirm,
  Card,
  InputNumber,
  Modal,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  changeQuantityAction,
  deleteCartItemAction,
} from "../../redux/actions";
import { ROUTERS } from "../../constants/routers";
import { SHIP_FEE } from "../../constants/cart";

const CartPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { cartList } = useSelector((state) => state.cartReducer);

  let provisionalPrice = 0;
  const shipFee = cartList.data.length ? SHIP_FEE : 0;

  const handleCheckout = () => {
    if (userInfo.data.id) {
      navigate(ROUTERS.CHECKOUT);
    } else {
      Modal.confirm({
        title: "Bạn cần đăng nhập để tiếp tục",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có muốn đăng nhập?",
        onOk() {
          navigate(ROUTERS.LOGIN);
        },
        okText: "Đăng nhập",
        cancelText: "Huỷ",
      });
    }
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
      title: "Tên sản phẩm",
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
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        const newPrice = record.price + (record.option.plusPrice || 0);
        return `${newPrice.toLocaleString()}₫`;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record, index) => {
        return (
          <InputNumber
            min={1}
            value={record.quantity}
            onChange={(value) =>
              dispatch(
                changeQuantityAction({
                  index,
                  quantity: value,
                })
              )
            }
          />
        );
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) => {
        const newPrice = record.price + (record.option.plusPrice || 0);
        return `${(newPrice * record.quantity).toLocaleString()}₫`;
      },
    },
    {
      dataIndex: "action",
      key: "action",
      render: (_, __, index) => (
        <Popconfirm
          title="Bạn có chắc muốn xoá?"
          onConfirm={() => dispatch(deleteCartItemAction({ index }))}
          okText="Đồng ý"
          cancelText="Huỷ"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      CartPage
      <Row gutter={24}>
        <Col span={18}>
          <Card size="small">
            <Table
              columns={tableColumns}
              dataSource={tableData}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            size="small"
            title={
              <>
                <Row justify="space-between">
                  <h4>Tạm tính</h4>
                  <h4>{provisionalPrice.toLocaleString()}₫</h4>
                </Row>
                <Row justify="space-between">
                  <h4>Phí vận chuyển</h4>
                  <h4>{shipFee.toLocaleString()}₫</h4>
                </Row>
                <Row justify="space-between">
                  <h4>Giảm giá</h4>
                  <h4>0₫</h4>
                </Row>
              </>
            }
          >
            <Row justify="space-between">
              <h4>Tổng tiền: </h4>
              <h4>{(provisionalPrice + shipFee - 0).toLocaleString()}₫</h4>
            </Row>
          </Card>
          {!!cartList.data.length && (
            <Button
              block
              type="primary"
              style={{ marginTop: 24 }}
              onClick={() => handleCheckout()}
            >
              Tiếp tục
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
