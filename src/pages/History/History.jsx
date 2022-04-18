import React from "react";
import { Section, VideoCard } from "../../components";
import { useData } from "../../context";
import styles from "./History.module.css";
export const History = () => {
  const { history } = useData();
  return (
    <div>
      <h1 className={`h1 Montserrat p-md ${styles.heading}`}>History</h1>
      {history.map((day) => (
        <Section title={day.date} size={day.videos.length} key={day._id}>
          <ul className={`list grid ${styles.video_list}`}>
            {day.videos.map((video) => (
              <div className=" pos-rel" key={video._id}>
                <VideoCard {...video} />
                <label className="pos-abs text-center full-width fs-m">
                  {video.time}
                </label>
              </div>
            ))}
          </ul>
        </Section>
      ))}
    </div>
  );
};
