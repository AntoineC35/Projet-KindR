import { useDispatch, useSelector } from "react-redux";
import { selectPros } from "../reducers/users.reducer";
import { getPros } from "../actions/users.action";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/homecards.css";

const HomeCard = ({ selectedRoles }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPros());
  }, [dispatch]);

  const pros = useSelector(selectPros);

  const filteredPros = pros
    ? pros.filter((pro) => selectedRoles.includes(pro.role))
    : [];

  return (
    <section className="homecards">
      {filteredPros.map((pro) =>
        pro && pro.address ? (
          <article key={pro.id} className="card">
            {pro.avatar ? (
              <figure className="div1">
                <img src={pro.avatar.avatar_url} alt={pro.avatar.avatar_alt} />
              </figure>
            ) : null}
            <h3 className="div2">{pro.lastname}</h3>
            <h4 className="div3">{pro.firstname}</h4>
            <p className="div4">{pro.role}</p>
            <p className="div5">
              {pro.address.address} {pro.address.postal_code} {pro.address.city}
            </p>
            <p className="div7">Place dispo : {pro.availableSlot}</p>
            <Link className="message div6" to={`/message/${pro.id}`}>
              <em>9</em>
            </Link>
            <Link className="details div8" to={`/details/${pro.id}`}>
              Détails
            </Link>
            <Link className="disponibilty div9" to={`/disponibility/${pro.id}`}>
              Dispo
            </Link>
          </article>
        ) : null
      )}
    </section>
  );
};

export default HomeCard;
