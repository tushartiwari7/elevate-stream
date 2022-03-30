import React from "react";
import styles from "./Sidebar.module.css";
import { v4 } from "uuid";
import {
  BsHouseFill,
  BsHash,
  BsSearch,
  BsFillHandThumbsUpFill,
  BsClockHistory,
  BsSave,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useData } from "../../context";

export const Sidebar = () => {
  const sidebarList = [
    { id: v4(), name: "Home", Icon: BsHouseFill },
    { id: v4(), name: "Explore", Icon: BsHash },
    { id: v4(), name: "Search", Icon: BsSearch },
    { id: v4(), name: "Liked", Icon: BsFillHandThumbsUpFill },
    { id: v4(), name: "Saved", Icon: BsSave },
    { id: v4(), name: "History", Icon: BsClockHistory },
  ];

  const { open, setOpen } = useData();

  return (
    <aside className={`sidebar ${open ? "active" : ""}`}>
      <ul className="list full-width">
        {sidebarList.map(({ name, id, Icon }) => (
          <Link
            key={id}
            className={`list-item h3 mx-md my-xs p-xs transition ${styles.sidebar_list_item}`}
            to={`/${name === "Home" ? "" : name.toLowerCase()}`}
            onClick={() => setOpen((open) => !open)}
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
