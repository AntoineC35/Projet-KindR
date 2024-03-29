import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { selectPros } from "../reducers/users.reducer";
import { getPros } from "../actions/users.action";
import { useEffect, useState } from "react";
import Presentation from "./Presentation";
import ActivitesPro from "./ActivitesPro";
import Environnement from "./Environnement";
import "../styles/profil.css";
import Navigation from "./Navigation";
import { selectIsLoggedIn } from "../reducers/authUser.reducer";

const Details = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const pros = useSelector(selectPros);
  const { pro_id } = useParams();

  useEffect(() => {
    if (pro_id) {
      dispatch(getPros());
    }
  }, [dispatch, pro_id]);
  const selectedPro = pros && pros.find((pro) => pro.id === Number(pro_id));
  const [selectedTab, setSelectedTab] = useState("presentation");
  const tabComponents = {
    presentation: <Presentation pro={selectedPro} />,
    environnement: <Environnement pro={selectedPro} />,
    activites: <ActivitesPro pro={selectedPro} />,
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  if (!loggedIn) {
    return <Navigate to="/register" />;
  }

  return (
    <>
      <Navigation />
      {selectedPro ? (
        <section className="profil">
          <figure className="avatar">
            <img
              src={selectedPro.avatar.avatar_url}
              alt={selectedPro.avatar.avatar_alt}
            />
          </figure>
          <h1 className="lastname">{selectedPro.lastname}</h1>
          <h2 className="firstname">{selectedPro.firstname}</h2>
          <p className="role">{selectedPro.role}</p>

          <p className="address">
            <em>%</em>
            {selectedPro.address.address}
            <br></br>
            {selectedPro.address.postal_code} {selectedPro.address.city}
          </p>
          {selectedPro.role !== "parent" && selectedPro.role !== "admin" && (
            <>
              <Link
                className="button-message"
                to={`/message/${selectedPro.id}`}
              >
                <em>9</em>Message
              </Link>
              <Link
                className="button-dispo"
                to={`/disponibility/${selectedPro.id}`}
              >
                <em>*</em>Dispo
              </Link>
              <ul className="button-choices">
                <li
                  className={
                    selectedTab === "presentation" ? "selectedTab" : null
                  }
                  onClick={() => handleTabClick("presentation")}
                >
                  Présentation
                </li>
                <li
                  className={
                    selectedTab === "environnement" ? "selectedTab" : null
                  }
                  onClick={() => handleTabClick("environnement")}
                >
                  Environnement
                </li>
                <li
                  className={selectedTab === "activites" ? "selectedTab" : null}
                  onClick={() => handleTabClick("activites")}
                >
                  Activités
                </li>
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

export default Details;
