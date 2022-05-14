import React from "react";
import { Section, VideoCard } from "../../components";
import { useData, useUser } from "../../context";
import styles from "./History.module.css";
export const History = () => {
  const { user } = useUser();
  return (
    <Section title={"History"} size={user.history.length}>
      <ul className={`list grid ${styles.video_list}`}>
        {user.history.map((video) => (
          <div className=" pos-rel" key={video._id}>
            <VideoCard {...video} />
            <label className="pos-abs text-center full-width fs-m">
              {video.time}
            </label>
          </div>
        ))}
      </ul>
    </Section>
  );
};
