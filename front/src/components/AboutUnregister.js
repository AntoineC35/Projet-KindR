import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../reducers/authUser.reducer";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Mentions from "./Mentions";
import Politique from "./Politique";
import Remerciement from "./Remerciement";
import "../styles/about.css";

const AboutUnregister = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const [selectedTab, setSelectedTab] = useState("mentions");
  const { option } = useParams();
  const tabComponents = {
    mentions: <Mentions />,
    politique: <Politique />,
    remerciement: <Remerciement />,
  };

  useEffect(() => {
    if (option && tabComponents.hasOwnProperty(option)) {
      setSelectedTab(option);
    }
  }, [option]);

  if (loggedIn) {
    return <Navigate to="/about" />;
  }

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <section className="about">
      <ul className="button_choices">
        <li
          className={selectedTab === "mentions" ? "active" : ""}
          onClick={() => handleTabClick("mentions")}
        >
          Mentions Légales
        </li>
        <li
          className={selectedTab === "politique" ? "active" : ""}
          onClick={() => handleTabClick("politique")}
        >
          Politique de confidentialité
        </li>
        <li
          className={selectedTab === "remerciement" ? "active" : ""}
          onClick={() => handleTabClick("remerciement")}
        >
          Remerciements
        </li>
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

export default AboutUnregister;
