import { Action, State } from "@/types";

const initialState: State = {
  user: null,
  message: { status: "", message: "" },
  products: [],
  cart: [],
  theme: "light",
  filteredProducts: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "USER_DETAIL":
      return { ...state, user: action.payload };
    case "NOTIFY":
      return {
        ...state,
        message: {
          status: action.payload.status,
          message: action.payload.message,
        },
      };
    case "PRODUCT":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "INCREASE_NUMBER_OF_PRODUCT":
      return {
        ...state,
        cart: action.payload.product.map((item) =>
          item.id === action.payload.id
            ? { ...item, Quantity: item.Quantity + 1 }
            : { ...item, Quantity: item.Quantity }
        ),
      };
    case "DECREASE_NUMBER_OF_PRODUCT":
      return {
        ...state,
        cart: action.payload.product.map((item) =>
          item.id === action.payload.id
            ? { ...item, Quantity: item.Quantity - 1 }
            : { ...item, Quantity: item.Quantity }
        ),
      };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_FILTER":
      return { ...state, filteredProducts: action.payload };
    case "LOG_OUT":
      return { ...state, user: null };
    case "CLEAR_SEARCH": {
      return { ...state, filteredProducts: [] };
    }
    default:
      return state;
  }
};
