import { createContext, useReducer } from "react";
import { CartProps } from "../utils/user-types";
import { signoutUser } from "../utils/helperFunctions";

interface CartInitialStateTypes {
  cart: CartProps | null;
  cartLoading: boolean;
  updateLoading: boolean;
  error: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum CartActionKind {
  GET_CART_START = "GET_CART_START",
  GET_CART_SUCCESS = "GET_CART_SUCCESS",
  GET_CART_FAILURE = "GET_CART_FAILURE",

  UPDATE_CART_START = "UPDATE_CART_START",
  UPDATE_CART_SUCCESS = "UPDATE_CART_SUCCESS",
}

// An interface for our actions
export interface CartAction {
  type: CartActionKind;
  payload?: CartProps | null;
  error?: string;
}

const INITIAL_STATE: CartInitialStateTypes = {
  cart: null,
  cartLoading: false,
  updateLoading: false,
  error: null,
};

interface CartContextTypes {
  state: CartInitialStateTypes;
  dispatch: React.Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const CartReducer = (
  state: CartInitialStateTypes,
  action: CartAction
): typeof INITIAL_STATE => {
  if (action.error?.startsWith("TokenError:")) signoutUser();
  switch (action.type) {
    case CartActionKind.GET_CART_START:
      return { ...state, cartLoading: true, error: null, cart: null };
    case CartActionKind.GET_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload as CartProps,
        cartLoading: false,
        error: null,
      };
    case CartActionKind.GET_CART_FAILURE:
      return {
        ...state,
        cart: null,
        cartLoading: false,
        error: action.error!,
      };

    case CartActionKind.UPDATE_CART_START:
      return { ...state, updateLoading: true };
    case CartActionKind.UPDATE_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload as CartProps,
        updateLoading: false,
      };

    default:
      return state;
  }
};

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);

  const values = {
    state,
    dispatch,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
