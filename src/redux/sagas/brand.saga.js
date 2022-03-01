import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, BRAND_ACTION } from "../constants";

function* getBrandListSaga(action) {
  try {
    const { categoryIds } = action.payload;
    const result = yield axios.get("http://localhost:4000/brands", {
      params: {
        categoryId: categoryIds,
      },
    });
    yield put({
      type: SUCCESS(BRAND_ACTION.GET_BRAND_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(BRAND_ACTION.GET_BRAND_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* categorySaga() {
  yield takeEvery(REQUEST(BRAND_ACTION.GET_BRAND_LIST), getBrandListSaga);
}
