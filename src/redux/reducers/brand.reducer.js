import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, BRAND_ACTION } from "../constants";

const initialState = {
  brandList: {
    data: [],
    loading: false,
    errors: null,
  },
};

const brandReducer = createReducer(initialState, {
  [REQUEST(BRAND_ACTION.GET_BRAND_LIST)]: (state, action) => {
    return {
      ...state,
      brandList: {
        ...state.brandList,
        loading: true,
      },
    };
  },
  [SUCCESS(BRAND_ACTION.GET_BRAND_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      brandList: {
        ...state.brandList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(BRAND_ACTION.GET_BRAND_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      brandList: {
        ...state.brandList,
        loading: false,
        errors,
      },
    };
  },
});

export default brandReducer;
