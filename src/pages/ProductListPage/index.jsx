import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Checkbox,
  Input,
  Select,
  Slider,
  Space,
  Tag,
  Button,
} from "antd";

import { PAGING } from "../../constants/paging";
import { ROUTERS } from "../../constants/routers";
import {
  getCategoryListAction,
  getProductListAction,
  getBrandListAction,
} from "../../redux/actions";

const ProductListPage = () => {
  const [filterParams, setFilterParams] = useState({
    categoryIds: [],
    brandIds: [],
    price: [0, 100000000],
    keyword: "",
    sort: undefined,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { brandList } = useSelector((state) => state.brandReducer);
  const { productList } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  }, []);

  const handleFilterCategory = (values) => {
    setFilterParams({
      ...filterParams,
      categoryIds: values,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        categoryIds: values,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
    dispatch(
      getBrandListAction({
        categoryIds: values,
      })
    );
  };

  const handleFilterBrand = (values) => {
    setFilterParams({
      ...filterParams,
      brandIds: values,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        brandIds: values,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleFilterRange = (values) => {
    dispatch(
      getProductListAction({
        ...filterParams,
        price: values,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleFilterKeyword = (value) => {
    setFilterParams({
      ...filterParams,
      keyword: value,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        keyword: value,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleFilterSort = (value) => {
    setFilterParams({
      ...filterParams,
      sort: value,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        sort: value,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleClearFilterCategory = (e, categoryId) => {
    e.preventDefault();
    const newCategoryIds = filterParams.categoryIds.filter(
      (id) => id !== categoryId
    );
    setFilterParams({
      ...filterParams,
      categoryIds: newCategoryIds,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        categoryIds: newCategoryIds,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleClearFilterRange = (e) => {
    e.preventDefault();
    setFilterParams({
      ...filterParams,
      price: [0, 100000000],
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        price: [0, 100000000],
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleClearFilterKeyword = (e) => {
    e.preventDefault();
    setFilterParams({
      ...filterParams,
      keyword: "",
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        keyword: "",
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleClearFilterSort = (e) => {
    e.preventDefault();
    setFilterParams({
      ...filterParams,
      sort: undefined,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        sort: undefined,
        page: 1,
        limit: PAGING.PRODUCT_LIST,
      })
    );
  };

  const handleShowMoreProduct = () => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PAGING.PRODUCT_LIST,
        more: true,
      })
    );
  };

  const renderCategoryOptions = useMemo(() => {
    if (categoryList.loading) return <div>Loading...</div>;
    const categoryOptions = categoryList.data.map((category) => ({
      value: category.id,
      label: category.name,
    }));
    return (
      <Checkbox.Group
        options={categoryOptions}
        value={filterParams.categoryIds}
        onChange={(values) => handleFilterCategory(values)}
      />
    );
  }, [categoryList, filterParams]);

  const renderBrandOptions = useMemo(() => {
    if (brandList.loading) return <div>Loading...</div>;
    const brandOptions = brandList.data.map((brand) => ({
      value: brand.id,
      label: brand.name,
    }));
    return (
      <Checkbox.Group
        options={brandOptions}
        value={filterParams.brandIds}
        onChange={(values) => handleFilterBrand(values)}
      />
    );
  }, [brandList, filterParams]);

  const renderFilterTag = useMemo(() => {
    const [min, max] = filterParams.price;
    return (
      <Space wrap style={{ marginBottom: 16 }}>
        {filterParams.categoryIds.map((categoryId, tagIndex) => {
          const categoryData = categoryList.data.find(
            (category) => category.id === categoryId
          );
          return (
            <Tag
              key={`category-${tagIndex}`}
              color="#002766"
              closable
              onClose={(e) => handleClearFilterCategory(e, categoryId)}
            >
              {categoryData.name}
            </Tag>
          );
        })}
        {(min !== 0 || max !== 100000000) && (
          <Tag
            color="#002766"
            closable
            onClose={(e) => handleClearFilterRange(e)}
          >
            Kho???ng gi??: {min.toLocaleString()}??? - {max.toLocaleString()}???
          </Tag>
        )}
        {!!filterParams.keyword && (
          <Tag
            color="#002766"
            closable
            onClose={(e) => handleClearFilterKeyword(e)}
          >
            T??? kh??a: {filterParams.keyword}
          </Tag>
        )}
        {!!filterParams.sort && (
          <Tag
            color="#002766"
            closable
            onClose={(e) => handleClearFilterSort(e)}
          >
            S???p x???p: {filterParams.sort === "asc" ? "T??ng d???n" : "Gi???m d???n"}
          </Tag>
        )}
      </Space>
    );
  }, [filterParams]);

  const renderProductList = useMemo(() => {
    if (productList.loading && !productList.meta.more)
      return <div>Loading...</div>;
    return productList.data.map((productItem, productIndex) => (
      <Col span={6} key={productIndex}>
        <Card
          size="small"
          onClick={() =>
            navigate(
              generatePath(ROUTERS.PRODUCT_DETAIL, { id: productItem.id })
            )
          }
          style={{ cursor: "pointer" }}
        >
          <div>{productItem.name}</div>
          <div>{productItem.price?.toLocaleString()}</div>
        </Card>
      </Col>
    ));
  }, [productList]);

  return (
    <div>
      Product List Page
      <Row gutter={16}>
        <Col span={6}>
          <Card size="small" title="Lo???i s???n ph???m" style={{ marginBottom: 16 }}>
            {renderCategoryOptions}
          </Card>
          {filterParams.categoryIds.length > 0 && (
            <Card
              size="small"
              title="H??ng s???n xu???t"
              style={{ marginBottom: 16 }}
            >
              {renderBrandOptions}
            </Card>
          )}
          <Card size="small" title="Kho???ng gi??">
            <Slider
              range
              min={0}
              max={100000000}
              step={1000000}
              tipFormatter={(value) => `${value.toLocaleString()}???`}
              value={filterParams.price}
              onChange={(values) =>
                setFilterParams({
                  ...filterParams,
                  price: [...values],
                })
              }
              onAfterChange={(values) => handleFilterRange(values)}
            />
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={16}>
              <Input
                placeholder="T??m ki???m"
                value={filterParams.keyword}
                onChange={(e) => handleFilterKeyword(e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Select
                style={{ width: "100%" }}
                placeholder="S???p x???p"
                value={filterParams.sort}
                onChange={(value) => handleFilterSort(value)}
              >
                <Select.Option value="asc">T??ng d???n</Select.Option>
                <Select.Option value="desc">Gi???m d???n</Select.Option>
              </Select>
            </Col>
          </Row>
          {renderFilterTag}
          <Row gutter={[16, 16]}>{renderProductList}</Row>
          {productList.data.length !== productList.meta.total && (
            <Row justify="center" style={{ marginTop: 16 }}>
              <Button
                loading={productList.loading && productList.meta.more}
                onClick={() => handleShowMoreProduct()}
              >
                Xem th??m
              </Button>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductListPage;
