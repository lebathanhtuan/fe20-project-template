import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Image,
  Radio,
  InputNumber,
  Button,
  Form,
  Input,
  Rate,
  Space,
  notification,
} from "antd";
import moment from "moment";

import {
  getProductDetailAction,
  addToCartAction,
  getCommentListAction,
  sendCommentAction,
} from "../../redux/actions";
import * as S from "./styles";

const ProductDetailPage = () => {
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const { commentList } = useSelector((state) => state.commentReducer);

  const selectedOptionData = productDetail.data.options?.find(
    (item) => item.id === selectedOptionId
  );
  const totalPrice =
    productDetail.data.price + (selectedOptionData?.plusPrice || 0);

  let totalRate = 0;
  commentList.data.forEach((item) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 46 ~ commentList.data.forEach ~ item",
      item
    );
    totalRate = totalRate + item.rate;
  });
  console.log(
    "🚀 ~ file: index.jsx ~ line 45 ~ ProductDetailPage ~ totalRate",
    totalRate
  );

  useEffect(() => {
    dispatch(getProductDetailAction({ id }));
    dispatch(getCommentListAction({ productId: id }));
  }, [id]);

  useEffect(() => {
    if (productDetail.data.options?.length > 0) {
      setSelectedOptionId(productDetail.data.options[0].id);
    } else {
      setSelectedOptionId("");
    }
  }, [productDetail.data]);

  const handleAddToCart = () => {
    dispatch(
      addToCartAction({
        name: productDetail.data.name,
        price: productDetail.data.price,
        productId: productDetail.data.id,
        option: selectedOptionId
          ? {
              id: selectedOptionId,
              name: selectedOptionData?.name,
              plusPrice: selectedOptionData?.plusPrice,
            }
          : {},
        quantity: selectedQuantity,
      })
    );
    notification.success({
      message: "Thêm vào giỏ hàng thành công",
      description: `${productDetail.data.name}${
        selectedOptionId ? ` - ${selectedOptionData?.name}` : ""
      }`,
    });
  };

  const handleComment = (values) => {
    dispatch(
      sendCommentAction({
        ...values,
        productId: productDetail.data.id,
        userId: userInfo.data.id,
      })
    );
  };

  const renderProductOptions = () => {
    if (!productDetail.data.options?.length) return null;
    return (
      <>
        <h4>Tùy chọn</h4>
        <Radio.Group
          buttonStyle="solid"
          value={selectedOptionId}
          onChange={(e) => setSelectedOptionId(e.target.value)}
        >
          {productDetail.data.options.map((optionItem) => (
            <Radio.Button
              key={`product-option-${optionItem.id}`}
              value={optionItem.id}
            >
              {optionItem.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </>
    );
  };

  const renderFavorite = () => {
    const favoriteIndex = productDetail.data.favorites?.findIndex(
      (item) => item.userId === userInfo.data.id
    );
    return (
      <Button danger={favoriteIndex !== -1} onClick={() => {}}>
        {favoriteIndex !== -1 ? "Đã thêm vào yêu thích" : "Thêm vào yêu thích"}
      </Button>
    );
  };

  const renderComments = () => {
    return commentList.data.map((commentItem, commentIndex) => {
      return (
        <div key={commentItem.id}>
          <Space align="center" size={32}>
            <h3>{commentItem.user?.fullName}</h3>
            <h5>{moment(commentItem.createdAt).fromNow()}</h5>
          </Space>
          <div>
            <Rate disabled value={commentItem.rate} allowHalf />
          </div>

          <p>{commentItem.content}</p>
        </div>
      );
    });
  };

  if (productDetail.loading) return <div>Loading...</div>;
  return (
    <div style={{ padding: "20px 0" }}>
      <Card>
        <Row gutter={24}>
          <Col span={10}>
            <Image
              width="100%"
              src="error"
              fallback="data:image/png;base64,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"
            />
          </Col>
          <Col span={14}>
            <h1>{productDetail.data.name}</h1>
            <div>
              <Rate
                disabled
                value={
                  commentList.data.length
                    ? totalRate / commentList.data.length
                    : 0
                }
              />
              {(commentList.data.length
                ? totalRate / commentList.data.length
                : 0
              ).toFixed(1)}
            </div>
            <h3>{totalPrice?.toLocaleString()}₫</h3>
            {renderProductOptions()}
            <h4>Số lượng</h4>
            <div>
              <InputNumber
                min={1}
                value={selectedQuantity}
                onChange={(value) => setSelectedQuantity(value)}
              />
            </div>
            <Button
              type="primary"
              size="large"
              style={{ marginTop: 16 }}
              onClick={() => handleAddToCart()}
            >
              Thêm vào giỏ
            </Button>
            {`${productDetail.data.favorites?.length} lượt thích`}
            {renderFavorite()}
          </Col>
          {/* <Col span={6}>
            <h4>Giỏ hàng</h4>
            {renderCart()}
          </Col> */}
        </Row>
      </Card>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={16}>
          <Card title="Mô tả sản phẩm">
            <S.ProductContent
              dangerouslySetInnerHTML={{
                __html: productDetail.data.description,
              }}
            />
          </Card>

          <Card title="Đánh giá" style={{ marginTop: 16 }}>
            {userInfo.data.id && (
              <Form
                layout="vertical"
                onFinish={(values) => handleComment(values)}
              >
                <Form.Item label="Đánh giá" name="rate">
                  <Rate allowHalf />
                </Form.Item>
                <Form.Item label="Nội dung" name="content">
                  <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>

                <Button htmlType="submit">Gửi</Button>
              </Form>
            )}
            {renderComments()}
          </Card>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
