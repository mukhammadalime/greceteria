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
import Settings from "./pages/User/Settings";
import OrderDetails from "./pages/User/OrderDetails";
import Statistics from "./pages/Admin/Statistics";
import CustomerDetails from "./pages/Admin/CustomerDetails";
import Categories from "./pages/Admin/Categories";
import Customers from "./pages/Admin/Customers";
import { useContext, useEffect } from "react";
import { AuthContext } from "./store/AuthContext";
import { ToastContainer, Flip } from "react-toastify";
import CartIcon from "./components/UI/Icons/CartIcon";
import "react-toastify/dist/ReactToastify.css";
import { ProductActionKind, ProductContext } from "./store/ProductContext";
import axios from "axios";

function App() {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { dispatch } = useContext(ProductContext);

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch({ type: ProductActionKind.GET_PRODUCTS_START });
        const { data } = await axios({
          headers: { "Content-Type": "application/json" },
          method: "GET",
          url: "http://localhost:8000/api/v1/products",
        });

        dispatch({
          type: ProductActionKind.GET_PRODUCTS_SUCCESS,
          payload: data.data,
        });
      } catch (err: any) {
        console.log("err:", err);
        dispatch({
          type: ProductActionKind.GET_PRODUCTS_FAILURE,
          error: err.response.data.message,
        });
      }
    };

    getProducts();
  }, [dispatch]);

  return (
    <LayoutWrapper>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        style={{ fontSize: "1.5rem" }}
        pauseOnFocusLoss={false}
        newestOnTop={true}
        transition={Flip}
        draggablePercent={60}
        icon={<CartIcon />}
      />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderHistory />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/terms-privacy" element={<TermsAndPrivacy />} />
        <Route path="/customer-center" element={<CustomerCenter />} />
        <Route path="/products/:productId" element={<ProductDetails />} />

        {/* User logged in routes */}
        {user !== null && (
          <>
            <Route path="/settings" element={<Settings />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/news/:newsId" element={<NewsDetails />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
          </>
        )}

        {user === null && <Route path="/auth/*" element={<Auth />} />}

        {/* Admin and Manager routes */}
        {user && user.role === "admin" && (
          <>
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/customers" element={<Customers />} />
            <Route
              path="/customers/:customerId"
              element={<CustomerDetails />}
            />
            <Route path="/categories" element={<Categories />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;
