import axios from "axios";
export const postVideo = async (videoToSend) => {
  const token = localStorage.getItem("token").slice(1, -1);
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
