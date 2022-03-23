import React from "react";
import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={`pos-rel flex flex-center ${styles.home_page}`}>
      <div className={styles.banner_container}>
        <img
          src={banner}
          alt="App Banner"
          width="100%"
          height="100%"
          className={styles.banner}
        />
      </div>
      <div
        className={`flex flex-center flex-col pos-abs full-width ${styles.banner_content}`}
      >
        <h3 className={` h1 ${styles.title}`}>
          Unlimited movies, TV shows and more.
        </h3>
        <p className="h2 ubuntu">Watch anytime,anywhere for Free.</p>
        <Link
          className={`btn btn-primary py-xs full-width m-md h2 rounded-s transition ubuntu ${styles.btn_cta}`}
          to="/explore"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};
