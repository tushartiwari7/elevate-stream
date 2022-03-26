import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllVideos, getCategories } from "../../services";
const Data = createContext();
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
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    (async () => {
      try {
        const [categories, videos] = await Promise.all([
          getCategories(),
          getAllVideos(),
        ]);
        dispatch({ type: "SET_DATA", payload: { categories, videos } });
      } catch (err) {
        console.error(error);
      }
    })();
    setLoader(false);
  }, []);

  return (
    <Data.Provider
      value={{
        videos: state.videos,
        categories: state.categories,
        open,
        setOpen,
        loader,
        setLoader,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export const useData = () => useContext(Data);
