import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, CART_ACTION } from "../constants";

const initialState = {
  cartList: {
    data: JSON.parse(localStorage.getItem("cartList")) || [],
    loading: false,
    errors: null,
  },
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    const { productId, option, quantity } = action.payload;
    const newCartList = [...state.cartList.data];
    if (option.id) {
      const existOptionIndex = newCartList.findIndex(
        (productItem) =>
          productItem.productId === productId &&
          productItem.option.id === option.id
      );
      if (existOptionIndex !== -1) {
        newCartList.splice(existOptionIndex, 1, {
          ...newCartList[existOptionIndex],
          quantity: newCartList[existOptionIndex].quantity + quantity,
        });
        localStorage.setItem("cartList", JSON.stringify(newCartList));
        return {
          ...state,
          cartList: {
            ...state.cartList,
            data: newCartList,
          },
        };
      } else {
        localStorage.setItem(
          "cartList",
          JSON.stringify([...state.cartList.data, action.payload])
        );
        return {
          ...state,
          cartList: {
            ...state.cartList,
            data: [...state.cartList.data, action.payload],
          },
        };
      }
    } else {
      const existProductIndex = newCartList.findIndex(
        (productItem) => productItem.productId === productId
      );
      if (existProductIndex !== -1) {
        newCartList.splice(existProductIndex, 1, {
          ...newCartList[existProductIndex],
          quantity: newCartList[existProductIndex].quantity + quantity,
        });
        localStorage.setItem("cartList", JSON.stringify(newCartList));
        return {
          ...state,
          cartList: {
            ...state.cartList,
            data: newCartList,
          },
        };
      } else {
        localStorage.setItem(
          "cartList",
          JSON.stringify([...state.cartList.data, action.payload])
        );
        return {
          ...state,
          cartList: {
            ...state.cartList,
            data: [...state.cartList.data, action.payload],
          },
        };
      }
    }
  },

  [REQUEST(CART_ACTION.CHANGE_QUANTITY)]: (state, action) => {
    const { index, quantity } = action.payload;
    const newCartList = [...state.cartList.data];
    newCartList.splice(index, 1, {
      ...newCartList[index],
      quantity,
    });
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
    };
  },

  [REQUEST(CART_ACTION.DELETE_CART_ITEM)]: (state, action) => {
    const { index } = action.payload;
    const newCartList = [...state.cartList.data];
    newCartList.splice(index, 1);
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
    };
  },

  [REQUEST(CART_ACTION.CLEAR_CART)]: (state, action) => {
    localStorage.removeItem("cartList");
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: [],
      },
    };
  },
});

export default cartReducer;
