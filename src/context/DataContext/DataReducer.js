import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

export const initialState = {
  videos: [],
  categories: [],
  languages: [],
  // history: [],
  // playlist: [],
};

export const initialFilters = {
  sort: "",
  category: "",
  language: "",
  search: "",
};

export const filterReducer = (state, { type, payload }) => {
  switch (type) {
    case "SORT":
      return {
        ...state,
        sort: payload,
      };

    case "CATEGORIES":
      return {
        ...state,
        category: payload.isDel ? "" : payload.categoryName,
      };

    case "LANGUAGES":
      return {
        ...state,
        language: payload.isDel ? "" : payload.lang,
      };

    case "CLEAR_FILTERS":
      return initialFilters;

    case "VIDEOS_SEARCH":
      return {
        ...state,
        search: payload,
      };

    default:
      return state;
  }
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_DATA":
      return {
        ...state,
        videos: payload.videos,
        categories: payload.categories,
        languages: payload.languages,
      };

    case "ADD_VIDEO":
      return {
        ...state,
        videos: [...state.videos, payload],
      };

    case "UPDATE_VIDEO":
      return {
        ...state,
        videos: state.videos.map((video) =>
          video._id === payload._id ? payload : video
        ),
      };

    default:
      return state;
  }
};
