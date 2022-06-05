import axios from "axios";
import toast from "react-hot-toast";
import { axiosCall } from "../utils";

export const getUser = async (email, password) => {
  try {
    const { data, status } = await axiosCall("/api/auth/login", "post", {
      email,
      password,
    });
    return { data, status };
  } catch (error) {
    toast.error("Invalid Credentials");
    return error;
  }
};

export const addNewUser = async (userCreds) => {
  try {
    const { data, status } = await axios.post("/api/auth/signup", userCreds);
    return { data, status };
  } catch (error) {
    toast.error("Signup Failed");
    return error;
  }
};

export const updateUser = async (userDetails) => {
  try {
    const { data, status } = await axiosCall("/api/auth/update", "post", {
      userDetails,
    });
    return { updatedUser: data.updatedUser, status };
  } catch (error) {
    toast.error("Something went wrong: Update User Failed");
    return error;
  }
};
