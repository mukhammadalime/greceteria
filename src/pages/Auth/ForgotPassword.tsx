import TextInput from "../../components/UI/Inputs/TextInput";
import { FormEvent, useContext, useRef } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useContext(AuthContext);

  const onForgotPasswordHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    await forgotPassword(dispatch, email, location);
  };

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          {state.success === null && (
            <>
              <h6>Enter your email</h6>
              <form className="form" onSubmit={onForgotPasswordHandler}>
                <TextInput
                  text="Your email"
                  placeholder="laurawilson@example.com"
                  type="email"
                  ref={emailRef}
                />
                <button
                  className="button form__button"
                  children="Enter"
                  disabled={state.loading && true}
                />
              </form>
            </>
          )}

          {state.success && (
            <div className="forgotPassword-success">
              <h6>Reset your password</h6>
              <p>
                Check your email for a link to reset your password. If it
                doesn't appear within a few minutes, check your spam folder.
              </p>
              <button
                className="button form__button"
                children="Return to sign in"
                onClick={() => navigate("/auth/signin")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
