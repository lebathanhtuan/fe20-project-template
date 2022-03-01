import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, COMMENT_ACTION } from "../constants";

const initialState = {
  commentList: {
    data: [],
    loading: false,
    errors: null,
  },
  sendCommentData: {
    loading: false,
    errors: null,
  },
};

const commentReducer = createReducer(initialState, {
  [REQUEST(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    return {
      ...state,
      commentList: {
        ...state.commentList,
        loading: true,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(COMMENT_ACTION.SEND_COMMENT)]: (state, action) => {
    return {
      ...state,
      sendCommentData: {
        ...state.sendCommentData,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.SEND_COMMENT)]: (state, action) => {
    return {
      ...state,
      sendCommentData: {
        ...state.sendCommentData,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(COMMENT_ACTION.SEND_COMMENT)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      sendCommentData: {
        ...state.sendCommentData,
        loading: false,
        errors,
      },
    };
  },
});

export default commentReducer;
