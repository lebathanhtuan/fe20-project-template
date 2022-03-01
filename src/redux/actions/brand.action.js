import { createAction } from "@reduxjs/toolkit";

import { REQUEST, BRAND_ACTION } from "../constants";

export const getBrandListAction = createAction(
  REQUEST(BRAND_ACTION.GET_BRAND_LIST)
);
