import React from "react";
import styles from "./Sidebar.module.css";
import { v4 } from "uuid";
import {
  BsHouseFill,
  BsHash,
  BsSearch,
  BsFillHandThumbsUpFill,
  BsClockHistory,
} from "react-icons/bs";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const sidebarList = [
    { id: v4(), name: "Home", Icon: BsHouseFill },
    { id: v4(), name: "Explore", Icon: BsHash },
    { id: v4(), name: "Search", Icon: BsSearch },
    { id: v4(), name: "Like", Icon: BsFillHandThumbsUpFill },
    { id: v4(), name: "History", Icon: BsClockHistory },
  ];

  return (
    <aside className="sidebar">
      <ul className="list full-width">
        {sidebarList.map(({ name, id, Icon }) => (
          <Link
            key={id}
            className={`list-item h3 mx-md my-xs p-xs transition ${styles.sidebar_list_item}`}
            to="/"
          >
            <span className="mx-xs">
              <Icon />
            </span>
            {name}
          </Link>
        ))}
      </ul>
    </aside>
  );
};
