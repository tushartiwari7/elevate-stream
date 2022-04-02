import { BsFillCaretDownFill, BsSearch, BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { useData } from "../../context";
import toast from "react-hot-toast";
export const Navbar = () => {
  const { setOpen } = useData();
  const searchInputHandler = (e) => {
    e.preventDefault();
    // search logic here...
  };

  const toggleSidebar = () => setOpen((open) => !open);

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
          <img src={logo} width={"100%"} height={"100%"} />
        </Link>
      </div>
      <form
        onSubmit={searchInputHandler}
        className={`searchbar flex flex-center ${styles.searchbar}`}
      >
        <input
          type="text"
          className={`input px-sm py-xs rounded-s full-width ${styles.searchbar_input}`}
          placeholder="Search Videos here."
        />
        <button type="submit" className={styles.searchbar_btn_icon}>
          <BsSearch />
        </button>
      </form>
      <div className="flex flex-center">
        {true ? (
          <Link
            to="/login"
            className={`btn-secondary mx-xs fs-m text-center ${styles.navlink}`}
            onClick={() =>
              toast(`Login Route is not built yet.`, { icon: "❌" })
            }
          >
            Login
          </Link>
        ) : (
          <Link
            to="/profile"
            className={`btn-outline-secondary mx-xs fs-m text-center ${styles.navlink}`}
          >
            Guest User! <BsFillCaretDownFill className={styles.arrow_down} />
          </Link>
        )}
      </div>
    </header>
  );
};
