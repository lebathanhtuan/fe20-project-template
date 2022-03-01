import { createAction } from "@reduxjs/toolkit";

import { REQUEST, COMMENT_ACTION } from "../constants";

export const getCommentListAction = createAction(
  REQUEST(COMMENT_ACTION.GET_COMMENT_LIST)
);
export const sendCommentAction = createAction(
  REQUEST(COMMENT_ACTION.SEND_COMMENT)
);
