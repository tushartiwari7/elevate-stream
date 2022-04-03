import React from "react";
import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css";
import notFound from "../../assets/404.png";

export const NotFound = () => {
  return (
    <div className={`pos-rel flex flex-center ${styles.home_page}`}>
      <div className={styles.banner_container}>
        <img
          src={notFound}
          alt="App Banner"
          width="100%"
          height="100%"
          className={styles.banner}
        />
      </div>
      <div
        className={`flex flex-center flex-col pos-abs full-width ${styles.banner_content}`}
      >
        <h3 className={` h1 ${styles.title}`}>We couldn't find any matches!</h3>
        <p className="h2 ubuntu">
          Please recheck the link or try searching something else.
        </p>
        <div className="my-sm">
          <Link
            className={`btn btn-outline-primary py-xs p-md full-width m-md h2 rounded-s transition ubuntu ${styles.btn_home}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`btn btn-primary py-xs px-md full-width m-md h2 rounded-s transition ubuntu ${styles.btn_cta}`}
            to="/explore"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};
