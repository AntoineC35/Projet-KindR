import { useSelector, useDispatch } from "react-redux";
import {
  selectCSRFToken,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";
import { getLocation, createAddress } from "../actions/address.action";
import { useEffect, useState } from "react";
import { selectLocation } from "../reducers/address.reducer";
import { getCSRFToken, updateUser } from "../actions/authUser.action";
import "../styles/addressRegister.css";

const AddressRegister = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCSRFToken());
  }, [dispatch]);

  const [errorMessage, setErrorMessage] = useState("");
  const csrf_token = useSelector(selectCSRFToken);
  const location = useSelector(selectLocation);
  const loggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    user_id: user ? user.id : "",
    address: "",
    postal_code: "",
    city: "",
    location: location,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(getLocation(formData))
      .then((res) => {
        if (res && res.length > 0) {
          const newFormData = new FormData();
          newFormData.append("csrf_token", csrf_token);
          newFormData.append("user_id", formData.user_id);
          newFormData.append("address", formData.address);
          newFormData.append("postal_code", formData.postal_code);
          newFormData.append("city", formData.city);
          newFormData.append(
            "location",
            JSON.stringify({ lat: res[0]?.lat, long: res[0]?.lon })
          );

          return dispatch(createAddress(newFormData));
        } else {
          setErrorMessage("Désole nous n'avons pas pu trouver votre adresse");
        }
      })
      .then((res) => {
        return dispatch(updateUser(user.id));
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
        setErrorMessage("Une erreur s'est produite");
      });
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  if (user.address) {
    return <Navigate to="/reg/avatar_register" />;
  }

  return (
    <>
      <section className="proRegister">
        <h2>
          On a besoin de quelques infos pour continuer <em>%</em>
        </h2>
        <form onSubmit={handleSubmit} method="post">
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <label htmlFor="address">Adresse:</label>
          <input
            pattern="[a-zA-Z0-9\s]+"
            title="L'adresse ne doit contenir que des lettres, des chiffres et des espaces."
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="postal_code">Code postal:</label>
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="city">Ville:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <br />

          <input
            type="hidden"
            id="location"
            name="location"
            value={formData.location.center}
            onChange={handleChange}
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
};

export default AddressRegister;
