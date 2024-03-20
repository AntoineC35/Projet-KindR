import { NavLink } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
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
