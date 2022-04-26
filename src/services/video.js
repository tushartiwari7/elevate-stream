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
      console.log(json);
      return json.secure_url;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
