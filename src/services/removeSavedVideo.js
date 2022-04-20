import axios from "axios";
import toast from "react-hot-toast";
export const removeSavedVideo = async (videoId) => {
  const token = localStorage.getItem("token").slice(1, -1);
  try {
    const { data, status } = await axios({
      url: `/api/user/saved/${videoId}`,
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    return { saved: data.saved, status };
  } catch (err) {
    toast.error("Failed to Remove from Saved videos");
    console.log(err);
    return err;
  }
};
