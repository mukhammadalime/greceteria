import { Link, useLocation, useNavigate } from "react-router-dom";
import TextInput from "../../components/UI/Inputs/TextInput";
import PasswordInput from "../../components/UI/Inputs/PasswordInput";
import { FormEvent, useContext, useRef, useState } from "react";
import { login } from "../../api/auth";
import { AuthContext } from "../../store/AuthContext";
import { UserContext } from "../../store/UserContext";
import LoadingButtonSpinner from "../../components/UI/Icons/LoadingButtonSpinner";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useContext(UserContext);
  const { setAuth } = useContext(AuthContext);

  const onLoginHandler = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const username = userNameRef.current?.value!;
    const password = passwordRef.current?.value!;
    setLoading(true);
    await login(setAuth, location, navigate, dispatch, { username, password });
    setLoading(false);
  };

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Sign in</h6>
          <div className="form">
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
              <h4
                onClick={() =>
                  navigate(`/auth/forgot-password${location.search}`)
                }
              >
                Forgot you password?
              </h4>
            </div>
            <div className="form__buttons">
              <button
                className="button form__button"
                disabled={loading && true}
                children={loading ? <LoadingButtonSpinner /> : "Sign in"}
                type="submit"
                onClick={onLoginHandler}
              />
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  setLoading(true);
                  const token = credentialResponse.credential!;
                  await login(setAuth, location, navigate, dispatch, { token });
                  setLoading(false);
                }}
                type="icon"
                onError={() => {
                  toast.error("Failed to sign in with google.");
                }}
              />
            </div>
            <div className="form__signup">
              Don't have account?{" "}
              <Link
                to={`/auth/signup${location.search}`}
                className="form__signup--text"
                children="Sign up"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
