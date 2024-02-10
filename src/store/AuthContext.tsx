import { createContext, useEffect, useReducer } from "react";
import { User } from "../utils/user-types";
import axios from "axios";

interface AuthInitialStateTypes {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum AuthActionKind {
  GETME_START = "GETME_START",
  GETME_SUCCESS = "GETME_SUCCESS",
  GETME_FAILURE = "GETME_FAILURE",

  LOGIN_START = "LOGIN_START",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",

  SIGNUP_START = "SIGNUP_START",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "SIGNUP_FAILURE",

  VERIFY_START = "VERIFY_START",
  VERIFY_SUCCESS = "VERIFY_SUCCESS",
  VERIFY_FAILURE = "VERIFY_FAILURE",

  SEND_V_CODE_START = "SEND_V_CODE_START",
  SEND_V_CODE_SUCCESS = "SEND_V_CODE_SUCCESS",
  SEND_V_CODE_FAILURE = "SEND_V_CODE_FAILURE",

  FORGOT_PASSWORD_START = "FORGOT_PASSWORD_START",
  FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE",

  RESET_PASSWORD_START = "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE",

  CHECK_RESET_TOKEN_START = "CHECK_RESET_TOKEN_START",
  CHECK_RESET_TOKEN_SUCCESS = "CHECK_RESET_TOKEN_SUCCESS",
  CHECK_RESET_TOKEN_FAILURE = "CHECK_RESET_TOKEN_FAILURE",

  UPDATE_ME_START = "UPDATE_ME_START",
  UPDATE_ME_SUCCESS = "UPDATE_ME_SUCCESS",
  UPDATE_ME_FAILURE = "UPDATE_ME_FAILURE",

  LOGOUT = "LOGOUT",
}

// An interface for our actions
export interface AuthAction {
  type: AuthActionKind;
  payload?: User | null;
  error?: string;
}

const INITIAL_STATE: AuthInitialStateTypes = {
  user: JSON.parse(localStorage.getItem("user")!) || null,
  loading: false,
  error: null,
  success: null,
};

export interface AuthContextTypes {
  state: AuthInitialStateTypes;
  dispatch: React.Dispatch<AuthAction>;
  getUser: () => void;
}

export const AuthContext = createContext<AuthContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
  getUser: async () => {},
});

const AuthReducer = (
  state: AuthInitialStateTypes,
  action: AuthAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case AuthActionKind.GETME_START:
      return { ...state, loading: true, error: null };
    case AuthActionKind.GETME_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload!));
      return { ...state, user: action.payload!, loading: false, error: null };
    case AuthActionKind.GETME_FAILURE:
      localStorage.removeItem("user");
      return { ...state, user: null, loading: false, error: action.error! };

    case AuthActionKind.LOGIN_START:
      return { ...state, user: null, loading: true, error: null };
    case AuthActionKind.LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload!));
      return { ...state, user: action.payload!, loading: false, error: null };
    case AuthActionKind.LOGIN_FAILURE:
      return { ...state, user: null, loading: false, error: action.error! };
    case AuthActionKind.LOGOUT:
      return { ...state, user: null, loading: false, error: null };

    case AuthActionKind.SIGNUP_START:
      return { ...state, user: null, loading: true, error: null };
    case AuthActionKind.SIGNUP_SUCCESS:
      return { ...state, user: null, loading: false, error: null };
    case AuthActionKind.SIGNUP_FAILURE:
      return { ...state, user: null, loading: false, error: action.error! };

    case AuthActionKind.VERIFY_START:
      return { ...state, user: null, loading: true, error: null };
    case AuthActionKind.VERIFY_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload!));
      return { ...state, user: action.payload!, loading: false, error: null };
    case AuthActionKind.VERIFY_FAILURE:
      return { ...state, user: null, loading: false, error: action.error! };

    case AuthActionKind.SEND_V_CODE_START:
      return { ...state, user: null, loading: true, error: null };
    case AuthActionKind.SEND_V_CODE_SUCCESS:
      return { ...state, user: null, loading: false, error: null };
    case AuthActionKind.SEND_V_CODE_FAILURE:
      return { ...state, user: null, loading: false, error: action.error! };

    case AuthActionKind.FORGOT_PASSWORD_START:
      return { ...state, user: null, loading: true, error: null };
    case AuthActionKind.FORGOT_PASSWORD_SUCCESS:
      return { user: null, loading: false, error: null, success: "success" };
    case AuthActionKind.FORGOT_PASSWORD_FAILURE:
      return { ...state, user: null, loading: false, error: action.error! };

    case AuthActionKind.RESET_PASSWORD_START:
      return { ...state, user: null, loading: true, error: null };
    case AuthActionKind.RESET_PASSWORD_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload!));
      return { ...state, user: action.payload!, loading: false, error: null };
    case AuthActionKind.RESET_PASSWORD_FAILURE:
      return { ...state, user: null, loading: false, error: action.error! };

    case AuthActionKind.CHECK_RESET_TOKEN_START:
      return { ...state, user: null, loading: true, error: null };
    case AuthActionKind.CHECK_RESET_TOKEN_SUCCESS:
      return { ...state, user: null, loading: false, error: null };
    case AuthActionKind.CHECK_RESET_TOKEN_FAILURE:
      return { ...state, user: null, loading: false, error: action.error! };

    case AuthActionKind.UPDATE_ME_START:
      return { ...state, loading: true, error: null };
    case AuthActionKind.UPDATE_ME_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload!));
      return { ...state, user: action.payload!, loading: false, error: null };
    case AuthActionKind.UPDATE_ME_FAILURE:
      return { ...state, loading: false, error: action.error! };

    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const getUser = async () => {
    if (JSON.parse(localStorage.getItem("user")!) === null) return;
    try {
      dispatch({ type: AuthActionKind.GETME_START });
      const { data } = await axios({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")!).token
          }`,
        },
        method: "GET",
        url: "http://localhost:8000/api/v1/users/me",
      });

      const userData = { token: data.token, ...data.user };
      dispatch({ type: AuthActionKind.GETME_SUCCESS, payload: userData });
    } catch (err: any) {
      console.log("err:", err);
      dispatch({
        type: AuthActionKind.GETME_FAILURE,
        error: err.response.data.message,
      });
    }
  };

  // Fetch user on every refresh to keep the user up to date with the database.
  useEffect(() => {
    getUser();
  }, []);

  const values = {
    state,
    dispatch,
    getUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
