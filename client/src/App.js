import "./App.css";
import DetailProduct from "./Components/DetailProduct/DetailProduct";
// import LayoutDefault from "./Components/Common/LayoutDefault/LayoutDefault";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./Pages/Page";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Login/Register";
import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import Order from "./Components/Order/Order";
import OrderDetail from "./Components/Order/OrderDetail";
function App() {
  return (
    <>
      <Router>
        {/* <LayoutDefault /> */}
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detailproduct" element={<DetailProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order_detail" element={<OrderDetail />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
