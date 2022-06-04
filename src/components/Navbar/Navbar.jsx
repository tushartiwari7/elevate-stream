import { BsFillCaretDownFill, BsSearch, BsList } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { useData, useUser } from "../../context";
import { useLocation } from "react-router-dom";
export const Navbar = () => {
  const { setOpen, filterDispatch } = useData();
  const { user, setUser } = useUser();
  const location = useLocation();
  const navigator = useNavigate();

  const searchInputHandler = (e) => {
    if (location.pathname !== "/explore") navigator("/explore");
    filterDispatch({
      type: "VIDEOS_SEARCH",
      payload: e.target.value,
    });
  };

  const toggleSidebar = () => setOpen((open) => !open);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setUser({ isLoggedIn: false });
    navigator("/");
  };

  return (
    <header
      className={`full-width p-sm flex header fs-l pos-rel ${styles.header}`}
    >
      <div className="flex">
        <BsList
          size="30"
          className={styles.hamburger}
          onClick={toggleSidebar}
        />
        <Link className={`list white flex flex-center ${styles.logo}`} to="/">
          <img src={logo} width={"100%"} height="60px" />
        </Link>
      </div>
      <div className={`searchbar flex flex-center ${styles.searchbar}`}>
        <input
          type="text"
          className={`input px-sm py-xs rounded-s full-width ${styles.searchbar_input}`}
          placeholder="Search Videos here."
          onChange={searchInputHandler}
        />
        <BsSearch className={styles.searchbar_btn_icon} />
      </div>
      <div className="flex flex-center">
        {!user.isLoggedIn ? (
          <Link
            to="/login"
            state={{ from: location }}
            className={`btn-secondary mx-xs fs-m text-center ${styles.navlink}`}
          >
            Login
          </Link>
        ) : (
          <div
            className={`btn-outline-secondary mx-xs fs-m text-center pos-rel ${styles.navlink}`}
          >
            {user.firstName ?? "Guest User!"}
            <BsFillCaretDownFill className={styles.arrow_down} />
            <ul className="list pos-abs full-width" onClick={logoutHandler}>
              <li className="p-sm">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
