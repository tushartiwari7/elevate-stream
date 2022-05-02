import React, { useReducer, useState } from "react";
import bannerStyles from "../Home/Home.module.css";
import loginStyles from "../Login/Login.module.css";
import spinner from "../../assets/spinner.gif";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./PostVideo.module.css";
import { BsPlus, BsCloudUpload } from "react-icons/bs";
import { useData } from "../../context";
import { initialVideoCreds, reducer } from "./reducer";
import { getImageLink, postVideo } from "../../services";
export const PostVideo = () => {
  const { categories, languages, dispatch: dataDispatcher } = useData();
  const [state, dispatch] = useReducer(reducer, initialVideoCreds);
  const [actorInput, setActorInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigator = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const youtubeId = state._id
      .replace("https://www.youtube.com/watch?v=", "")
      .replace("https://youtu.be/", "");

    const resp = await postVideo({ ...state, _id: youtubeId });
    if (resp.status === "success") {
      dataDispatcher({
        type: "ADD_VIDEO",
        payload: resp.video,
      });
      dispatch({ type: "RESET" });
      navigator("/explore");
    }
  };

  const imageHandler = async (e) => {
    setUploading(true);
    const imageLink = await getImageLink(e);
    dispatch({ type: "SET_THUMBNAIL", payload: imageLink });
    setUploading(false);
  };

  return (
    <div className={`pos-rel flex flex-center ${bannerStyles.home_page}`}>
      <form
        onSubmit={submitHandler}
        className={`flex flex-center flex-col p-md rounded-s ${bannerStyles.banner_content} ${loginStyles.login_content}`}
      >
        <h3 className={` h1 Montserrat ${loginStyles.title}`}>
          Upload Your Favorite Video
        </h3>
        <div className="full-width">
          <div className={`flex full-width ${loginStyles.names}`}>
            <label
              className={`fs-m flex full-width flex-col ${loginStyles.input_label}`}
            >
              Video Title
              <input
                type="text"
                required
                placeholder="Fast and Furious 8"
                className={`${loginStyles.input} rounded-s px-sm py-xs full-width my-xs fs-m`}
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: "SET_NAME", payload: e.target.value })
                }
              />
            </label>
            <label
              className={`fs-m flex full-width flex-col ${loginStyles.input_label}`}
            >
              Youtube Link
              <input
                type="text"
                required
                placeholder="https://youtu.be/TQtGQ5lOTX0"
                pattern="(?:(?:https?:\/\/)(?:www)?\.?(?:youtu\.?be)(?:\.com)?\/(?:.*[=/])*)([^= &?/\r\n]{8,11})"
                onInvalid={(e) =>
                  e.target.setCustomValidity("Paste a valid Youtube link")
                }
                className={`${loginStyles.input} rounded-s px-sm py-xs full-width my-xs fs-m`}
                value={state._id}
                onChange={(e) =>
                  dispatch({ type: "SET_ID", payload: e.target.value })
                }
              />
            </label>
          </div>

          <div className={`flex full-width ${loginStyles.names}`}>
            <label
              className={`fs-m flex full-width flex-col ${loginStyles.input_label}`}
            >
              Category
              <select
                required
                className={`${loginStyles.input} rounded-s px-sm py-xs full-width my-xs fs-m`}
                value={state.category}
                onChange={(e) => {
                  dispatch({ type: "SET_CATEGORY", payload: e.target.value });
                }}
              >
                <option value="">Select a Category</option>
                {categories.map(({ categoryName, _id }) => (
                  <option key={_id} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
              </select>
            </label>
            <label
              className={`fs-m flex full-width flex-col ${loginStyles.input_label}`}
            >
              Language
              <select
                required
                className={`${loginStyles.input} rounded-s px-sm py-xs full-width my-xs fs-m`}
                value={state.language}
                onChange={(e) => {
                  dispatch({ type: "SET_LANGUAGE", payload: e.target.value });
                }}
              >
                <option value="">Select a Language</option>
                {languages.map(({ lang, _id }) => (
                  <option key={_id} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={`flex full-width ${styles.form_row}`}>
            <label
              className={`fs-m flex full-width flex-col ${loginStyles.input_label}`}
            >
              Start From (optional)
              <input
                type="text"
                placeholder="time in seconds"
                className={`${loginStyles.input} rounded-s px-sm py-xs full-width my-xs fs-m`}
                value={state.startAt}
                onChange={(e) =>
                  dispatch({
                    type: "SET_START_AT",
                    payload: e.target.value - 0,
                  })
                }
              />
            </label>
            <label
              className={`fs-m flex flex-col pos-rel full-width ${loginStyles.input_label}`}
            >
              Release Year
              <input
                type="number"
                required
                placeholder="2018"
                min={1900}
                max={new Date().getFullYear()}
                className={`${loginStyles.input} fs-m px-sm py-xs rounded-s full-width my-xs`}
                value={state.releaseYear}
                onChange={(e) =>
                  dispatch({
                    type: "SET_RELEASE_YEAR",
                    payload: e.target.value - 0,
                  })
                }
              />
            </label>
            <label
              className={`fs-m flex flex-col pos-rel full-width ${loginStyles.input_label}`}
            >
              Duration
              <div className={`flex ${styles.time_duration}`}>
                <input
                  type="number"
                  required
                  placeholder="hours"
                  min={0}
                  max={5}
                  className={`${loginStyles.input} fs-m px-sm py-xs rounded-s full-width my-xs`}
                  value={state.duration.hours}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_DURATION_HOURS",
                      payload: e.target.value - 0,
                    })
                  }
                />
                <input
                  type="number"
                  required
                  placeholder="minutes"
                  min={0}
                  max={59}
                  className={`${loginStyles.input} fs-m px-sm py-xs rounded-s full-width my-xs`}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_DURATION_MINUTES",
                      payload: e.target.value - 0,
                    })
                  }
                  value={state.duration.minutes}
                />
              </div>
            </label>
          </div>
          <div className={` full-width ${styles.form_row}`}>
            <label
              className={`fs-m flex flex-col pos-rel ${styles.actors_label}`}
            >
              Actors
              <ul
                className={`$fs-m rounded-s my-xs flex ${styles.chips_wrapper}`}
              >
                {state.actors.map((actor, index) => (
                  <li key={index} className={`list pointer ${styles.chip}`}>
                    {actor}
                  </li>
                ))}
                {state.actors.length < 2 && (
                  <>
                    <input
                      required
                      placeholder="Add Actor Name"
                      className={`${loginStyles.input} fs-m px-sm py-xs rounded-s my-xs`}
                      value={actorInput}
                      onChange={(e) => setActorInput(e.target.value)}
                    />
                    <button
                      className={`list pointer ${styles.add_actor}`}
                      onClick={() => {
                        if (actorInput) {
                          dispatch({
                            type: "ADD_ACTOR",
                            payload: actorInput,
                          });
                          setActorInput("");
                        }
                      }}
                    >
                      <BsPlus size="3rem" color="var(--text-light)" />
                    </button>
                  </>
                )}
              </ul>
            </label>
            <div
              className={`fs-m pos-rel full-width ${loginStyles.input_label}`}
            >
              <input
                type="file"
                accept="image/*"
                required
                id="image_input"
                className={styles.image_input}
                onChange={imageHandler}
              />
              <label
                htmlFor="image_input"
                className={`list pointer my-xs py-xs pos-abs ${styles.upload_image}`}
                title="Upload Video Thumbnail"
              >
                {uploading ? (
                  <img
                    className={styles.loader}
                    src={spinner}
                    alt="uploading image"
                  />
                ) : (
                  <BsCloudUpload size="3rem" color="var(--text-light)" />
                )}
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`${loginStyles.btn_cta} btn btn-primary full-width rounded-s p-sm fs-m`}
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};
