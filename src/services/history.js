import toast from "react-hot-toast";
import { axiosCall } from "../utils";

export const addVideoToHistory = async (video) => {
  try {
    const resp = await axiosCall("/api/user/history", "post", {
      video,
    });
    const { data, status, response } = resp;
    if (data) return { history: data.history, status };
    if (response) throw new Error(response.data.message);
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const removeVideoFromHistory = async (videoId) => {
  try {
    const { data, status } = await axiosCall(
      `/api/user/history/${videoId}`,
      "delete"
    );
    if (status === 200) return { history: data.history, status };
  } catch (err) {
    toast.error("Failed to remove Video from History");
    console.log(err);
    return err;
  }
};

export const clearHistory = async () => {
  try {
    const { data, status } = await axiosCall("api/user/history/all", "delete");
    return { history: data.history, status };
  } catch (err) {
    toast.error("Failed to Clear History");
    console.log(err);
    return err;
  }
};
