import axios from "axios";
import toast from "react-hot-toast";

export const getUser = async (email, password) => {
  try {
    const { data, status } = await axios.post("/api/auth/login", {
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
