import DetailProduct from "../Components/DetailProduct/DetailProduct";
import HomePage from "../Pages/HomePage";
import Login from "../Components/Auth/Login/Login";
import Register from "../Components/Auth/Login/Register";
import Cart from "../Components/Cart/Cart";
import Order from "../Components/Order/Order";
import OrderDetail from "../Components/Order/OrderDetail";
import Payment from "../Components/Payment/Payment";
import Content from "../Components/Admin/Content/Content";
import AdminProduct from "../Components/Admin/ProductAdmin/ProductAdmin";
const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/detail_product/:id", component: DetailProduct },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/cart", component: Cart },
  { path: "/order", component: Order },
  { path: "/order_detail", component: OrderDetail },
  { path: "/payment", component: Payment },
];

const privateRoutes = [
  { path: "/admin", component: Content },
  { path: "/admin/product", component: AdminProduct },
];

export { publicRoutes, privateRoutes };
