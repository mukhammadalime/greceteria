import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Verification from "./Verification";

const Auth = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Verification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Auth;
