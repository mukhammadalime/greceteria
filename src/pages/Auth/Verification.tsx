import { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import { sendCodeAgain, verify } from "../../api/auth";

const Verification = () => {
  const [code, setCode] = useState<string>("");
  const handleChange = (code: string) => setCode(code);
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(AuthContext);

  const onVerifyHandler = async () => {
    await verify(dispatch, code, location, navigate);
  };

  const onSendCodeAgainHandler = async () => {
    await sendCodeAgain(dispatch, setCode, location);
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
                disabled={state.loading && true}
                onClick={onSendCodeAgainHandler}
              >
                Send again
              </button>
              <button
                className="button form__button"
                disabled={(state.loading || code?.length < 6) && true}
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
