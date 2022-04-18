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
