import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../constants";

function* getProductListSaga(action) {
  try {
    const { page, limit, categoryIds, brandIds, price, keyword, sort, more } =
      action.payload;
    const [min, max] = price;

    const result = yield axios.get("http://localhost:4000/products", {
      params: {
        categoryId: categoryIds,
        brandId: brandIds,
        price_gte: min,
        price_lte: max,
        q: keyword,
        ...(sort && { _sort: "price", _order: sort }),
        _expand: ["category", "brand"],
        _limit: limit,
        _page: page,
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          limit,
          total: parseInt(result.headers["x-total-count"]),
          more,
        },
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: ["category", "brand"],
        _embed: ["favorites", "options"],
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_BRAND_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* productSaga() {
  yield debounce(
    500,
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
    getProductListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
}
