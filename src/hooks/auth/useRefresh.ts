import { useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../store/AuthContext";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const { data } = await axios.get("/users/refresh");

    setAuth({ accessToken: data.accessToken });

    return data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
