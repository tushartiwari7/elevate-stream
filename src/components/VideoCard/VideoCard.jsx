import { useState } from "react";
import styles from "./VideoCard.module.css";
import {
  BsFillPlayFill,
  BsThreeDotsVertical,
  BsShare,
  BsSave2,
  BsHandThumbsUp,
} from "react-icons/bs";
import { getViews } from "../../utils";
import { useData } from "../../context";

export const VideoCard = (video) => {
  const {
    _id,
    thumbnail,
    name,
    actors,
    category,
    language,
    releaseYear,
    duration,
    views,
  } = video;
  const [menu, toggleMenu] = useState(false);
  const { watchLater, likedVideos, dispatch } = useData();

  const isInWatchLater = watchLater.some((vid) => vid._id === _id);
  const isInLikedVideos = likedVideos.some((vid) => vid._id === _id);

  const contextMenuHandler = (e) => {
    switch (e.target.innerText) {
      case "Add To Liked Videos":
        dispatch({ type: "SET_LIKED_VIDEOS", payload: video });
        break;
      case "Save To Watch Later":
        dispatch({ type: "SET_WATCH_LATER", payload: video });
        break;

      case "Remove From Liked Videos":
        dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: video._id });
        break;

      case "Remove From Watch Later":
        dispatch({ type: "REMOVE_FROM_WATCH_LATER", payload: video._id });
        break;

      default:
        break;
    }
    toggleMenu(!menu);
  };

  return (
    <li
      className={`card p-md ${styles.card}`}
      onClick={() => menu && toggleMenu(!menu)}
    >
      <div className="flex pos-rel">
        <img
          className={styles.card_img}
          src={thumbnail}
          alt={name}
          width="100%"
          height="100%"
        />
        <div
          className={`card-badge pos-abs fs-m ubuntu fw-bold p-xs ${styles.card_badge}`}
        >
          {getViews(views)}
        </div>
        <span
          className={`pos-abs ${styles.card_time_duration}`}
        >{`${duration.hours}h ${duration.minutes}m`}</span>
        <div className={`pos-abs flex flex-center  ${styles.card_hover}`}>
          <BsFillPlayFill size={"10rem"} color={"white"} />
        </div>
      </div>
      <div className={`flex flex-col pos-rel ${styles.card_details}`}>
        <h3 className={`h3 ${styles.card_title}`}>{name}</h3>
        <label className="fs-m">{actors.join(", ")}</label>
        <label className={`fs-m ${styles.card_meta}`}>
          {category} ▫ {language} ▫ {releaseYear}
        </label>
        <button
          className={`pos-abs btn btn-icon pointer ${styles.contextMenuBtn}`}
          onClick={() => toggleMenu((menu) => !menu)}
        >
          <BsThreeDotsVertical size="3rem" />
        </button>
        {menu && (
          <ul
            className={`flex flex-col pos-abs list card ${styles.contextMenu}`}
            onClick={contextMenuHandler}
          >
            <li className="flex px-sm py-xs">
              <BsShare className={styles.contextMenuItemIcon} size="1.5rem" />
              <span className="fs-m">Share</span>
            </li>
            <li className="flex px-sm py-xs">
              <BsSave2 className={styles.contextMenuItemIcon} size="1.5rem" />
              <span className="fs-m">
                {isInWatchLater
                  ? "Remove From Watch Later"
                  : "Save To Watch Later"}
              </span>
            </li>
            <li className="flex px-sm py-xs">
              <BsHandThumbsUp
                className={styles.contextMenuItemIcon}
                size="1.5rem"
              />
              <span className="fs-m">
                {isInLikedVideos
                  ? "Remove From Liked Videos"
                  : "Add To Liked Videos"}
              </span>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
};
