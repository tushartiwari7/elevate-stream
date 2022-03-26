import { useState } from "react";
import styles from "./VideoCard.module.css";
import {
  BsFillPlayFill,
  BsThreeDotsVertical,
  BsShare,
  BsSave2,
  BsHandThumbsUp,
} from "react-icons/bs";
import { getViews } from "../../utils/getViews";

export const VideoCard = ({
  thumbnail,
  name,
  actors,
  category,
  language,
  releaseYear,
  duration,
  views,
}) => {
  const [menu, toggleMenu] = useState(false);

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
          >
            <li className="flex px-sm py-xs">
              <BsShare className={styles.contextMenuItemIcon} size="1.5rem" />
              <span className="fs-m">Share</span>
            </li>
            <li className="flex px-sm py-xs">
              <BsSave2 className={styles.contextMenuItemIcon} size="1.5rem" />
              <span className="fs-m">Save to watch later</span>
            </li>
            <li className="flex px-sm py-xs">
              <BsHandThumbsUp
                className={styles.contextMenuItemIcon}
                size="1.5rem"
              />
              <span className="fs-m">Add To Liked Videos</span>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
};
