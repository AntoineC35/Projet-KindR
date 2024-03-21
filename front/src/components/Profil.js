import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from "../reducers/authUser.reducer";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Presentation from "./Presentation";
import Environnement from "./Environnement";
import ActivitesPro from "./ActivitesPro";
import "../styles/profil.css";

const Profil = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const [selectedTab, setSelectedTab] = useState("presentation");
  const tabComponents = {
    presentation: <Presentation pro={currentUser} />,
    environnement: <Environnement pro={currentUser} />,
    activites: <ActivitesPro pro={currentUser} />,
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  return (
    <>
      {currentUser ? (
        <section className="profil">
          <figure className="avatar">
            <img
              src={currentUser.avatar.avatar_url}
              alt={currentUser.avatar.avatar_alt}
            />
          </figure>
          <h1 className="lastname">{currentUser.lastname}</h1>
          <h2 className="firstname">{currentUser.firstname}</h2>
          <p className="role">{currentUser.role}</p>

          <p className="address">
            <em>%</em>
            {currentUser.address.address}
            <br></br>
            {currentUser.address.postal_code} {currentUser.address.city}
          </p>
          {currentUser.role !== "parent" && currentUser.role !== "admin" && (
            <>
              <Link className="button-message" to={`/messages`}>
                <em>9</em>Message
              </Link>
              <Link
                className="button-dispo"
                to={`/disponibility/${currentUser.id}`}
              >
                <em>*</em>Dispo
              </Link>
              <ul className="button-choices">
                <li onClick={() => handleTabClick("presentation")}>
                  Présentation
                </li>
                <li onClick={() => handleTabClick("environnement")}>
                  Environnement
                </li>
                <li onClick={() => handleTabClick("activites")}>Activités</li>
              </ul>
              {selectedTab && tabComponents[selectedTab]}
            </>
          )}
        </section>
      ) : (
        <p>No professional found with the specified ID.</p>
      )}
    </>
  );
};

export default Profil;
