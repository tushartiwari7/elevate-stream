import axios from "axios";

export const getCategories = async () => {
  try {
    const { data } = await axios.get("/api/categories");
    return data.categories;
  } catch (error) {
    console.error(error);
    return error;
  }
};
