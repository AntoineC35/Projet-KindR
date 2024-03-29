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
import "../styles/proRegister.css";

const ProRegister = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCSRFToken());
  }, [dispatch]);

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
    role: "assmat",
  });

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
    return <Navigate to="/" />;
  }

  return (
    <section className="proRegister">
      <h1>Création de compte</h1>
      <form onSubmit={handleSubmit}>
        <label>Prénom</label>
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

        <label>Nom</label>
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          required
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          title="Le mot de passe doit contenir au moins un chiffre, une lettre majuscule, une lettre minuscule, un caractère spécial et être d'au moins 8 caractères de longueur."
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}$"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <label>Vérifier le mot de passe</label>

        <input
          type="password"
          name="verify_password"
          placeholder="Mot de passe"
          required
          value={formData.verify_password}
          onChange={(e) =>
            setFormData({ ...formData, verify_password: e.target.value })
          }
        />
        <label>Catégorie</label>
        <select
          name="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="assmat">Assisstant(e) Maternel(le)</option>
          <option value="creche_privee">Crèche Privée</option>
          <option value="creche_public">Crèche Municipale</option>
          <option value="babysitting">Babysitter(e)</option>
        </select>

        <button type="submit">Créer un compte</button>
        {formData.password !== formData.verify_password && (
          <p style={{ color: "red" }}>
            Les mots de passe ne correspondent pas.
          </p>
        )}
      </form>
    </section>
  );
};

export default ProRegister;
