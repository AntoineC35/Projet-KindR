import { useSelector, useDispatch } from "react-redux";
import {
  selectCSRFToken,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createSituation } from "../actions/situation.action";
import { getCSRFToken, updateUser } from "../actions/authUser.action";
import "../styles/placeRegister.css";

const SituationRegister = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCSRFToken());
  }, [dispatch]);

  const csrf_token = useSelector(selectCSRFToken);
  const loggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    age: 0,
    formation: "",
    situation: "célibataire",
    experience: "",
    kids: "",
    date_agrement: "",
    other_adults: "",
    total_capacity: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("csrf_token", csrf_token);
    newFormData.append("user_id", user.id);
    newFormData.append("age", formData.age);
    newFormData.append("formation", formData.formation);
    newFormData.append("situation", formData.situation);
    newFormData.append("experience", formData.experience);
    newFormData.append("kids", formData.kids);
    newFormData.append("date_agrement", formData.date_agrement);
    newFormData.append("other_adults", formData.other_adults);
    newFormData.append("total_capacity", formData.total_capacity);
    console.log(formData);
    dispatch(createSituation(newFormData)).then((res) => {
      return dispatch(updateUser(user.id));
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? (checked ? value : "no") : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }
  if (user.situation) {
    return <Navigate to="/disponibility_register" />;
  }
  return (
    <section className="proRegister">
      <form onSubmit={handleSubmit}>
        <label>Âge</label>
        <input
          required
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        <label>Formation</label>
        <input
          required
          placeholder="Formation"
          type="text"
          name="formation"
          value={formData.formation}
          onChange={handleChange}
        />

        <label>Situation</label>
        <select
          required
          name="situation"
          value={formData.situation}
          onChange={handleChange}
        >
          <option value="célibataire">Célibataire</option>
          <option value="en_couple">En couple</option>
          <option value="marié(e)">Marié(e)</option>
        </select>

        <label>Expérience</label>
        <input
          required
          placeholder="Expérience"
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />

        <label>Enfants</label>

        <input
          required
          placeholder="Enfants"
          type="text"
          name="kids"
          value={formData.kids}
          onChange={handleChange}
        />

        <label>Date d'agrément</label>
        <input
          required
          type="date"
          name="date_agrement"
          value={formData.date_agrement}
          onChange={handleChange}
        />

        <label>Autres adultes</label>
        <input
          required
          placeholder="Autres Adultes"
          type="text"
          name="other_adults"
          value={formData.other_adults}
          onChange={handleChange}
        />

        <label>Capacité totale</label>
        <input
          required
          type="number"
          name="total_capacity"
          value={formData.total_capacity}
          onChange={handleChange}
        />

        <button type="submit">Suivant</button>
      </form>
    </section>
  );
};

export default SituationRegister;
