import { Navigate, Route, Routes } from "react-router-dom";
import LayoutWrapper from "./layout";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import AboutUs from "./pages/AboutShop/AboutUs";
import ContactUs from "./pages/AboutShop/ContactUs";
import CustomerCenter from "./pages/AboutShop/CustomerCenter";
import TermsAndPrivacy from "./pages/AboutShop/TermsAndPrivacy";

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/customer-center" element={<CustomerCenter />} />
        <Route path="/terms-privacy" element={<TermsAndPrivacy />} />

        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;
