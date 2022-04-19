import { createContext, useState, useContext } from "react";
import React from "react";
import { getUser, addNewUser } from "../../services";
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

  const signupHandler = async (e, userInputCreds) => {
    e.preventDefault();
    const {
      data: { createdUser },
      status,
    } = await addNewUser(userInputCreds);
    if (status === 201) {
      setUser({ ...createdUser, isLoggedIn: true });
      toast.success("Signup Successful");
      navigator(params.get("redirect") || "/explore", { replace: true });
    } else {
      toast.error("Signup Failed");
    }
  };

  return (
    <UserContext.Provider
      value={{ user, handlers: { loginHandler, signupHandler } }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
