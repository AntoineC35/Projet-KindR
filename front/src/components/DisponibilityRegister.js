import { useDispatch, useSelector } from "react-redux";
import {
  selectCSRFToken,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCSRFToken, updateUser } from "../actions/authUser.action";
import {
  createDisponibilitySlot,
  deleteDisponibilitySlot,
} from "../actions/disponibility.action";
import CalendarEdit from "./CalendarEdit";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import "../styles/disponibiltyRegister.css";

const DisponibilityRegister = () => {
  const dispatch = useDispatch();
  const [calendarKey, setCalendarKey] = useState(0);

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
    const startDate = new Date(formData.start_datetime);
    const endDate = new Date(formData.end_datetime);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error("Date invalide");
      return;
    }
    const newFormData = new FormData();
    newFormData.append("csrf_token", csrf_token);
    newFormData.append("user_id", currentUser.id);
    newFormData.append("start_datetime", formData.start_datetime);
    newFormData.append("end_datetime", formData.end_datetime);
    dispatch(createDisponibilitySlot(newFormData)).then((res) => {
      dispatch(updateUser(currentUser.id)).then((res) => {
        setCalendarKey((prevKey) => prevKey + 1);
      });
    });
  };

  const handleDeleteSlot = (slotId) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette disponibilités ?"
    );
    if (confirmed) {
      const newFormData = new FormData();
      newFormData.append("csrf_token", csrf_token);
      newFormData.append("disponibility_id", slotId);
      dispatch(deleteDisponibilitySlot(newFormData)).then((res) => {
        dispatch(updateUser(currentUser.id)).then((res) => {
          setCalendarKey((prevKey) => prevKey + 1);
        });
      });
    }
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }
  if (currentUser.role === "parent") {
    return <Navigate to="/" />;
  }

  // Créer un tableau vide avec la longueur égale à total_capacity
  const emptySlots = Array.from(
    {
      length:
        currentUser.situation.total_capacity -
        (currentUser.disponibility ? currentUser.disponibility.length : 0),
    },
    (_, index) => index
  );

  return (
    <>
      <CalendarEdit key={calendarKey} />
      <table className="table-dispo">
        <thead>
          <tr>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUser.disponibility &&
            currentUser.disponibility.map((slot) => (
              <tr key={slot.id}>
                <td>
                  {format(new Date(slot.start_datetime), "EEE d MMMM yyyy", {
                    locale: fr,
                  })}
                </td>
                <td>
                  {format(new Date(slot.end_datetime), "EEE d MMMM yyyy", {
                    locale: fr,
                  })}
                </td>
                <td>
                  <button
                    className="button-dispo-delete"
                    onClick={() => handleDeleteSlot(slot.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          {emptySlots.map((index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  name="start_datetime"
                  value={formData.start_datetime}
                  onChange={handleChange}
                />
              </td>

              <td>
                {" "}
                <input
                  type="date"
                  name="end_datetime"
                  value={formData.end_datetime}
                  onChange={handleChange}
                />
              </td>
              <td>
                {" "}
                <button className="button-dispo-add" onClick={handleSubmit}>
                  Ajouter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentUser.situation.total_capacity ===
        currentUser.disponibility.length && (
        <p>Plus de slot disponible (votre capacité maximum a été atteinte)</p>
      )}
      <Link className="button-dispo-home" to="/">
        Terminer l'inscription
      </Link>
    </>
  );
};

export default DisponibilityRegister;
