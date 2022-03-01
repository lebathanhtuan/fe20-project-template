import { fork } from "redux-saga/effects";

import userSaga from "./user.saga";
import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import brandSaga from "./brand.saga";
import locationSaga from "./location.saga";
import orderSaga from "./order.saga";
import commentSaga from "./comment.saga";

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(brandSaga);
  yield fork(locationSaga);
  yield fork(orderSaga);
  yield fork(commentSaga);
}
