import {
  User,
  Product as ProductType,
  CartItem,
  Action,
  USER_DETAIL,
  NOTIFY,
  PRODUCT,
  ADD_TO_CART,
  REMOVE_CART,
  INCREASE_NUMBER_OF_PRODUCT,
  DECREASE_NUMBER_OF_PRODUCT,
  SET_THEME,
  SET_FILTER,
  LOG_OUT,
  CLEAR_SEARCH,
} from "./types";

export const Auth = (args: User): Action => {
  return { type: USER_DETAIL, payload: args };
};

export const Notify = (status: string, massege: string): Action => {
  return { type: NOTIFY, payload: { status, massege } };
};

export const Product = (product: ProductType): Action => {
  return { type: PRODUCT, payload: product };
};

export const AddToCart = (product: CartItem): Action => {
  return { type: ADD_TO_CART, payload: product };
};

export const RemoveCart = (id: string): Action => {
  return { type: REMOVE_CART, payload: id };
};

export const increaseNumOfProduct = (id: string, product: CartItem[]): Action => {
  return { type: INCREASE_NUMBER_OF_PRODUCT, payload: { id, product } };
};

export const decreaseNumOfProduct = (id: string, product: CartItem[]): Action => {
  return { type: DECREASE_NUMBER_OF_PRODUCT, payload: { id, product } };
};

export const SetTheme = (theme: "light" | "dark"): Action => {
  return { type: SET_THEME, payload: theme };
};

export const SetFilter = (product: any[]): Action => {
  return { type: SET_FILTER, payload: product };
};

export const Logout = (): Action => {
  return { type: LOG_OUT };
};

export const ClearSearch = (): Action => {
  return { type: CLEAR_SEARCH };
};
