import React from "react";
import { Link } from "react-router-dom";
import { Section, VideoCard } from "../../components";
import { useUser } from "../../context";
import styles from "../Explore/Explore.module.css";
export const Playlist = ({ videoType }) => {
  const { user } = useUser();
  const videos =
    videoType === "Saved Videos"
      ? user.saved
      : videoType === "Liked Videos"
      ? user.likes
      : [];
  return (
    <div>
      <Section title={videoType} size={videos.length}>
        <ul className={`list grid ${styles.video_list}`}>
          {videos?.map((video) => (
            <VideoCard {...video} key={video._id} />
          ))}
        </ul>
        {videos.length === 0 && (
          <section className="flex flex-center flex-col ">
            <h3 className="h3 my-sm">
              You don't have any {videoType} yet, Add One Now!
            </h3>

            <Link
              to={`/explore`}
              className={`btn-secondary fs-m text-center pointer ${styles.sort_button}`}
            >
              Explore Videos
            </Link>
          </section>
        )}
      </Section>
    </div>
  );
};
