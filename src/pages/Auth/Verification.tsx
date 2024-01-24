import { useState } from "react";
import OtpInput from "react-otp-input";
// import OtpInput from "react18-otp-input";

const Verification = () => {
  const [code, setCode] = useState<string>();
  const handleChange = (code: string) => setCode(code);

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Verify me</h6>
          <form className="form form-verification-box">
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
              <button className="button form__button">Send again</button>
              <button className="button form__button">Verify me</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verification;
