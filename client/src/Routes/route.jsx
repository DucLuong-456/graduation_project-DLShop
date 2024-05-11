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
import CreateProduct from "../Components/Admin/ProductAdmin/CreateProduct";
import UpdateProduct from "../Components/Admin/ProductAdmin/UpdateProduct";
import CategoryAdmin from "../Components/Admin/CategoryAdmin/CategoryAdmin";
import CreateCategory from "../Components/Admin/CategoryAdmin/CreateCategory";
import UpdateCategory from "../Components/Admin/CategoryAdmin/UpdateCategory";
import UserInfor from "../Components/UserInfor/UserInfor";
import ReportAdmin from "../Components/Admin/ReportAdmin/ReportAdmin";
import ReportRevenue from "../Components/Admin/ReportAdmin/ReportRevenue";
import ReportRevenueOrder from "../Components/Admin/ReportAdmin/ReportRevenueOrder";
import UserAdmin from "../Components/UserAdmin/UserAdmin";
import UpdateUser from "../Components/UserAdmin/UpdateUser";
import OrderAdmin from "../Components/Admin/OrderAdmin/OrderAdmin";
import OrderDetailAdmin from "../Components/Admin/OrderAdmin/OrderDetailAdmin";
const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/detail_product/:id", component: DetailProduct },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/cart", component: Cart },
  { path: "/order", component: Order },
  { path: "/order_detail/:id", component: OrderDetail },
  { path: "/payment", component: Payment },
  { path: "/user-infor", component: UserInfor },
];

const privateRoutes = [
  { path: "/admin", component: Content },
  { path: "/admin/product", component: AdminProduct },
  { path: "/admin/create_product", component: CreateProduct },
  { path: "/admin/update_product/:id", component: UpdateProduct },
  { path: "/admin/category", component: CategoryAdmin },
  { path: "/admin/create_category", component: CreateCategory },
  { path: "/admin/update_category/:id", component: UpdateCategory },
  { path: "/admin/report/stock", component: ReportAdmin },
  { path: "/admin/report/product_revenue", component: ReportRevenue },
  { path: "/admin/report/order_revenue", component: ReportRevenueOrder },
  { path: "/admin/order", component: OrderAdmin },
  { path: "/admin/order_detail/:id", component: OrderDetailAdmin },

  { path: "/admin/user", component: UserAdmin },
  { path: "/admin/updateUser/:id", component: UpdateUser },
];

export { publicRoutes, privateRoutes };
