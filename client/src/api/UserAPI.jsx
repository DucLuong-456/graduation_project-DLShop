import { useState, useEffect } from "react";
import axios from "axios";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token !== "") {
      const getUser = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_KEY}/api/user/getInfor`,
            {
              headers: { Authorization: token },
            }
          );
          console.log(res.data);
          setIsLogged(true);
          res.data.data.role_id === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
  };
};

export default UserAPI;
