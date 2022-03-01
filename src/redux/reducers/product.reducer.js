import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../constants";

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    errors: null,
  },
  productDetail: {
    data: {},
    meta: {},
    loading: false,
    errors: null,
  },
};

const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { more } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        meta: {
          ...state.productList.meta,
          more,
        },
        loading: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, meta } = action.payload;
    if (meta.more) {
      return {
        ...state,
        productList: {
          ...state.productList,
          data: [...state.productList.data, ...data],
          meta,
          loading: false,
          errors: null,
        },
      };
    }
    return {
      ...state,
      productList: {
        ...state.productList,
        data,
        meta,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        errors,
      },
    };
  },
});

export default productReducer;
