import { useEffect } from "react";
import styles from "./Sidebar.module.css";
import { v4 as uuid } from "uuid";
import {
  BsHouseFill,
  BsHash,
  BsFillHandThumbsUpFill,
  BsClockHistory,
  BsSave,
} from "react-icons/bs";
import { CgPlayList } from "react-icons/cg";
import { NavLink, useLocation } from "react-router-dom";
import { useData } from "../../context";

export const Sidebar = () => {
  const sidebarList = [
    { id: uuid(), name: "Home", Icon: BsHouseFill },
    { id: uuid(), name: "Explore", Icon: BsHash },
    { id: uuid(), name: "Liked", Icon: BsFillHandThumbsUpFill },
    { id: uuid(), name: "Saved", Icon: BsSave },
    { id: uuid(), name: "History", Icon: BsClockHistory },
    { id: uuid(), name: "Playlists", Icon: CgPlayList },
  ];

  const { open, setOpen } = useData();

  const location = useLocation();
  const isOnVideoPage = location.pathname.includes("/watch");

  useEffect(() => {
    if (!isOnVideoPage) {
      document.title = `${location.pathname.slice(1).toUpperCase()}  
      ${location.pathname.length > 1 ? "|" : ""} Elevate Stream`;
    }
  });

  return (
    <aside className={`sidebar ${open ? "active" : ""}`}>
      <ul className="list full-width">
        {sidebarList.map(({ name, id, Icon }) => (
          <NavLink
            key={id}
            className={`list-item h3 mx-md my-xs p-xs transition ${styles.sidebar_list_item}`}
            style={({ isActive }) => ({
              color: isActive ? "var(--primary)" : "var(--text-light)",
            })}
            to={`/${name === "Home" ? "" : name.toLowerCase()}`}
            onClick={() => setOpen((open) => !open)}
          >
            <span className={`mx-xs ${styles.sidebar_icon}`}>
              <Icon size={isOnVideoPage ? "3rem" : "2.5rem"} title={name} />
            </span>
            <span
              className={isOnVideoPage ? styles.sidebar_list_item_text : ""}
            >
              {name}
            </span>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};
