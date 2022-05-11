import { axios } from "axios";
import api from "../../api/api";
import { ActionTypes } from "../constant/constant";

export const setCategories = (categories) => {
  return {
    type: ActionTypes.SET_CATEGORIES,
    payload: categories,
  };
};

export const setProduct = (products) => {
  console.log(products);
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const updateCart = () => {
  return {
    type: ActionTypes.UPDATE_CART,
  };
};

// export const selectdProducts = (product) => {
//   return {
//     type: ActionTypes.SELECTD_PRODUCTS,
//     payload: product,
//   };
// };

// export const removeSelectdProducts = (products) => {
//   return {
//     type: ActionTypes.REMOVE_SELECTD_PRODUCTS,
//     payload: products,
//   };
// };
