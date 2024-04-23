import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [token, setToken] = useState(false);

  useEffect(() => {
    const isCheckLogin = localStorage.getItem("Login");
    if (isCheckLogin) {
      const refreshToken = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_KEY}/api/user/refresh_token`
          );
          setToken(res.data.accessToken);
          setTimeout(() => {
            refreshToken();
          }, 10 * 60 * 1000);
        } catch (error) {
          console.log(error.response.data.msg);
        }
      };
      refreshToken();
    }
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/category/`
        );
        setCategories(response.data.data);
        console.log(categories);
      } catch (error) {
        console.log(error);
      }
    };

    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/product/`
        );
        setProducts(response.data);
        console.log(products);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
    getProducts();
  }, []);

  return (
    <AppContext.Provider value={{ categories, products, token }}>
      {children}
    </AppContext.Provider>
  );
};
