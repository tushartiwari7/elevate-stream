import toast from "react-hot-toast";
import { axiosCall } from "../utils";

export const addSavedVideo = async (video) => {
  try {
    const { data, status } = await axiosCall(`/api/user/saved`, "POST", {
      video,
    });
    return { saved: data.saved, status };
  } catch (err) {
    toast.error("Saving Video Failed");
    console.log(err);
    return err;
  }
};

export const removeSavedVideo = async (videoId) => {
  try {
    const { data, status } = await axiosCall(
      `/api/user/saved/${videoId}`,
      "DELETE"
    );
    return { saved: data.saved, status };
  } catch (err) {
    toast.error("Failed to Remove from Saved videos");
    console.log(err);
    return err;
  }
};
