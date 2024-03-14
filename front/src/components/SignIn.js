import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCSRFToken, loginUser } from "../actions/authUser.action";
import { selectIsLoggedIn } from "../reducers/authUser.reducer";

const SignIn = () => {
  const dispatch = useDispatch();
  const csrf_token = useSelector((state) => state.authUserReducer.csrf_token);
  const loggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(getCSRFToken());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("csrf_token", csrf_token);
    newFormData.append("password", formData.password);
    newFormData.append("email", formData.email);
    dispatch(loginUser(newFormData));
  };

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <section className="proRegister">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Soumettre</button>
      </form>
    </section>
  );
};

export default SignIn;
