import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../reducers/authUser.reducer";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import Mentions from "./Mentions";
import Politique from "./Politique";
import Remerciement from "./Remerciement";
import "../styles/about.css";

const About = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const [selectedTab, setSelectedTab] = useState("mentions");
  const tabComponents = {
    mentions: <Mentions />,
    politique: <Politique />,
    remerciement: <Remerciement />,
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <section className="about">
      <ul className="button_choices">
        <li onClick={() => handleTabClick("mentions")}>Mentions Légales</li>
        <li onClick={() => handleTabClick("politique")}>
          Politique de confidentialité
        </li>
        <li onClick={() => handleTabClick("remerciement")}>Remerciements</li>
        <li>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/AntoineC35/Projet-KindR"
          >
            Lien gitHub du projet
          </a>
        </li>
      </ul>

      {selectedTab && tabComponents[selectedTab]}
    </section>
  );
};

export default About;
