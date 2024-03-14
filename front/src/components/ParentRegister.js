import { useSelector, useDispatch } from "react-redux";
import {
  selectCSRFToken,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUser, getCSRFToken } from "../actions/authUser.action";
import { selectSuccess } from "../reducers/authUser.reducer";
import "../styles/parentRegister.css";

const ParentRegister = () => {
  const dispatch = useDispatch();
  const csrf_token = useSelector(selectCSRFToken);
  const loggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);
  const success = useSelector(selectSuccess);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    verify_password: "",
    role: "parent",
  });

  useEffect(() => {
    dispatch(getCSRFToken());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.verify_password) {
      console.error("Les mots de passe ne correspondent pas.");
      return;
    }
    const newFormData = new FormData();
    newFormData.append("csrf_token", csrf_token);
    newFormData.append("firstname", formData.firstname);
    newFormData.append("lastname", formData.lastname);
    newFormData.append("email", formData.email);
    newFormData.append("password", formData.password);
    newFormData.append("verify_password", formData.verify_password);
    newFormData.append("role", formData.role);
    dispatch(createUser(newFormData));
  };

  if (success && user) {
    return <Navigate to="/reg/address_register" />;
  }
  if (loggedIn && user.address) {
    return <Navigate to="/home" />;
  }

  return (
    <section class="parentRegister">
      <h1>Création de compte</h1>
      <form onSubmit={handleSubmit}>
        <label># Prénom</label>
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          required
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
        />

        <label># Nom:</label>
        <input
          required
          type="text"
          name="lastname"
          placeholder="Nom"
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
        />

        <label># Email</label>
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label># Mot de passe:</label>
        <input
          required
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <label># Vérifier le mot de passe:</label>
        <input
          required
          type="password"
          name="verify_password"
          placeholder="Mot de passe"
          value={formData.verify_password}
          onChange={(e) =>
            setFormData({ ...formData, verify_password: e.target.value })
          }
        />

        {formData.password !== formData.verify_password && (
          <p style={{ color: "red" }}>
            Les mots de passe ne correspondent pas.
          </p>
        )}

        <button type="submit">Créer un compte</button>
      </form>
    </section>
  );
};

export default ParentRegister;
