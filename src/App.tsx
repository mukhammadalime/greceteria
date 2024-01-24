import { Navigate, Route, Routes } from "react-router-dom";
import LayoutWrapper from "./layout";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;
