import { toast } from "react-toastify";
import axios from "./axios";
import { AuthInitialStateTypes } from "../store/AuthContext";
import { UserAction, UserActionKind } from "../store/UserContext";
import { AxiosInstance } from "axios";

export const login = async (
  setAuth: React.Dispatch<React.SetStateAction<AuthInitialStateTypes>>,
  userData: { username: string | undefined; password: string | undefined },
  location: { search: string },
  navigate: (arg: string) => void,
  userDispatch: React.Dispatch<UserAction>
) => {
  const { username, password } = userData;

  if (!username || !password) toast.warning("Please fill in all the inputs.");

  try {
    const { data } = await axios.post("/users/login", {
      username,
      password,
    });
    setAuth({ accessToken: data.accessToken });
    userDispatch({ type: UserActionKind.GETME_SUCCESS, payload: data.user });

    if (location.search.startsWith("?next-page"))
      navigate(`/${location.search.split("=")[1]}`);
    else navigate("/home");
    // window.location.reload();
  } catch (err: any) {
    userDispatch({
      type: UserActionKind.GETME_FAILURE,
      error: err.response?.data.message,
    });
    if (err.response?.data.message.startsWith("Your account")) {
      navigate(`/auth/verify?username=${username}`);
    }

    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const logout = async (
  dispatch: React.Dispatch<React.SetStateAction<AuthInitialStateTypes>>,
  axiosPrivate: AxiosInstance
) => {
  try {
    dispatch({ accessToken: null });
    await axiosPrivate.get("/users/logout");

    localStorage.removeItem("persist");
    window.location.reload();
  } catch (err: any) {
    toast.error(err.response?.data?.message);
  }
};

export const signup = async (
  userData: {
    username: string | undefined;
    password: string | undefined;
    name: string | undefined;
    email: string | undefined;
    passwordConfirm: string | undefined;
    agreement: boolean | undefined;
  },
  location: { search: string },
  navigate: (arg0: string) => void
) => {
  const { username, password, name, email, passwordConfirm, agreement } =
    userData;

  if (
    !username ||
    !password ||
    !name ||
    !email ||
    !passwordConfirm ||
    !agreement
  ) {
    return toast.warning("Please fill in all the inputs.");
  }
  try {
    const userData = { name, username, email, password, passwordConfirm };

    const { data } = await axios.post("/users/signup", userData);

    toast.success(data.message);
    if (location.search !== "") {
      navigate(`/auth/verify${location.search}&username=${data.username}`);
    } else {
      navigate(`/auth/verify?username=${data.username}`);
    }
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const verify = async (
  dispatch: React.Dispatch<UserAction>,
  verificationCode: string,
  location: { search: string },
  navigate: (arg0: string) => void,
  setAuth: React.Dispatch<React.SetStateAction<AuthInitialStateTypes>>
) => {
  if (!/^\d*$/.test(verificationCode)) {
    toast.warning("Please enter only numbers");
    return;
  }

  try {
    dispatch({ type: UserActionKind.VERIFY_START });

    const { data } = await axios.post("/users/verify", {
      verificationCode,
    });
    console.log("data:", data);

    setAuth({ accessToken: data.accessToken });

    dispatch({ type: UserActionKind.VERIFY_SUCCESS, payload: data.user });

    toast.success("You`ve successfully registered.");

    if (location.search.startsWith("?next-page")) {
      navigate(`/${String(location.search.match(/(?<==\s*).*?(?=\s*&)/gs))}`);
    } else navigate("/home");
  } catch (err: any) {
    dispatch({
      type: UserActionKind.VERIFY_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const sendCodeAgain = async (
  setCode: (i: string) => void,
  location: { search: string }
) => {
  try {
    const { data } = await axios.post("/users/send-code-again", {
      username: location.search.split("=").pop(),
    });

    toast.success(data.message);
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }

  setCode("");
};

export const forgotPassword = async (
  email: string | undefined,
  location: { search: string }
) => {
  if (!email) toast.warning("Please enter the email.");
  try {
    const requestData = { email, searchLink: location.search };
    const { data } = await axios.post("users/forgotPassword", requestData);
    localStorage.setItem("forgotPassSuccess", JSON.stringify(true));
    toast.success(data.message);
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const resetPassword = async (
  dispatch: React.Dispatch<UserAction>,
  passwords: {
    password: string | undefined;
    passwordConfirm: string | undefined;
  },
  resetToken: string | undefined,
  location: { search: string },
  navigate: (arg0: string) => void,
  setAuth: React.Dispatch<React.SetStateAction<AuthInitialStateTypes>>
) => {
  const { password, passwordConfirm } = passwords;
  if (!passwordConfirm || !password)
    toast.warning("Please fill in all the inputs.");

  try {
    dispatch({ type: UserActionKind.RESET_PASSWORD_START });
    const { data } = await axios.patch(`/users/resetPassword/${resetToken}`, {
      password,
      passwordConfirm,
    });

    setAuth({ accessToken: data.accessToken });

    dispatch({
      type: UserActionKind.RESET_PASSWORD_SUCCESS,
      payload: data.user,
    });

    if (location.search.startsWith("?next-page"))
      navigate(`/${location.search.split("=")[1]}`);
    else navigate("/home");

    localStorage.removeItem("forgotPassSuccess");
    toast.success("Password has been successfully reset.");
  } catch (err: any) {
    dispatch({
      type: UserActionKind.RESET_PASSWORD_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const checkResetTokenExistApi = async (
  resetToken: string | undefined,
  location: { search: string },
  navigate: (arg0: string) => void
) => {
  try {
    await axios(`/users/checkResetToken/${resetToken}`);
  } catch (err: any) {
    toast.error(
      err.response?.data.message +
        '. You will be redirected to the "Forgot password" page in 5 seconds.'
    );

    localStorage.removeItem("forgotPassSuccess");
    setTimeout(() => navigate(`/auth/forgot-password${location.search}`), 5000);
  }
};

export const changeMyPassword = async (
  dispatch: React.Dispatch<UserAction>,
  currentPasswordRef: React.RefObject<HTMLInputElement>,
  newPasswordRef: React.RefObject<HTMLInputElement>,
  newPasswordConfirmRef: React.RefObject<HTMLInputElement>,
  setAuth: React.Dispatch<React.SetStateAction<AuthInitialStateTypes>>,
  axiosPrivate: AxiosInstance
) => {
  const currentPassword = currentPasswordRef.current?.value;
  const password = newPasswordRef.current?.value;
  const passwordConfirm = newPasswordConfirmRef.current?.value;

  if (!currentPassword || !password || !passwordConfirm)
    return toast.warning("Please fill in all the inputs.");

  try {
    dispatch({ type: UserActionKind.CHANGE_PASSWORD_START });

    const { data } = await axios.patch("/users/updateMyPassword", {
      currentPassword,
      password,
      passwordConfirm,
    });

    setAuth({ accessToken: data.accessToken });
    dispatch({
      type: UserActionKind.CHANGE_PASSWORD_SUCCESS,
      payload: data.user,
    });
    toast.success("Your password's been successfully updated.");

    currentPasswordRef.current.value = "";
    newPasswordRef.current.value = "";
    newPasswordConfirmRef.current.value = "";
  } catch (err: any) {
    dispatch({
      type: UserActionKind.CHANGE_PASSWORD_FAILURE,
      error: err.response?.data.message,
    });
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};
