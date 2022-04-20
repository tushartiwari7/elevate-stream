import { createContext, useState, useContext } from "react";
import React from "react";
import {
  getUser,
  addNewUser,
  addLikedVideo,
  removeLikedVideo,
  addSavedVideo,
  removeSavedVideo,
} from "../../services";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false });
  const navigator = useNavigate();
  const [params] = useSearchParams();

  const loginHandler = async ({ email, password }) => {
    const {
      data: { foundUser, encodedToken },
    } = await getUser(email, password);
    localStorage.setItem("token", encodedToken);
    setUser({ ...foundUser, isLoggedIn: true });
    toast.success("Login Successful");
    navigator(params.get("redirect") || "/explore", { replace: true });
  };

  const signupHandler = async (e, userInputCreds) => {
    e.preventDefault();
    const {
      data: { createdUser, encodedToken },
      status,
    } = await addNewUser(userInputCreds);
    if (status === 201) {
      localStorage.setItem("token", encodedToken);
      setUser({ ...createdUser, isLoggedIn: true });
      toast.success("Signup Successful");
      navigator(params.get("redirect") || "/explore", { replace: true });
    } else {
      toast.error("Signup Failed");
    }
  };

  const likedVideosHandler = async (video, add = true) => {
    if (!user.isLoggedIn) {
      toast.error("Please Login to like videos");
      return navigator(`/login?redirect=${location.pathname}`, {
        replace: true,
      });
    }
    if (add) {
      const { likes } = await addLikedVideo(video);
      setUser((user) => ({ ...user, likes }));
      return toast.success("Video added to liked videos");
    }
    const { likes } = await removeLikedVideo(video);
    setUser((user) => ({ ...user, likes }));
    return toast.success("Video removed from liked videos");
  };

  const savedVideosHandler = async (video, add = true) => {
    if (!user.isLoggedIn) {
      toast.error("Please Login to Save videos");
      return navigator(`/login?redirect=${location.pathname}`, {
        replace: true,
      });
    }
    if (add) {
      const { saved } = await addSavedVideo(video);
      setUser((user) => ({ ...user, saved }));
      return toast.success("Added to Saved videos");
    }
    const { saved } = await removeSavedVideo(video);
    setUser((user) => ({ ...user, saved }));
    return toast.success("Removed from Saved videos");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handlers: {
          loginHandler,
          signupHandler,
          likedVideosHandler,
          savedVideosHandler,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
