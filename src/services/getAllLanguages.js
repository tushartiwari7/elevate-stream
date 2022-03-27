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
