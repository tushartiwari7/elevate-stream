import styles from "./Explore.module.css";
import { VideoCard } from "../../components";
import { useData } from "../../context";
export const Explore = () => {
  const { categories, videos } = useData();
  return (
    <div>
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
      <ul className={`list grid px-sm ${styles.video_list}`}>
        {videos.map((video) => (
          <VideoCard key={video._id} />
        ))}
      </ul>
    </div>
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
