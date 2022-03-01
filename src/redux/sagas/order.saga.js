import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  REQUEST,
  SUCCESS,
  FAIL,
  ORDER_ACTION,
  CART_ACTION,
} from "../constants";

function* paymentOrderSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/orders", data);
    yield put({ type: REQUEST(CART_ACTION.CLEAR_CART) });
    yield put({
      type: SUCCESS(ORDER_ACTION.PAYMENT_ORDER),
      payload: {
        data: result.data,
      },
    });
    if (callback?.goToHome) yield callback?.goToHome();
  } catch (error) {
    yield put({
      type: FAIL(ORDER_ACTION.PAYMENT_ORDER),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.PAYMENT_ORDER), paymentOrderSaga);
}
