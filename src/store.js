import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "./redux/reducers/user.reducer";
import productReducer from "./redux/reducers/product.reducer";
import categoryReducer from "./redux/reducers/category.reducer";
import brandReducer from "./redux/reducers/brand.reducer";
import cartReducer from "./redux/reducers/cart.reducer";
import locationReducer from "./redux/reducers/location.reducer";
import commentReducer from "./redux/reducers/comment.reducer";
import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userReducer,
    productReducer,
    categoryReducer,
    brandReducer,
    cartReducer,
    locationReducer,
    commentReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
