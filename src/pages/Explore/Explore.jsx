import styles from "./Explore.module.css";
import { VideoCard } from "../../components";
import { useData } from "../../context";
import { BsFillCaretDownFill } from "react-icons/bs";
export const Explore = () => {
  const { categories, videos } = useData();
  return (
    <>
      <div className="flex px-md">
        <ul className={`list flex m-md px-md ${styles.video_filter_category}`}>
          <li
            className={`fs-m flex px-sm py-xs btn-secondary ${styles.category_chip} ${styles.selected}`}
          >
            All
          </li>
          {categories.map((category) => (
            <li
              key={category._id}
              className={`fs-m flex px-sm py-xs btn-outline-secondary ${styles.category_chip}`}
            >
              {category.categoryName}
            </li>
          ))}
        </ul>
        <button
          className={`btn-secondary mx-xs fs-m text-center pos-rel ${styles.sort_button}`}
        >
          Sort By
          <BsFillCaretDownFill />
          <ul
            className="list pos-abs"
            onClick={(e) => console.log("clicked", e.target.textContent)}
          >
            <li className="fs-m px-sm py-xs" value="recent">
              Most Recent
            </li>
            <li className="fs-m px-sm py-xs">Most Viewed</li>
            <li className="fs-m px-sm py-xs">Most Liked</li>
          </ul>
        </button>
      </div>
      <ul className={`list grid px-sm ${styles.video_list}`}>
        {videos.map((video) => (
          <VideoCard key={video._id} {...video} />
        ))}
      </ul>
    </>
  );
};

//Saving this for future reference: will be using this snippet in src\pages\Playlists\Playlists.jsx:

// {categories.map((category) => (
//   <Section title={category.categoryName}>
//     <ul className={`list grid ${styles.video_list}`}>
//       <VideoCard />
//       <VideoCard />
//       <VideoCard />
//       <VideoCard />
//     </ul>
//   </Section>))}
