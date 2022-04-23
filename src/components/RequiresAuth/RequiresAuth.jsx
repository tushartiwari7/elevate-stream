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
        `You need to be logged in to view ${location.pathname.slice(1)} Videos`
      );
  }, [location.pathname]);
  return isLoggedIn ? (
    children
  ) : (
    <section className={`flex flex-center ${styles.section}`}>
      <div className="flex flex-center flex-col">
        <h3 className="h2 ubuntu text-center">
          Login To See Videos In {location.pathname.slice(1)}
        </h3>
        <Link
          to={`/login`}
          state={{ from: location }}
          className={`full-width my-md py-sm h2 text-center ${styles.link}`}
        >
          Log in
        </Link>
      </div>
    </section>
  );
};
