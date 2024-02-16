import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/sass/main.scss";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./store/AuthContext";
import { ProductContextProvider } from "./store/ProductContext";
import { CategoryContextProvider } from "./store/CategoryContext";
import { NewsContextProvider } from "./store/NewsContext";
import { CartContextProvider } from "./store/CartContext";
import { UserContextProvider } from "./store/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthContextProvider>
    <UserContextProvider>
      <CategoryContextProvider>
        <NewsContextProvider>
          <CartContextProvider>
            <ProductContextProvider>
              <BrowserRouter>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </BrowserRouter>
            </ProductContextProvider>
          </CartContextProvider>
        </NewsContextProvider>
      </CategoryContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);

reportWebVitals();
