import axios from "axios";

export const getAllVideos = async () => {
  try {
    const { data } = await axios.get("/api/videos");
    return data.videos;
  } catch (error) {
    console.error(error);
    return error;
  }
};
