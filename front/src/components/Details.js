import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPros } from "../reducers/users.reducer";
import { getPros } from "../actions/users.action";
import { useEffect, useState } from "react";
import Presentation from "./Presentation";
import ActivitesPro from "./ActivitesPro";
import Environnement from "./Environnement";

const Details = () => {
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

  return (
    <>
      {selectedPro ? (
        <section>
          <h1>{selectedPro.lastname}</h1>
          <h2>{selectedPro.firstname}</h2>
          <p>{selectedPro.address.address}</p>
          <p>{selectedPro.address.postal_code}</p>
          <p>{selectedPro.address.city}</p>
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
        </section>
      ) : (
        <p>No professional found with the specified ID.</p>
      )}
      <Link to="/home">Back to home</Link>
    </>
  );
};

export default Details;
