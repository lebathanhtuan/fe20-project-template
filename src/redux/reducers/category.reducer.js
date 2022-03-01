import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, CATEGORY_ACTION } from "../constants";

const initialState = {
  categoryList: {
    data: [],
    loading: false,
    errors: null,
  },
};

const categoryReducer = createReducer(initialState, {
  [REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: true,
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: false,
        errors,
      },
    };
  },
});

export default categoryReducer;
