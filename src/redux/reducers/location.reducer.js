import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, LOCATION_ACTION } from "../constants";

const initialState = {
  cityList: {
    data: [],
    loading: false,
    errors: null,
  },
  districtList: {
    data: [],
    loading: false,
    errors: null,
  },
  wardList: {
    data: [],
    loading: false,
    errors: null,
  },
};

const cityReducer = createReducer(initialState, {
  [REQUEST(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    return {
      ...state,
      cityList: {
        ...state.cityList,
        loading: true,
      },
    };
  },
  [SUCCESS(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cityList: {
        ...state.cityList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      cityList: {
        ...state.cityList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    return {
      ...state,
      districtList: {
        ...state.districtList,
        loading: true,
      },
    };
  },
  [SUCCESS(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      districtList: {
        ...state.districtList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      districtList: {
        ...state.districtList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    return {
      ...state,
      wardList: {
        ...state.wardList,
        loading: true,
      },
    };
  },
  [SUCCESS(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      wardList: {
        ...state.wardList,
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      wardList: {
        ...state.wardList,
        loading: false,
        errors,
      },
    };
  },
});

export default cityReducer;
