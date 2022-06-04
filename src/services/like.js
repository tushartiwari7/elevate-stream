import toast from "react-hot-toast";
import { axiosCall } from "../utils";

export const addLikedVideo = async (video) => {
  try {
    const { data, status } = await axiosCall(`/api/user/likes`, "POST", {
      video,
    });
    return { likes: data.likes, status };
  } catch (err) {
    toast.error("Failed to add to liked videos");
    console.log(err);
    return err;
  }
};

export const removeLikedVideo = async (videoId) => {
  try {
    const { data, status } = await axiosCall(
      `/api/user/likes/${videoId}`,
      "DELETE"
    );
    return { likes: data.likes, status };
  } catch (err) {
    toast.error("Failed to add to liked videos");
    console.log(err);
    return err;
  }
};
