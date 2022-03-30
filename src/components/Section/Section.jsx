import React from "react";
import styles from "./Section.module.css";

export const Section = ({ children, title, size }) => {
  return (
    <section className={`p-md ${styles.section}`} aria-label={title}>
      <h3 className="h1 ubuntu px-md">
        {title}{" "}
        <span className="mx-xs fs-l fw-regular">
          ({size} {size == 1 ? "item" : "items"})
        </span>{" "}
      </h3>
      <div className="content p-md">{children}</div>
    </section>
  );
};
