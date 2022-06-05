import toast from "react-hot-toast";
import { axiosCall } from "../utils";
export const postVideo = async (videoToSend) => {
  try {
    const { data } = await axiosCall(`/api/video`, "POST", {
      video: videoToSend,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addCommment = async (videoID, comment) => {
  try {
    const { data } = await axiosCall(`/api/comments/${videoID}`, "POST", {
      comment,
    });
    return data;
  } catch (err) {
    console.error(err);
    toast("Comment Not added - Request Failed", { icon: "❌" });
    return err;
  }
};

export const getImageLink = async (e) => {
  try {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    console.log(file);
    if (file) {
      const resp = await fetch(
        "https://api.cloudinary.com/v1_1/projectsbytushar/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await resp.json();
      return json.secure_url;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
