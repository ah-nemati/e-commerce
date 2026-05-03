import {
  User,
  Action,
  USER_DETAIL,
  NOTIFY,
  ADD_TO_CART,
  REMOVE_CART,
  INCREASE_NUMBER_OF_PRODUCT,
  DECREASE_NUMBER_OF_PRODUCT,
  SET_THEME,
  SET_FILTER,
  LOG_OUT,
  CLEAR_SEARCH,
  PRODUCT,
  ProductType,
} from "../types/index";

export const Auth = (args: User): Action => {
  return { type: USER_DETAIL, payload: args };
};

export const Notify = (status: string, message: string): Action => {
  return { type: NOTIFY, payload: { status, message } };
};

export const SetProduct = (products: ProductType[]): Action => {
  return { type: PRODUCT, payload: products };
};

export const AddToCart = (product: ProductType): Action => {
  return { type: ADD_TO_CART, payload: product };
};

export const RemoveCart = (id: string): Action => {
  return { type: REMOVE_CART, payload: id };
};

export const increaseNumOfProduct = (id: string, product: ProductType[]): Action => {
  return { type: INCREASE_NUMBER_OF_PRODUCT, payload: { id, product } };
};

export const decreaseNumOfProduct = (id: string, product: ProductType[]): Action => {
  return { type: DECREASE_NUMBER_OF_PRODUCT, payload: { id, product } };
};

export const SetTheme = (theme: 'light' | 'dark'|'system'): Action => {
  return { type: SET_THEME, payload: theme };
};

export const SetFilter = (products: ProductType[]): Action => {
  return { type: SET_FILTER, payload: products };
};

export const Logout = (): Action => {
  return { type: LOG_OUT };
};

export const ClearSearch = (): Action => {
  return { type: CLEAR_SEARCH };
};
