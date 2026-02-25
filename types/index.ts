// types.ts

export interface ProductType {
    _id: string; 
    id: string;
    Quantity: number; 
    title_fa: string;
    data_layer: {
      brand: string;
      category: string;
    };
    image: {
      url: string[];
    };
    rating: {
      rate: number;
      count: number;
    };
    price: number;
    colors: Color[];
  }
  
  export interface User {
    _id: string;
    email: string;
    password?: string; 
    role: boolean;
    createdAt: string; 
    updatedAt: string;
  }

  export interface Color {hex_code: string, id: string,title: string}

export const USER_DETAIL = "USER_DETAIL";
export const NOTIFY = "NOTIFY";
export const PRODUCT = "PRODUCT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_CART = "REMOVE_CART";
export const INCREASE_NUMBER_OF_PRODUCT = "INCREASE_NUMBER_OF_PRODUCT";
export const DECREASE_NUMBER_OF_PRODUCT = "DECREASE_NUMBER_OF_PRODUCT";
export const SET_THEME = "SET_THEME";
export const SET_FILTER = "SET_FILTER";
export const LOG_OUT = "LOG_OUT";
export const CLEAR_SEARCH = "CLEAR_SEARCH";


export interface Notification {
  status: string;
  message: string; 
}

export interface State {
  user: User | null;
  message: Notification;
  products: ProductType[];
  cart: ProductType[];
  theme: 'light' | 'dark' | 'system';
  filteredProducts: ProductType[];
}

export type Action =
  | { type: typeof USER_DETAIL; payload: User }
  | { type: typeof NOTIFY; payload: Notification }
  | { type: typeof PRODUCT; payload: ProductType[] }
  | { type: typeof ADD_TO_CART; payload: ProductType }
  | { type: typeof REMOVE_CART; payload: string }
  | { type: typeof INCREASE_NUMBER_OF_PRODUCT; payload: { id: string, product: ProductType[] } }
  | { type: typeof DECREASE_NUMBER_OF_PRODUCT; payload: { id: string, product: ProductType[] } }
  | { type: typeof SET_THEME; payload: 'light' | 'dark' | 'system' }
  | { type: typeof SET_FILTER; payload: ProductType[] }
  | { type: typeof LOG_OUT }
  | { type: typeof CLEAR_SEARCH };