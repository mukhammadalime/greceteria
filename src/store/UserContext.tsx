import { createContext, useContext, useEffect, useReducer } from "react";
import { User } from "../utils/user-types";
import useAxiosPrivate from "../hooks/auth/useAxiosPrivate";
import { AuthContext } from "./AuthContext";

interface UserInitialStateTypes {
  user: User | null;
  loading: boolean;
  verifyLoading: boolean;
  resetLoading: boolean;
  changePassLoading: boolean;
  updateMeLoading: boolean;
  error: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum UserActionKind {
  GETME_START = "GETME_START",
  GETME_SUCCESS = "GETME_SUCCESS",
  GETME_FAILURE = "GETME_FAILURE",

  UPDATE_ME_START = "UPDATE_ME_START",
  UPDATE_ME_SUCCESS = "UPDATE_ME_SUCCESS",
  UPDATE_ME_FAILURE = "UPDATE_ME_FAILURE",

  CHANGE_PASSWORD_START = "CHANGE_PASSWORD_START",
  CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE",

  VERIFY_START = "VERIFY_START",
  VERIFY_SUCCESS = "VERIFY_SUCCESS",
  VERIFY_FAILURE = "VERIFY_FAILURE",

  RESET_PASSWORD_START = "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE",

  /////////////////////////////////////////

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
  payload?: User;
  error?: string;
}

const INITIAL_STATE: UserInitialStateTypes = {
  user: null,
  loading: false,
  verifyLoading: false,
  resetLoading: false,
  changePassLoading: false,
  updateMeLoading: false,
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
    //// GET ME
    case UserActionKind.GETME_START:
      return { ...state, loading: true, error: null };
    case UserActionKind.GETME_SUCCESS:
      localStorage.setItem("persist", JSON.stringify(true));
      return {
        ...state,
        user: action.payload as User,
        loading: false,
        error: null,
      };
    case UserActionKind.GETME_FAILURE:
      localStorage.removeItem("persist");
      return { ...state, user: null, loading: false, error: action.error! };

    //// UPDATE ME
    case UserActionKind.UPDATE_ME_START:
      return { ...state, updateMeLoading: true, error: null };
    case UserActionKind.UPDATE_ME_SUCCESS:
      return {
        ...state,
        user: action.payload as User,
        updateMeLoading: false,
        error: null,
      };
    case UserActionKind.UPDATE_ME_FAILURE:
      return { ...state, updateMeLoading: false, error: action.error! };

    //// CHANGE PASSWORD
    case UserActionKind.CHANGE_PASSWORD_START:
      return { ...state, changePassLoading: true, error: null };
    case UserActionKind.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload as User,
        changePassLoading: false,
        error: null,
      };
    case UserActionKind.CHANGE_PASSWORD_FAILURE:
      return { ...state, changePassLoading: false, error: action.error! };

    //// VERIFY
    case UserActionKind.VERIFY_START:
      return { ...state, user: null, verifyLoading: true, error: null };
    case UserActionKind.VERIFY_SUCCESS:
      return {
        ...state,
        user: action.payload as User,
        verifyLoading: false,
        error: null,
      };
    case UserActionKind.VERIFY_FAILURE:
      return {
        ...state,
        user: null,
        verifyLoading: false,
        error: action.error!,
      };

    //// RESET PASSWORD
    case UserActionKind.RESET_PASSWORD_START:
      return { ...state, user: null, resetLoading: true, error: null };
    case UserActionKind.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload as User,
        resetLoading: false,
        error: null,
      };
    case UserActionKind.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        user: null,
        resetLoading: false,
        error: action.error as string,
      };

    // case UserActionKind.GET_COMPARE_START:
    //   return { ...state, compareLoading: true, error: null };
    // case UserActionKind.GET_COMPARE_SUCCESS:
    //   return {
    //     ...state,
    //     compare: action.payload as ProductItemTypes[],
    //     compareLoading: false,
    //     error: null,
    //   };
    // case UserActionKind.GET_COMPARE_FAILURE:
    //   return {
    //     ...state,
    //     compare: [],
    //     compareLoading: false,
    //     error: action.error!,
    //   };

    // case UserActionKind.ADD_TO_COMPARE_START:
    //   return { ...state, compareUpdateLoading: true, error: null };
    // case UserActionKind.ADD_TO_COMPARE_SUCCESS:
    //   return {
    //     ...state,
    //     compare: action.payload as ProductItemTypes[],
    //     compareUpdateLoading: false,
    //     error: null,
    //   };
    // case UserActionKind.ADD_TO_COMPARE_FAILURE:
    //   return {
    //     ...state,
    //     compareUpdateLoading: false,
    //     error: action.error!,
    //   };

    // case UserActionKind.REMOVE_FROM_COMPARE_START:
    //   return { ...state, compareUpdateLoading: true, error: null };
    // case UserActionKind.REMOVE_FROM_COMPARE_SUCCESS:
    //   return {
    //     ...state,
    //     compare: action.payload as ProductItemTypes[],
    //     compareUpdateLoading: false,
    //     error: null,
    //   };
    // case UserActionKind.REMOVE_FROM_COMPARE_FAILURE:
    //   return {
    //     ...state,
    //     compareUpdateLoading: false,
    //     error: action.error!,
    //   };

    // case UserActionKind.GET_WISHLIST_START:
    //   return { ...state, wishlistLoading: true, error: null };
    // case UserActionKind.GET_WISHLIST_SUCCESS:
    //   return {
    //     ...state,
    //     wishlist: action.payload as ProductItemTypes[],
    //     wishlistLoading: false,
    //     error: null,
    //   };
    // case UserActionKind.GET_WISHLIST_FAILURE:
    //   return {
    //     ...state,
    //     wishlist: [],
    //     wishlistLoading: false,
    //     error: action.error!,
    //   };

    // case UserActionKind.ADD_TO_WISHLIST_START:
    //   return { ...state, wishlistUpdateLoading: true, error: null };
    // case UserActionKind.ADD_TO_WISHLIST_SUCCESS:
    //   return {
    //     ...state,
    //     wishlist: [...state.wishlist, action.payload as ProductItemTypes],
    //     wishlistUpdateLoading: false,
    //     error: null,
    //   };
    // case UserActionKind.ADD_TO_WISHLIST_FAILURE:
    //   return {
    //     ...state,
    //     wishlistUpdateLoading: false,
    //     error: action.error!,
    //   };

    // case UserActionKind.REMOVE_FROM_WISHLIST_START:
    //   return { ...state, wishlistUpdateLoading: true, error: null };
    // case UserActionKind.REMOVE_FROM_WISHLIST_SUCCESS:
    //   return {
    //     ...state,
    //     wishlist: state.wishlist.filter(
    //       (i) => i.id !== (action.payload as string)
    //     ),
    //     wishlistUpdateLoading: false,
    //     error: null,
    //   };
    // case UserActionKind.REMOVE_FROM_WISHLIST_FAILURE:
    //   return {
    //     ...state,
    //     wishlistUpdateLoading: false,
    //     error: action.error!,
    //   };

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

  const { auth } = useContext(AuthContext);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      dispatch({ type: UserActionKind.GETME_START });
      try {
        const { data } = await axiosPrivate.get("/users/me", {
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
        });
        isMounted &&
          dispatch({ type: UserActionKind.GETME_SUCCESS, payload: data.user });
      } catch (err) {
        console.error(err);
        dispatch({
          type: UserActionKind.GETME_FAILURE,
          payload: err.name,
        });
      }
    };

    auth.accessToken && getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [auth.accessToken, axiosPrivate]);

  const values = {
    state,
    dispatch,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
