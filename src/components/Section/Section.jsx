import React from "react";
import styles from "./Section.module.css";

export const Section = ({ children, title }) => {
  return (
    <section className={`p-md ${styles.section}`} aria-label={title}>
      <h3 className="h2 px-md">{title}</h3>
      <div className="content p-md">{children}</div>
    </section>
  );
};
