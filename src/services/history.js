import axios from "axios";
import toast from "react-hot-toast";

export const addVideoToHistory = async (video) => {
  const token = localStorage.getItem("token");
  try {
    const { data, status } = await axios({
      url: `/api/user/history`,
      method: "POST",
      data: { video },
      headers: {
        authorization: token,
      },
    });
    return { history: data.history, status };
  } catch (err) {
    toast.error("Failed to add Video to History");
    console.log(err);
    return err;
  }
};

export const removeVideoFromHistory = async (videoId) => {
  const token = localStorage.getItem("token");
  try {
    const { data, status } = await axios({
      url: `/api/user/history/${videoId}`,
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    return { history: data.history, status };
  } catch (err) {
    toast.error("Failed to remove Video from History");
    console.log(err);
    return err;
  }
};

export const clearHistory = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data, status } = await axios({
      url: `/api/user/history/all`,
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    return { history: data.history, status };
  } catch (err) {
    toast.error("Failed to Clear History");
    console.log(err);
    return err;
  }
};
