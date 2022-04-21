import { useEffect } from "react";
import styles from "./Explore.module.css";
import { VideoCard } from "../../components";
import { useData } from "../../context";
import { BsFillCaretDownFill } from "react-icons/bs";
import toast from "react-hot-toast";
export const Explore = () => {
  const { categories, videos, languages, filters, filterDispatch } = useData();

  const categoryDispatchHandler = (cate) => {
    toast(
      `Showing Movies in ${cate || "All"} categor${cate ? "y only" : "ies"}.`,
      { icon: "🎬" }
    );
    filterDispatch({
      type: "CATEGORIES",
      payload: {
        categoryName: cate,
        isDel: filters.category === cate,
      },
    });
  };
  const languageDispatchHandler = (lang) => {
    toast(
      `Showing Movies in ${lang || "All"} language${lang ? " only" : "s"}.`,
      { icon: "📚" }
    );
    filterDispatch({
      type: "LANGUAGES",
      payload: {
        lang: lang,
        isDel: filters.language === lang,
      },
    });
  };

  useEffect(() => () => filterDispatch({ type: "CLEAR_FILTERS" }), []);

  return (
    <>
      <div className={`flex px-md ${styles.filter_wrapper}`}>
        <ul
          className={`list flex m-md py-xs ${styles.video_filter_category}`}
          onClick={(e) =>
            categoryDispatchHandler(e.target.id === "All" ? "" : e.target.id)
          }
        >
          <li
            className={`fs-m flex px-sm py-xs btn-outline-secondary ${
              styles.category_chip
            } ${filters.category === "" ? styles.selected : ""}`}
            id="All"
          >
            All
          </li>
          {categories.map((category) => (
            <li
              key={category._id}
              id={category.categoryName}
              className={`fs-m flex px-sm py-xs btn-outline-secondary ${
                styles.category_chip
              } ${
                filters.category === category.categoryName
                  ? styles.selected
                  : ""
              }`}
            >
              {category.categoryName}
            </li>
          ))}
        </ul>
        <button
          className={`btn-secondary mx-xs fs-m text-center pos-rel ${styles.sort_button}`}
        >
          {filters.language || "Language"}
          <BsFillCaretDownFill />
          <ul
            className="list pos-abs full-width"
            onClick={(e) =>
              languageDispatchHandler(e.target.id === "All" ? "" : e.target.id)
            }
          >
            <li className="fs-m px-sm py-xs" id="All">
              All
            </li>
            {languages.map(({ _id, lang }) => (
              <li className="fs-m px-sm py-xs" id={lang} key={_id}>
                {lang}
              </li>
            ))}
          </ul>
        </button>
        <button
          className={`btn-secondary mx-xs fs-m text-center pos-rel ${styles.sort_button}`}
        >
          Sort By
          <BsFillCaretDownFill />
          <ul
            className="list pos-abs full-width"
            onClick={(e) => {
              toast(`Sorting by ${e.target.innerText}`, { icon: "🚀" });
              filterDispatch({ type: "SORT", payload: e.target.id });
            }}
          >
            <li className="fs-m px-sm py-xs" id="MOST_RECENT">
              Most Recent
            </li>
            <li className="fs-m px-sm py-xs" id="MOST_VIEWED">
              Most Viewed
            </li>
            <li className="fs-m px-sm py-xs" id="MOST_LIKED">
              Most Liked
            </li>
          </ul>
        </button>
      </div>
      <ul className={`list grid px-sm ${styles.video_list}`}>
        {videos.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
      </ul>
      <h2 className={`h2 Montserrat pos-rel ${styles.top40}`}>
        {videos.length === 0 ? "No videos found" : ""}
      </h2>
    </>
  );
};
