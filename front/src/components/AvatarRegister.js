import { useSelector, useDispatch } from "react-redux";
import {
  selectCSRFToken,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createAvatar } from "../actions/avatar.action";
import { getCSRFToken, updateUser } from "../actions/authUser.action";
import { avatarURLs } from "../data/avatarURLs";
import "../styles/avatar.css";

const AvatarRegister = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCSRFToken());
  }, [dispatch]);

  const csrf_token = useSelector(selectCSRFToken);
  const loggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    avatar_url: "",
    avatar_alt: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("csrf_token", csrf_token);
    newFormData.append("user_id", user.id);
    newFormData.append("avatar_url", formData.avatar_url);
    newFormData.append("avatar_alt", user.firstname);
    console.log(formData);
    dispatch(createAvatar(newFormData)).then((res) => {
      return dispatch(updateUser(user.id));
    });
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }
  if (user.avatar && user.role !== "parent") {
    return <Navigate to="/reg/place_register" />;
  }
  if (user.avatar && user.role === "parent") {
    return <Navigate to="/" />;
  }

  const handleImageClick = (avatarUrl) => {
    setFormData({
      avatar_url: avatarUrl,
    });
  };

  return (
    <>
      <article className="avatar">
        <h2>Choisissez un Avatar !</h2>
        <section className="avatar-grid">
          {avatarURLs.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`avatar-${index}`}
              onClick={() => handleImageClick(url)}
              className={formData.avatar_url === url ? "select" : ""}
            />
          ))}
        </section>
        <button onClick={handleSubmit}>Continuer</button>
      </article>
    </>
  );
};

export default AvatarRegister;
