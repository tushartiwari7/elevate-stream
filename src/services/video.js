import axios from "axios";
import toast from "react-hot-toast";
export const postVideo = async (videoToSend) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios({
      url: `/api/video`,
      method: "POST",
      data: {
        video: videoToSend,
      },
      headers: {
        authorization: token,
      },
    });
    return { ...data };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addCommment = async (videoID, comment) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios({
      url: `/api/comments/${videoID}`,
      method: "POST",
      data: {
        comment,
      },
      headers: {
        authorization: token,
      },
    });
    return { ...data };
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
    formData.append("upload_preset", "testingbytushar");
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
