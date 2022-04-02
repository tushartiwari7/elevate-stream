import React from "react";
import { Section, VideoCard } from "../../components";
import { useData } from "../../context";
import styles from "../Explore/Explore.module.css";

export const Playlists = () => {
  const { playlist } = useData();
  return (
    <div>
      <h1 className="h1 ubuntu text-left p-md ">Your Playlists</h1>
      {playlist.map((list) => (
        <Section
          title={list.playlistName}
          size={list.videos.length}
          playlistId={list._id}
          key={list._id}
        >
          <ul className={`list grid ${styles.video_list}`}>
            {list.videos.map((video) => (
              <VideoCard key={video._id} {...video} />
            ))}
          </ul>
        </Section>
      ))}
    </div>
  );
};
