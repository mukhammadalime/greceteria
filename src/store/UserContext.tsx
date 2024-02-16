import { createContext, useReducer } from "react";
import { ProductItemTypes } from "../utils/user-types";

interface UserInitialStateTypes {
  compare: ProductItemTypes[];
  compareLoading: boolean;
  compareUpdateLoading: boolean;
  wishlist: ProductItemTypes[];
  wishlistLoading: boolean;
  wishlistUpdateLoading: boolean;
  error: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum UserActionKind {
  GET_COMPARE_START = "GET_COMPARE_START",
  GET_COMPARE_SUCCESS = "GET_COMPARE_SUCCESS",
  GET_COMPARE_FAILURE = "GET_COMPARE_FAILURE",

  ADD_TO_COMPARE_START = "ADD_TO_COMPARE_START",
  ADD_TO_COMPARE_SUCCESS = "ADD_TO_COMPARE_SUCCESS",
  ADD_TO_COMPARE_FAILURE = "ADD_TO_COMPARE_FAILURE",

  REMOVE_FROM_COMPARE_START = "REMOVE_FROM_COMPARE_START",
  REMOVE_FROM_COMPARE_SUCCESS = "REMOVE_FROM_COMPARE_SUCCESS",
  REMOVE_FROM_COMPARE_FAILURE = "REMOVE_FROM_COMPARE_FAILURE",

  GET_WISHLIST_START = "GET_WISHLIST_START",
  GET_WISHLIST_SUCCESS = "GET_WISHLIST_SUCCESS",
  GET_WISHLIST_FAILURE = "GET_WISHLIST_FAILURE",

  ADD_TO_WISHLIST_START = "ADD_TO_WISHLIST_START",
  ADD_TO_WISHLIST_SUCCESS = "ADD_TO_WISHLIST_SUCCESS",
  ADD_TO_WISHLIST_FAILURE = "ADD_TO_WISHLIST_FAILURE",

  REMOVE_FROM_WISHLIST_START = "REMOVE_FROM_WISHLIST_START",
  REMOVE_FROM_WISHLIST_SUCCESS = "REMOVE_FROM_WISHLIST_SUCCESS",
  REMOVE_FROM_WISHLIST_FAILURE = "REMOVE_FROM_WISHLIST_FAILURE",
}

// An interface for our actions
export interface UserAction {
  type: UserActionKind;
  payload?: ProductItemTypes[] | ProductItemTypes | [] | string;
  error?: string;
}

const INITIAL_STATE: UserInitialStateTypes = {
  compare: [],
  compareLoading: false,
  compareUpdateLoading: false,
  wishlist: [],
  wishlistLoading: false,
  wishlistUpdateLoading: false,
  error: null,
};

interface UserContextTypes {
  state: UserInitialStateTypes;
  dispatch: React.Dispatch<UserAction>;
}

export const UserContext = createContext<UserContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const UserReducer = (
  state: UserInitialStateTypes,
  action: UserAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case UserActionKind.GET_COMPARE_START:
      return { ...state, compareLoading: true, error: null };
    case UserActionKind.GET_COMPARE_SUCCESS:
      return {
        ...state,
        compare: action.payload as ProductItemTypes[],
        compareLoading: false,
        error: null,
      };
    case UserActionKind.GET_COMPARE_FAILURE:
      return {
        ...state,
        compare: [],
        compareLoading: false,
        error: action.error!,
      };

    case UserActionKind.ADD_TO_COMPARE_START:
      return { ...state, compareUpdateLoading: true, error: null };
    case UserActionKind.ADD_TO_COMPARE_SUCCESS:
      return {
        ...state,
        compare: action.payload as ProductItemTypes[],
        compareUpdateLoading: false,
        error: null,
      };
    case UserActionKind.ADD_TO_COMPARE_FAILURE:
      return {
        ...state,
        compareUpdateLoading: false,
        error: action.error!,
      };

    case UserActionKind.REMOVE_FROM_COMPARE_START:
      return { ...state, compareUpdateLoading: true, error: null };
    case UserActionKind.REMOVE_FROM_COMPARE_SUCCESS:
      return {
        ...state,
        compare: action.payload as ProductItemTypes[],
        compareUpdateLoading: false,
        error: null,
      };
    case UserActionKind.REMOVE_FROM_COMPARE_FAILURE:
      return {
        ...state,
        compareUpdateLoading: false,
        error: action.error!,
      };

    case UserActionKind.GET_WISHLIST_START:
      return { ...state, wishlistLoading: true, error: null };
    case UserActionKind.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: action.payload as ProductItemTypes[],
        wishlistLoading: false,
        error: null,
      };
    case UserActionKind.GET_WISHLIST_FAILURE:
      return {
        ...state,
        wishlist: [],
        wishlistLoading: false,
        error: action.error!,
      };

    case UserActionKind.ADD_TO_WISHLIST_START:
      return { ...state, wishlistUpdateLoading: true, error: null };
    case UserActionKind.ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload as ProductItemTypes],
        wishlistUpdateLoading: false,
        error: null,
      };
    case UserActionKind.ADD_TO_WISHLIST_FAILURE:
      return {
        ...state,
        wishlistUpdateLoading: false,
        error: action.error!,
      };

    case UserActionKind.REMOVE_FROM_WISHLIST_START:
      return { ...state, wishlistUpdateLoading: true, error: null };
    case UserActionKind.REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (i) => i.id !== (action.payload as string)
        ),
        wishlistUpdateLoading: false,
        error: null,
      };
    case UserActionKind.REMOVE_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        wishlistUpdateLoading: false,
        error: action.error!,
      };

    default:
      return state;
  }
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const values = {
    state,
    dispatch,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
