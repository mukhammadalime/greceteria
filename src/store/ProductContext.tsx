import { createContext, useReducer } from "react";
import { ProductItemTypes } from "../utils/user-types";

interface ProductsInitialStateTypes {
  products: ProductItemTypes[];
  product: ProductItemTypes | null;
  productsLoading: boolean;
  productLoading: boolean;
  error: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum ProductActionKind {
  GET_PRODUCTS_START = "GET_PRODUCTS_START",
  GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS",
  GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE",

  GET_PRODUCT_START = "GET_PRODUCT_START",
  GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS",
  GET_PRODUCT_FAILURE = "GET_PRODUCT_FAILURE",
}

// An interface for our actions
export interface ProductAction {
  type: ProductActionKind;
  payload?: ProductItemTypes[] | ProductItemTypes | [];
  error?: string;
}

const INITIAL_STATE: ProductsInitialStateTypes = {
  products: [],
  product: null,
  productsLoading: false,
  productLoading: false,
  error: null,
};

export interface ProductContextTypes {
  state: ProductsInitialStateTypes;
  dispatch: React.Dispatch<ProductAction>;
}

export const ProductContext = createContext<ProductContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const ProductReducer = (
  state: ProductsInitialStateTypes,
  action: ProductAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case ProductActionKind.GET_PRODUCTS_START:
      return { ...state, productsLoading: true, error: null };
    case ProductActionKind.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload as ProductItemTypes[],
        productsLoading: false,
        error: null,
      };
    case ProductActionKind.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        productsLoading: false,
        error: action.error!,
      };

    case ProductActionKind.GET_PRODUCT_START:
      return { ...state, productLoading: true, error: null };
    case ProductActionKind.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload as ProductItemTypes,
        productLoading: false,
        error: null,
      };
    case ProductActionKind.GET_PRODUCT_FAILURE:
      return {
        ...state,
        product: null,
        productLoading: false,
        error: action.error!,
      };

    default:
      return state;
  }
};

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE);

  const values = {
    state,
    dispatch,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
