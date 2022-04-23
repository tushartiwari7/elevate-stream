import axios from "axios";
import toast from "react-hot-toast";

export const addLikedVideo = async (video) => {
  const token = localStorage.getItem("token").slice(1, -1);

  try {
    const { data, status } = await axios({
      url: `/api/user/likes`,
      method: "POST",
      data: { video },
      headers: {
        authorization: token,
      },
    });
    return { likes: data.likes, status };
  } catch (err) {
    toast.error("Failed to add to liked videos");
    console.log(err);
    return err;
  }
};

export const removeLikedVideo = async (videoId) => {
  const token = localStorage.getItem("token").slice(1, -1);
  try {
    const { data, status } = await axios({
      url: `/api/user/likes/${videoId}`,
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    return { likes: data.likes, status };
  } catch (err) {
    toast.error("Failed to add to liked videos");
    console.log(err);
    return err;
  }
};
