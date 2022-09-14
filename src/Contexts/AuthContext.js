import { useState, createContext, useContext, useEffect, useRef } from "react";
import { getUser } from "../Services/users";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  let tokenRef = useRef(localStorage.getItem("accessToken"));
  const [authValue, setAuthValue] = useState({ user: null, token: null });

  useEffect(() => {
    if (tokenRef.current && !authValue.user) {
      const token = tokenRef.current;
      getUser().then((user) => setAuthValue({ user: user.user, token }));
    }
    tokenRef.current = null;
  }, [tokenRef]);

  const handleOnLogin = async ({ user, token }) => {
    setAuthValue({ user, token });
    localStorage.setItem("accessToken", token);
  };

  const handleOnLogout = () => {
    setAuthValue({ user: null, token: null });
    localStorage.setItem("accessToken", "");
  };

  const handleCalorieChange = (obj) => {
    setAuthValue({ user: obj });
  };

  const value = {
    user: authValue.user,
    token: authValue.token,
    onLogin: handleOnLogin,
    onLogout: handleOnLogout,
    handleCalorieChange: handleCalorieChange,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
