import { createAction } from "@reduxjs/toolkit";

import { REQUEST, CART_ACTION } from "../constants";

export const addToCartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
export const changeQuantityAction = createAction(
  REQUEST(CART_ACTION.CHANGE_QUANTITY)
);
export const deleteCartItemAction = createAction(
  REQUEST(CART_ACTION.DELETE_CART_ITEM)
);
export const clearCartAction = createAction(REQUEST(CART_ACTION.CLEAR_CART));
