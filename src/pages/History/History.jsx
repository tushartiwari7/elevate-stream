import React from "react";
import { Section, VideoCard } from "../../components";
import { useData } from "../../context";
import styles from "./History.module.css";
export const History = () => {
  const { history } = useData();
  console.log(history);
  return (
    <div>
      <h1 className={`h1 ubuntu p-md ${styles.heading}`}>History</h1>
      {history.map((day) => (
        <Section title={day.date} size={day.videos.length}>
          <ul className={`list grid ${styles.video_list}`}>
            {day.videos.map((video) => (
              <VideoCard {...video} />
            ))}
          </ul>
        </Section>
      ))}
    </div>
  );
};
