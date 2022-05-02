import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../context";
import { audioMessage } from "../../utils";
import styles from "./RequiresAuth.module.css";
export const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const {
    user: { isLoggedIn },
  } = useUser();

  useEffect(() => {
    if (!isLoggedIn)
      audioMessage(
        location.pathname === "/post"
          ? "You need to be logged in to post a video"
          : `Login To See Videos In ${location.pathname.slice(1)}`
      );
  }, [location.pathname]);
  return isLoggedIn ? (
    children
  ) : (
    <section className={`flex flex-center ${styles.section}`}>
      <div className="flex flex-center flex-col">
        <h3 className="h2 ubuntu text-center">
          {location.pathname === "/post"
            ? "You need to be logged in to post a video"
            : `Login To See Videos In ${location.pathname.slice(1)}`}
        </h3>
        <Link
          to="/login"
          state={{ from: location }}
          className={`btn btn-primary py-xs full-width m-md fs-xl rounded-s transition ${styles.link}`}
        >
          Log in
        </Link>
      </div>
    </section>
  );
};
