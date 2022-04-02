import React from "react";
import { Section, VideoCard } from "../../components";
import { useData } from "../../context";
import styles from "../Explore/Explore.module.css";
export const Playlist = ({ videoType }) => {
  const { likedVideos, watchLater } = useData();
  const videos =
    videoType === "Watch Later"
      ? watchLater
      : videoType === "Liked Videos"
      ? likedVideos
      : [];
  return (
    <div>
      <Section title={videoType} size={videos.length}>
        <ul className={`list grid ${styles.video_list}`}>
          {videos.map((video) => (
            <VideoCard {...video} />
          ))}
        </ul>
      </Section>
    </div>
  );
};
