import { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthActionKind, AuthContext } from "../../store/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verification = () => {
  const [code, setCode] = useState<string>("");
  const handleChange = (code: string) => setCode(code);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    state: { loading },
    dispatch,
  } = useContext(AuthContext);

  const onVerifyHandler = async () => {
    if (!/^\d*$/.test(code)) {
      toast.error("Please enter only numbers");
      return;
    }

    try {
      dispatch({ type: AuthActionKind.VERIFY_START });

      const { data } = await axios({
        headers: { "Content-Type": "application/json" },
        method: "POST",
        url: "http://localhost:8000/api/v1/users/verify",
        data: { verificationCode: code },
      });

      dispatch({
        type: AuthActionKind.VERIFY_SUCCESS,
        payload: { token: data.token, ...data.user },
      });

      if (location.search.startsWith("?next-page")) {
        const link = location.search.match(/(?<==\s*).*?(?=\s*&)/gs);

        navigate(`/${String(link)}`);
      } else navigate("/home");
    } catch (err: any) {
      dispatch({
        type: AuthActionKind.VERIFY_FAILURE,
        error: err.response.data.message,
      });

      toast.error(err.response.data.message);
    }
  };

  const onSendCodeAgainHandler = async () => {
    try {
      dispatch({ type: AuthActionKind.SEND_V_CODE_START });

      const { data } = await axios({
        headers: { "Content-Type": "application/json" },
        method: "POST",
        url: "http://localhost:8000/api/v1/users/send-code-again",
        data: { username: location.search.split("=").pop() },
      });

      dispatch({ type: AuthActionKind.SEND_V_CODE_SUCCESS });
      toast.success(data.message);
    } catch (err: any) {
      dispatch({
        type: AuthActionKind.SEND_V_CODE_FAILURE,
        error: err.response.data.message,
      });

      toast.error(err.response.data.message);
    }

    setCode("");
  };

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Verify me</h6>
          <div className="form form-verification-box">
            <h6>Enter code sent to your email to get access</h6>
            <OtpInput
              value={code}
              onChange={handleChange}
              numInputs={6}
              renderSeparator={<span style={{ width: "8px" }} />}
              shouldAutoFocus={true}
              containerStyle="form-verification"
              renderInput={(props) => <input {...props} />}
            />
            <div className="form__buttons">
              <button
                className="button form__button"
                disabled={loading && true}
                onClick={onSendCodeAgainHandler}
              >
                Send again
              </button>
              <button
                className="button form__button"
                disabled={(loading || code?.length < 6) && true}
                onClick={onVerifyHandler}
              >
                Verify me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
