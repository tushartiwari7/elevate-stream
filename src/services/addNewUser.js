import axios from "axios";
import toast from "react-hot-toast";

export const addNewUser = async (userCreds) => {
  try {
    const { data, status } = await axios.post("/api/auth/signup", userCreds);
    return { data, status };
  } catch (error) {
    toast.error("Signup Failed");
    return error;
  }
};
