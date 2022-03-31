import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllLanguages, getAllVideos, getCategories } from "../../services";
import {
  getFilteredCategory,
  getFilteredLanguage,
  getSortedVideos,
} from "../../utils";
import { compose } from "../../utils/compose";
import {
  filterReducer,
  initialFilters,
  initialState,
  reducer,
} from "./DataReducer";
const Data = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filters, filterDispatch] = useReducer(filterReducer, initialFilters);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    (async () => {
      try {
        const [categories, videos, languages] = await Promise.all([
          getCategories(),
          getAllVideos(),
          getAllLanguages(),
        ]);
        dispatch({
          type: "SET_DATA",
          payload: { categories, videos, languages },
        });
      } catch (err) {
        console.error(error);
      }
    })();
    setLoader(false);
  }, []);

  const filteredProducts = compose(
    state.videos,
    getSortedVideos,
    getFilteredCategory,
    getFilteredLanguage
  )(filters);

  return (
    <Data.Provider
      value={{
        ...state,
        videos: filteredProducts,
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
