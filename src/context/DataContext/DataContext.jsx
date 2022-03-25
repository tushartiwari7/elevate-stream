import { createContext, useReducer, useContext, useEffect } from "react";
import { getAllVideos, getCategories } from "../../services";
const Data = createContext();
getCategories;
const initialState = {
  videos: [],
  categories: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        videos: action.payload.videos,
        categories: action.payload.categories,
      };
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    (async () => {
      const [categories, videos] = await Promise.all([
        getCategories(),
        getAllVideos(),
      ]);
      dispatch({ type: "SET_DATA", payload: { categories, videos } });
    })();
  }, []);

  return (
    <Data.Provider
      value={{ videos: state.videos, categories: state.categories }}
    >
      {children}
    </Data.Provider>
  );
};

export const useData = () => useContext(Data);
