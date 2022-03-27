import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllVideos, getCategories } from "../../services";
import { getFilteredCategory, getSortedVideos } from "../../utils";
import { filterReducer, initialState, reducer } from "./DataReducer";
const Data = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filters, filterDispatch] = useReducer(filterReducer, {
    sort: "",
    category: "",
  });
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

  const compose = (state, ...functions) => {
    return (filters) => {
      return functions.reduce((acc, fn) => {
        return fn(acc, filters);
      }, state);
    };
  };

  const filteredProducts = compose(
    state.videos,
    getSortedVideos,
    getFilteredCategory
  )(filters);

  return (
    <Data.Provider
      value={{
        videos: filteredProducts,
        categories: state.categories,
        watchLater: state.watchLater,
        likedVideos: state.likedVideos,
        open,
        setOpen,
        loader,
        setLoader,
        filters,
        filterDispatch,
        dispatch,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export const useData = () => useContext(Data);
