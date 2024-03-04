import { createContext, useContext, useEffect, useReducer } from "react";
import { CartProps } from "../utils/user-types";
import { getCartApi } from "../api/cart";
import useAxiosPrivate from "../hooks/auth/useAxiosPrivate";
import { AuthContext } from "./AuthContext";

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
  UPDATE_CART_FAILURE = "UPDATE_CART_FAILURE",
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
  switch (action.type) {
    case CartActionKind.GET_CART_START:
      return { ...state, cartLoading: true, error: null };
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
      return { ...state, updateLoading: true, error: null };
    case CartActionKind.UPDATE_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload as CartProps,
        updateLoading: false,
        error: null,
      };
    case CartActionKind.UPDATE_CART_FAILURE:
      return { ...state, updateLoading: false, error: action.error! };

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
  const { auth } = useContext(AuthContext);

  const axiosPrivate = useAxiosPrivate();

  // Fetch cart on every refresh to keep the data up to date with the database.
  useEffect(() => {
    if (!auth.accessToken) return;
    (async () => {
      await getCartApi(dispatch, axiosPrivate);
    })();
  }, [auth.accessToken, axiosPrivate]);

  const values = {
    state,
    dispatch,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
