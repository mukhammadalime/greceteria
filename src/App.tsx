import { Navigate, Route, Routes } from "react-router-dom";
import LayoutWrapper from "./layout/LayoutWrapper";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop/Shop";
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
import Categories from "./pages/User/Categories";
import Customers from "./pages/Admin/Customers";
import { useContext, useEffect, useLayoutEffect } from "react";
import { ToastContainer, Flip } from "react-toastify";
import CartIcon from "./components/UI/Icons/CartIcon";
import "react-toastify/dist/ReactToastify.css";
import ProductsByCategory from "./pages/User/ProductsByCategory";
import { UserContext } from "./store/UserContext";
import AuthPages from "./pages/Auth/AuthPages";
import { getCartApi } from "./api/cart";
import { CartActionKind, CartContext } from "./store/CartContext";
import { getNewsApi } from "./api/news";
import { NewsActionKind, NewsContext } from "./store/NewsContext";

function App() {
  const {
    state: { user },
  } = useContext(UserContext);

  const { dispatch } = useContext(CartContext);
  const { dispatch: newsDispatch } = useContext(NewsContext);

  useLayoutEffect(() => {
    if (!user) return;
    newsDispatch({ type: NewsActionKind.GET_NEWS_START });
    dispatch({ type: CartActionKind.GET_CART_START });
  }, [newsDispatch, dispatch, user]);

  // Fetch cart and news on every refresh to keep the data up to date with the database.
  useEffect(() => {
    if (!user) return;
    (async () => {
      await Promise.all([getNewsApi(newsDispatch), getCartApi(dispatch)]);
    })();
  }, [user, dispatch, newsDispatch]);

  return (
    <>
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
          limit={1}
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
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/categories/:categoryId"
            element={<ProductsByCategory />}
          />

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

          {user === null && <Route path="/auth/*" element={<AuthPages />} />}

          {/* Admin and Manager routes */}
          {user && user.role === "admin" && (
            <>
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/customers" element={<Customers />} />
              <Route
                path="/customers/:customerId"
                element={<CustomerDetails />}
              />
            </>
          )}

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </LayoutWrapper>
    </>
  );
}

export default App;
