import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCSRFToken,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { createPlace } from "../actions/place.action";
import { Navigate } from "react-router-dom";
import { getCSRFToken, updateUser } from "../actions/authUser.action";
import "../styles/placeRegister.css";

const PlaceRegister = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCSRFToken());
  }, [dispatch]);

  const loggedIn = useSelector(selectIsLoggedIn);
  const csrf_token = useSelector(selectCSRFToken);
  const user = useSelector(selectCurrentUser);

  const [formData, setFormData] = useState({
    type: "maison",
    level: "",
    pool: "no",
    garden: "no",
    elevator: "no",
    yard: "no",
    pets: "no",
    smoker: "no",
    near_school: "no",
    near_park: "no",
    near_sea: "no",
    near_walk: "no",
  });

  const handleChange = (fieldName, value) => {
    if (fieldName === "level") {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: prevData[fieldName] === "yes" ? "no" : "yes",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("csrf_token", csrf_token);
    newFormData.append("user_id", user.id);
    newFormData.append("type", formData.type);
    newFormData.append("level", formData.level);
    newFormData.append("pool", formData.pool);
    newFormData.append("garden", formData.garden);
    newFormData.append("elevator", formData.elevator);
    newFormData.append("yard", formData.yard);
    newFormData.append("pets", formData.pets);
    newFormData.append("smoker", formData.smoker);
    newFormData.append("near_school", formData.near_school);
    newFormData.append("near_park", formData.near_park);
    newFormData.append("near_sea", formData.near_sea);
    newFormData.append("near_walk", formData.near_walk);
    dispatch(createPlace(newFormData)).then((res) => {
      return dispatch(updateUser(user.id));
    });
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  if (user.role === "parent" || user.role === "admin") {
    return <Navigate to="/home" />;
  }

  if (user.place && user.role !== "parent") {
    return <Navigate to="/reg/activite_register" />;
  }

  return (
    <section className="proRegister">
      <h2>Dites nous en plus sur votre lieu</h2>
      <form onSubmit={handleSubmit}>
        <label>Type</label>
        <select
          required
          name="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="maison">Maison</option>
          <option value="appartement">Appartement</option>
          <option value="batiment_spe">Batiment Spécialisé</option>
          <option value="peniche">Péniche</option>
        </select>

        <label htmlFor="level">Etage</label>
        <input
          type="number"
          name="level"
          pattern="^([0-9]|[1-4][0-9]|50)$"
          value={formData.level}
          onChange={(e) => handleChange("level", e.target.value)}
          required
        />
        <fieldset>
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
                "checkmark" + (formData.garden === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("garden")}
            ></span>
            Jardin
          </label>
          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.elevator === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("elevator")}
            ></span>
            Ascenseur
          </label>
          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.yard === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("yard")}
            ></span>
            Cour
          </label>
          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.pets === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("pets")}
            ></span>
            Animaux
          </label>
          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.smoker === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("smoker")}
            ></span>
            Fumeur
          </label>
          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.near_school === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("near_school")}
            ></span>
            Prox. école
          </label>
          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.near_park === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("near_park")}
            ></span>
            Prox. parc
          </label>
          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.near_sea === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("near_sea")}
            ></span>
            Prox. mer
          </label>
          <label className="container">
            <input type="checkbox" />
            <span
              className={
                "checkmark" + (formData.near_walk === "yes" ? " checked" : "")
              }
              onClick={() => handleChange("near_walk")}
            ></span>
            Prox. balade
          </label>
        </fieldset>

        <button type="submit">Suivant</button>
      </form>
    </section>
  );
};

export default PlaceRegister;
