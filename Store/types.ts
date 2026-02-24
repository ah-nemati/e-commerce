
export interface User {
  id?: string;
  name?: string;
  email?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  Quanity: number;
}

export interface State {
  user: User | {};
  massege: {
    status: string;
    massege: string;
  };
  product: Product | {};
  cart: CartItem[];
  theme: 'light' | 'dark';
  filter: any[]; 
}

// Action Types
export const USER_DETAIL = 'USER_DETAIL';
export const NOTIFY = 'NOTIFY';
export const PRODUCT = 'PRODUCT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const INCREASE_NUMBER_OF_PRODUCT = 'INCREASE_NUMBER_OF_PRODUCT';
export const DECREASE_NUMBER_OF_PRODUCT = 'DECREASE_NUMBER_OF_PRODUCT';
export const SET_THEME = 'SET_THEME';
export const SET_FILTER = 'SET_FILTER';
export const LOG_OUT = 'LOG_OUT';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';


interface UserDetailAction {
  type: typeof USER_DETAIL;
  payload: User;
}

interface NotifyAction {
  type: typeof NOTIFY;
  payload: {
    status: string;
    massege: string;
  };
}

interface ProductAction {
    type: typeof PRODUCT;
    payload: Product;
}

interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: CartItem;
}

interface RemoveCartAction {
    type: typeof REMOVE_CART;
    payload: string; // product id
}

interface IncreaseNumberOfProductAction {
    type: typeof INCREASE_NUMBER_OF_PRODUCT;
    payload: {
        product: CartItem[];
        id: string;
    }
}

interface DecreaseNumberOfProductAction {
    type: typeof DECREASE_NUMBER_OF_PRODUCT;
    payload: {
        product: CartItem[];
        id: string;
    }
}

interface SetThemeAction {
    type: typeof SET_THEME;
    payload: 'light' | 'dark';
}

interface SetFilterAction {
    type: typeof SET_FILTER;
    payload: any[];
}

interface LogOutAction {
    type: typeof LOG_OUT;
}

interface ClearSearchAction {
    type: typeof CLEAR_SEARCH;
}


export type Action =
  | UserDetailAction
  | NotifyAction
  | ProductAction
  | AddToCartAction
  | RemoveCartAction
  | IncreaseNumberOfProductAction
  | DecreaseNumberOfProductAction
  | SetThemeAction
  | SetFilterAction
  | LogOutAction
  | ClearSearchAction;
