import { createContext, useState, useContext } from "react";
import React from "react";
import { getUser } from "../../services";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false });
  const navigator = useNavigate();
  const [params] = useSearchParams();

  const loginHandler = async ({ email, password }) => {
    const {
      data: { foundUser },
    } = await getUser(email, password);
    setUser({ ...foundUser, isLoggedIn: true });
    toast.success("Login Successful");
    navigator(params.get("redirect") || "/explore", { replace: true });
  };

  return (
    <UserContext.Provider value={{ user, handlers: { loginHandler } }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
