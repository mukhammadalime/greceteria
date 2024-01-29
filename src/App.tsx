import { Navigate, Route, Routes } from "react-router-dom";
import LayoutWrapper from "./layout";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import AboutUs from "./pages/AboutShop/AboutUs";
import ContactUs from "./pages/AboutShop/ContactUs";
import CustomerCenter from "./pages/AboutShop/CustomerCenter";
import TermsAndPrivacy from "./pages/AboutShop/TermsAndPrivacy";
import NewsPage from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import OrderHistory from "./pages/OrderHistory";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/User/Wishlist";
import Cart from "./pages/User/Cart";
import Compare from "./pages/User/Compare";
import Checkout from "./pages/User/Checkout";
import Dashboard from "./pages/User/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Settings from "./pages/User/Settings";
import OrderDetails from "./pages/User/OrderDetails";
import Statistics from "./pages/Admin/Statistics";
import CustomerDetails from "./pages/Admin/CustomerDetails";
import Categories from "./pages/Admin/Categories";
import Customers from "./pages/Admin/Customers";

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
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:newsId" element={<NewsDetails />} />

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/my-dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:customerId" element={<CustomerDetails />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;
