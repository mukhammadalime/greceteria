import { FormEvent, useContext, useEffect, useRef } from "react";
import PasswordInput from "../../components/UI/Inputs/PasswordInput";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthActionKind, AuthContext } from "../../store/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const { resetToken } = useParams();

  const {
    state: { loading },
    dispatch,
  } = useContext(AuthContext);

  // Check if token is valid or has not yet expired. If either of them happens, the user will be redirected to the "forgot-password" page.
  useEffect(() => {
    const checkResetTokenExist = async () => {
      try {
        await axios({
          headers: { "Content-Type": "application/json" },
          method: "GET",
          url: `http://localhost:8000/api/v1/users/checkResetToken/${resetToken}`,
        });
      } catch (err: any) {

        toast.error(
          err.response.data.message +
            '. You will be redirected to the "Forgot password" page in 5 seconds.'
        );

        setTimeout(() => {
          navigate(`/auth/forgot-password${location.search}`);
        }, 5000);
      }
    };
    checkResetTokenExist();
  }, [resetToken, navigate, location]);

  const onResetPasswordHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;

    if (!passwordConfirm || !password) return;

    try {
      dispatch({ type: AuthActionKind.RESET_PASSWORD_START });

      const { data } = await axios({
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        url: `http://localhost:8000/api/v1/users/resetPassword/${resetToken}`,
        data: { password, passwordConfirm },
      });

      dispatch({
        type: AuthActionKind.RESET_PASSWORD_SUCCESS,
        payload: { token: data.token, ...data.user },
      });

      if (location.search.startsWith("?next-page"))
        navigate(`/${location.search.split("=")[1]}`);
      else navigate("/home");

      toast.success("Password has been successfully reset.");
    } catch (err: any) {
      dispatch({
        type: AuthActionKind.RESET_PASSWORD_FAILURE,
        error: err.response.data.message,
      });

      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Reset Password</h6>
          <form className="form" onSubmit={onResetPasswordHandler}>
            <PasswordInput
              label="Password"
              placeholder="Password"
              ref={passwordRef}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm Password"
              ref={passwordConfirmRef}
            />
            <button className="button form__button" disabled={loading && true}>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
