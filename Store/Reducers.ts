import { State, Action } from "./types";

const initialState: State = {
  user: {},
  massege: { status: "", massege: "" },
  product: {},
  cart: [],
  theme: "light",
  filter: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "USER_DETAIL":
      return { ...state, user: action.payload };
    case "NOTIFY":
      return {
        ...state,
        massege: {
          status: action.payload.status,
          massege: action.payload.massege,
        },
      };
    case "PRODUCT":
      return { ...state, product: action.payload };
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
            ? { ...item, Quanity: item.Quanity + 1 }
            : { ...item, Quanity: item.Quanity }
        ),
      };
    case "DECREASE_NUMBER_OF_PRODUCT":
      return {
        ...state,
        cart: action.payload.product.map((item) =>
          item.id === action.payload.id
            ? { ...item, Quanity: item.Quanity - 1 }
            : { ...item, Quanity: item.Quanity }
        ),
      };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "LOG_OUT":
      return { ...state, user: {} };
    case "CLEAR_SEARCH": {
      return { ...state, filter: [] };
    }
    default:
      return state;
  }
};
