import React, { useState } from "react";
import { Link } from "react-router-dom";
import bannerStyles from "../Home/Home.module.css";
import loginStyles from "../Login/Login.module.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useUser } from "../../context";
export const Signup = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [userCreds, setUserCreds] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { handlers } = useUser();
  const togglePasswordType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");

  return (
    <div className={`pos-rel flex flex-center ${bannerStyles.home_page}`}>
      <div className={bannerStyles.banner_container}>
        <img
          src="https://thumbs.gfycat.com/CharmingTenderAtlasmoth-size_restricted.gif"
          alt="App Banner"
          width="100%"
          height="100%"
          className={bannerStyles.banner}
        />
      </div>
      <form
        onSubmit={(e) => handlers.signupHandler(e, userCreds)}
        className={`flex flex-center flex-col pos-abs p-md rounded-s ${bannerStyles.banner_content} ${loginStyles.login_content}`}
      >
        <h3 className={` h1 Montserrat ${loginStyles.title}`}>
          Let's get Started
        </h3>
        <div className="full-width">
          <div className={`flex full-width ${loginStyles.names}`}>
            <label
              className={`fs-m flex full-width flex-col ${loginStyles.input_label}`}
            >
              First Name
              <input
                type="text"
                required
                placeholder="John"
                className={`${loginStyles.input} rounded-s px-sm py-xs full-width my-xs fs-m`}
                value={userCreds.firstName}
                onChange={(e) =>
                  setUserCreds({ ...userCreds, firstName: e.target.value })
                }
              />
            </label>
            <label
              className={`fs-m flex flex-col pos-rel full-width ${loginStyles.input_label}`}
            >
              Last Name
              <input
                type="text"
                required
                placeholder="Doe"
                className={`${loginStyles.input} fs-m px-sm py-xs rounded-s full-width my-xs`}
                value={userCreds.lastName}
                onChange={(e) =>
                  setUserCreds({ ...userCreds, lastName: e.target.value })
                }
              />
            </label>
          </div>
          <label
            className={`fs-m my-sm flex flex-col ${loginStyles.input_label}`}
          >
            Email
            <input
              type="email"
              required
              placeholder="johnDoe@gmail.com"
              className={`${loginStyles.input} rounded-s px-sm py-xs full-width my-xs fs-m`}
              value={userCreds.email}
              onChange={(e) =>
                setUserCreds({ ...userCreds, email: e.target.value })
              }
            />
          </label>
          <label
            className={`fs-m flex flex-col pos-rel my-sm ${loginStyles.input_label}`}
          >
            Password
            <input
              type={passwordType}
              required
              placeholder="johnDoe123"
              className={`${loginStyles.input} fs-m px-sm py-xs rounded-s full-width my-xs`}
              value={userCreds.password}
              onChange={(e) =>
                setUserCreds({ ...userCreds, password: e.target.value })
              }
            />
            {passwordType === "password" ? (
              <BsEye
                className={`pos-abs ${loginStyles.show_password}`}
                size="2rem"
                onClick={togglePasswordType}
              />
            ) : (
              <BsEyeSlash
                className={`pos-abs ${loginStyles.show_password}`}
                size="2rem"
                onClick={togglePasswordType}
              />
            )}
          </label>
        </div>
        <div className="full-width">
          <button
            type="submit"
            className={`${loginStyles.btn_cta} btn btn-primary full-width rounded-s p-sm fs-m`}
          >
            Sign Up
          </button>
          <Link to="/login" className={`fs-m ${loginStyles.link}`}>
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};
