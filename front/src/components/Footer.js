import { NavLink, useNavigate } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(+1);
  };

  return (
    <footer className="footer">
      <ul>
        <li>
          <NavLink to="/about">Mentions Légales</NavLink>
        </li>
        <li>
          <NavLink to="/about">Politique de Confidentialité</NavLink>
        </li>
      </ul>
      <p>© 2024 Antoine Cormier - Tous droits réservés</p>
    </footer>
  );
};

export default Footer;
