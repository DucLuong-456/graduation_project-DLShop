import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({ data: [], paging: {} });
  const [orders, setOrders] = useState({ orders: [], user_name: "" });
  const [ordersAdmin, setOrdersAdmin] = useState({ orders: [], user_name: "" });
  const [cart, setCart] = useState({ data: [], total_money: 0 });
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [callback, setCallBack] = useState(false);

  useEffect(() => {
    const isCheckLogin = localStorage.getItem("Login");
    if (isCheckLogin) {
      const accessToken = localStorage.getItem("accessToken");
      setToken(accessToken);
    }
    // category
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/category/`
        );
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    // banner
    const getBanners = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/upload/banner`
        );
        setBanners(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    //product
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/product/`
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    //user-role
    const getUser = async (token) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/user/getInfor`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsLogged(true);
        res.data.data.role_id === 2 ? setIsAdmin(true) : setIsAdmin(false);
      } catch (error) {
        alert(error.response.data.msg);
      }
    };
    //order
    const getOrder = async (token) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/order`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setOrders(res.data.data);
      } catch (error) {
        alert(error.response.data.msg);
      }
    };
    //order - for- admin
    const getOrderByAdmin = async (token) => {
      try {
        if (isAdmin === true) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_KEY}/api/order/getAllOrder`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setOrdersAdmin(res.data.data);
        }
      } catch (error) {
        alert(error.response.data.msg);
      }
    };
    //get Cart
    const getCart = async (token) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/user/cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCart(res.data);
      } catch (error) {
        alert(error.response.data.msg);
      }
    };

    //getUserInfor
    const getUserInfor = async (token) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/user/getInfor`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(res.data.data);
      } catch (error) {
        alert(error.response.data.msg);
      }
    };

    //list user
    const getListUser = async (token) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/user/getAllUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUsers(res.data);
      } catch (error) {
        alert(error.response.data.msg);
      }
    };
    //call api
    getCategories();
    getProducts();
    getBanners();
    console.log(token);
    if (token) {
      getUser(token);
      getCart(token);
      getOrder(token);
      getOrderByAdmin(token);
      getUserInfor(token);
      getListUser(token);
    }
  }, [token, isLogged, callback]);
  return (
    <AppContext.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        ordersAdmin,
        setOrdersAdmin,
        orders,
        setOrders,
        cart,
        setCart,
        token,
        setToken,
        user,
        setUser,
        users,
        setUsers,
        banners,
        setBanners,
        isAdmin,
        isLogged,
        setIsLogged,
        setCallBack,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
