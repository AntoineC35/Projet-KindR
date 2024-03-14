import { useDispatch, useSelector } from "react-redux";
import {
  selectCSRFToken,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCSRFToken, updateUser } from "../actions/authUser.action";
import { createDisponibilitySlot } from "../actions/disponibility.action";
import CalendarEdit from "./CalendarEdit";

const DisponibilityRegister = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCSRFToken());
  }, [dispatch]);

  const csrf_token = useSelector(selectCSRFToken);
  const loggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    start_datetime: "",
    end_datetime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("csrf_token", csrf_token);
    newFormData.append("user_id", currentUser.id);
    newFormData.append("start_datetime", formData.start_datetime);
    newFormData.append("end_datetime", formData.end_datetime);
    dispatch(createDisponibilitySlot(newFormData)).then((res) => {
      return dispatch(updateUser(currentUser.id));
    });
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }
  if (currentUser.role === "parent") {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <CalendarEdit />
      {currentUser.disponibility ? (
        currentUser.disponibility.map((slot) =>
          slot ? (
            <p key={slot.id}>
              date de début {slot.start_datetime} et date de fin :{" "}
              {slot.end_datetime}
            </p>
          ) : (
            <p>Aucun slot réservé pour le moment</p>
          )
        )
      ) : (
        <></>
      )}
      {currentUser.disponibility &&
      currentUser.situation.total_capacity ===
        currentUser.disponibility.length ? (
        <>
          <p>Plus de slot disponible (votre capacité maximum a été atteinte)</p>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Date de début de contrat
            <input
              type="date"
              name="start_datetime"
              value={FormData.start_datetime}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Date de fin de contrat
            <input
              type="date"
              name="end_datetime"
              value={FormData.start_datetime}
              onChange={handleChange}
            ></input>
            <button type="submit">Ajouter</button>
          </label>
        </form>
      )}
      <Link to="/home">Finito Capito</Link>;
    </>
  );
};

export default DisponibilityRegister;
