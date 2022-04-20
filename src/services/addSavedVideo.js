import axios from "axios";
import toast from "react-hot-toast";

export const addSavedVideo = async (video) => {
  const token = localStorage.getItem("token");
  try {
    const { data, status } = await axios({
      url: `/api/user/saved`,
      method: "POST",
      data: { video },
      headers: {
        authorization: token,
      },
    });
    return { saved: data.saved, status };
  } catch (err) {
    toast.error("Saving Video Failed");
    console.log(err);
    return err;
  }
};
