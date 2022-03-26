import React from "react";
import styles from "./VideoCard.module.css";
import { BsFillPlayFill } from "react-icons/bs";
export const VideoCard = () => {
  return (
    <li className={`card p-md ${styles.card}`}>
      <div className="flex pos-rel">
        <img
          className={styles.card_img}
          src="https://resizing.flixster.com/3LiHICt-M7McWLFTcw3op15jC8s=/300x300/v2/https://resizing.flixster.com/rm3NX-j0IOsNeADV92x10_YxDco=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzZhNDM3OGNlLWY3NjUtNDMyMi1hNDcyLWY4NDMzNzIwZDVlMS5qcGc="
          alt="video-thumbnail"
          width="100%"
          height="100%"
        />
        <div
          className={`card-badge pos-abs fs-m ubuntu fw-bold p-xs ${styles.card_badge}`}
        >
          16M+ Views
        </div>
        <span className={`pos-abs ${styles.card_time_duration}`}>3h 21m</span>
        <div className={`pos-abs flex flex-center  ${styles.card_hover}`}>
          <BsFillPlayFill size={"10rem"} color={"white"} />
        </div>
      </div>
      <div className={`flex flex-col ${styles.card_details}`}>
        <h3 className="card-title h3">Qismat 2</h3>
        <label className="fs-m">Ammy virk, sargun mehta</label>
        <label className={`fs-m ${styles.card_meta}`}>
          Romance ▫ punjabi ▫ 2019
        </label>
      </div>
    </li>
  );
};
