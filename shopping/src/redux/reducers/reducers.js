import { ActionTypes } from "../constant/constant";

export const productReducer = (state = {cartValue: 0}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };

    case ActionTypes.SET_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }

    case ActionTypes.SET_DATA: {
      return {
        ...state,
        data: payload,
      };
    }

    case ActionTypes.UPDATE_CART: {
      return {
        ...state,
        cartValue:  state.cartValue + 1,
      };
    }

    default:
      return state;
  }
};
