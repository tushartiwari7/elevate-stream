import axios from "axios";

export const getAllLanguages = async () => {
  try {
    const { data } = await axios.get("/api/languages");
    return data.languages;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getCategories = async () => {
  try {
    const { data } = await axios.get("/api/categories");
    return data.categories;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getAllVideos = async () => {
  try {
    const { data } = await axios.get("/api/videos");
    return data.videos;
  } catch (error) {
    console.error(error);
    return error;
  }
};
