import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  const [fontFamily, setFontFamily] = useState("More sugar");
  const [fontSize, setFontSize] = useState(16);

  return (
    <footer className="footer">
      <ul>
        <li>
          <NavLink to="/about">Mentions Légales</NavLink>
        </li>
        <li>
          <NavLink to="/about">Politique de Confidentialité</NavLink>
        </li>
        <li>
          Accesibilité{" "}
          <ul>
            <li>
              <label>Typo</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
              >
                <option value="More sugar">Classique</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </li>
            <li>
              <label>Taille texte</label>
              <input
                type="range"
                min="10"
                max="30"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </li>
          </ul>
        </li>
      </ul>
      <p>© 2024 Antoine Cormier - Tous droits réservés</p>
      <style>{`
        body {
          font-family: ${fontFamily};
          font-size: ${fontSize}px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
