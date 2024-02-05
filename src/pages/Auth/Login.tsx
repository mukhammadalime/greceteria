import { Link, useLocation, useNavigate } from "react-router-dom";
import TextInput from "../../components/UI/Inputs/TextInput";
import PasswordInput from "../../components/UI/Inputs/PasswordInput";
import { FormEvent, useContext, useRef } from "react";
import axios from "axios";
import { AuthActionKind, AuthContext } from "../../store/AuthContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const {
    state: { loading },
    dispatch,
  } = useContext(AuthContext);

  const onLoginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) return;

    try {
      dispatch({ type: AuthActionKind.LOGIN_START });

      const { data } = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "http://localhost:8000/api/v1/users/login",
        data: { username, password },
      });

      dispatch({
        type: AuthActionKind.LOGIN_SUCCESS,
        payload: { token: data.token, ...data.user },
      });

      if (location.search !== "") navigate(`/${location.search.split("=")[1]}`);
      else navigate("/home");
    } catch (err: any) {
      dispatch({
        type: AuthActionKind.LOGIN_FAILURE,
        error: err.response.data.message,
      });

      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Sign in</h6>
          <form className="form" onSubmit={onLoginHandler}>
            <div className="third-party-login">
              <button>
                <img src="/assets/icons/google-icon.svg" alt="" /> Google
              </button>
              <button>
                <img src="/assets/icons/github-icon.svg" alt="" /> GitHub
              </button>
            </div>
            <div className="or">or</div>
            <TextInput
              label="Email | Username"
              placeholder="Email | Username"
              type="text"
              ref={userNameRef}
            />

            <PasswordInput
              label="Password"
              placeholder="Password"
              ref={passwordRef}
            />
            <div className="form__content">
              <h4 onClick={() => navigate("/auth/forgot-password")}>
                Forgot you password?
              </h4>
            </div>
            <button className="button form__button" disabled={loading && true}>
              Sign in
            </button>
            <div className="form__signup">
              Don't have account?{" "}
              <Link to="/auth/signup" className="form__signup--text">
                Sing up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
