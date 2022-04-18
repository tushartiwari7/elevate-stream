import React, { useState } from "react";
import { Link } from "react-router-dom";
import bannerStyles from "../Home/Home.module.css";
import loginStyles from "./Login.module.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useUser } from "../../context";

export const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [userCreds, setUserCreds] = useState({ email: "", password: "" });

  const { handlers } = useUser();
  const togglePasswordType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");

  return (
    <div className={`pos-rel flex flex-center ${bannerStyles.home_page}`}>
      <div className={bannerStyles.banner_container}>
        <img
          src="https://giffiles.alphacoders.com/616/6163.gif"
          alt="App Banner"
          width="100%"
          height="100%"
          className={bannerStyles.banner}
        />
      </div>
      <div
        className={`flex flex-center flex-col pos-abs p-md rounded-s ${bannerStyles.banner_content} ${loginStyles.login_content}`}
      >
        <h3 className={` h1 Montserrat ${loginStyles.title}`}>
          Let's get Started
        </h3>
        <div className="full-width">
          <label
            className={`fs-m my-sm flex flex-col ${loginStyles.input_label}`}
          >
            Email
            <input
              type="text"
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
            className={`${loginStyles.btn_cta} btn btn-primary full-width rounded-s p-sm fs-m`}
            onClick={() => handlers.loginHandler(userCreds)}
          >
            Log in
          </button>
          <button
            className={`btn btn-outline-primary full-width py-xs px-sm my-sm rounded-s fs-m ${loginStyles.btn_secondary}`}
            onClick={() =>
              handlers.loginHandler({
                email: process.env.React_APP_TEST_EMAIL,
                password: process.env.React_APP_TEST_PASSWORD,
              })
            }
          >
            Login as Guest
          </button>
        </div>
        <Link to="/signup" className={`fs-m ${loginStyles.link}`}>
          Don't have an account? Signup
        </Link>
      </div>
    </div>
  );
};
