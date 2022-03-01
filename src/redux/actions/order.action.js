import { createAction } from "@reduxjs/toolkit";

import { REQUEST, ORDER_ACTION } from "../constants";

export const paymentOrderAction = createAction(
  REQUEST(ORDER_ACTION.PAYMENT_ORDER)
);
