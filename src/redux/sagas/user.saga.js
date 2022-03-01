import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";

import { REQUEST, SUCCESS, FAIL, USER_ACTION } from "../constants";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/login", data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put({
      type: SUCCESS(USER_ACTION.LOGIN),
      payload: {
        data: result.data,
      },
    });
    message.success("Đăng nhập thành công");
    if (callback.redirectHome) yield callback.redirectHome();
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.LOGIN),
      payload: {
        errors: "Email hoặc mật khẩu không đúng",
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post("http://localhost:4000/register", data);
    yield put({ type: SUCCESS(USER_ACTION.REGISTER) });
    message.success("Đăng ký thành công");
    if (callback.redirectLogin) yield callback.redirectLogin();
  } catch (error) {
    const errorMessage =
      error.response.data === "Email already exists"
        ? "Email đã tồn tại"
        : error.response.data;
    yield put({
      type: FAIL(USER_ACTION.REGISTER),
      payload: {
        errors: errorMessage,
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.GET_USER_INFO),
      payload: {
        errors: "Lỗi không xác định",
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery(REQUEST(USER_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(USER_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getUserInfoSaga);
}
