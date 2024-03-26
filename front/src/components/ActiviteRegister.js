import { useSelector, useDispatch } from "react-redux";
import {
  selectCSRFToken,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createActivite } from "../actions/activite.action";
import { getCSRFToken, updateUser } from "../actions/authUser.action";
import "../styles/placeRegister.css";

const ActiviteRegister = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCSRFToken());
  }, [dispatch]);

  const csrf_token = useSelector(selectCSRFToken);
  const loggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    game_space: "no",
    library: "no",
    show: "no",
    pool: "no",
    playground: "no",
    walk: "no",
    cinema: "no",
    collective_playspace: "no",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("csrf_token", csrf_token);
    newFormData.append("user_id", user.id);
    newFormData.append("game_space", formData.game_space);
    newFormData.append("library", formData.library);
    newFormData.append("show", formData.show);
    newFormData.append("pool", formData.pool);
    newFormData.append("playground", formData.playground);
    newFormData.append("walk", formData.walk);
    newFormData.append("cinema", formData.cinema);
    newFormData.append("collective_playspace", formData.collective_playspace);
    console.log(formData);
    dispatch(createActivite(newFormData)).then((res) => {
      return dispatch(updateUser(user.id));
    });
  };

  const handleChange = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: prevData[fieldName] === "yes" ? "no" : "yes",
    }));
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }
  if (user.role === "parent") {
    return <Navigate to="/" />;
  }
  if (user.activite && user.role !== "parent") {
    return <Navigate to="/reg/situation_register" />;
  }
  return (
    <section className="proRegister">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.game_space === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("game_space")}
            ></span>
            Espace de jeu
          </label>

          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.library === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("library")}
            ></span>
            Bibliothèque
          </label>

          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.show === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("show")}
            ></span>
            Spectacle
          </label>

          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.pool === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("pool")}
            ></span>
            Piscine
          </label>

          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.playground === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("playground")}
            ></span>
            Aire de jeux
          </label>

          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.walk === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("walk")}
            ></span>
            Balade
          </label>

          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.cinema === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("cinema")}
            ></span>
            Cinéma
          </label>

          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" +
                (formData.collective_playspace === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("collective_playspace")}
            ></span>
            Espace de jeu collectif
          </label>
        </fieldset>
        <button type="submit">Suivant</button>
      </form>
    </section>
  );
};

export default ActiviteRegister;
