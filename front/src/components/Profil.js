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
        <section>
          <h1>{currentUser.lastname}</h1>
          <h2>{currentUser.firstname}</h2>
          <p>{currentUser.address.address}</p>
          <p>{currentUser.address.postal_code}</p>
          <p>{currentUser.address.city}</p>
          {currentUser.role !== "parent" && currentUser.role !== "admin" && (
            <div>
              <ul>
                <li onClick={() => handleTabClick("presentation")}>
                  Présentation
                </li>
                <li onClick={() => handleTabClick("environnement")}>
                  Environnement
                </li>
                <li onClick={() => handleTabClick("activites")}>Activités</li>
              </ul>
              {selectedTab && tabComponents[selectedTab]}
            </div>
          )}
        </section>
      ) : (
        <p>No professional found with the specified ID.</p>
      )}
      <Link to="/home">Back to home</Link>
    </>
  );
};

export default Profil;
