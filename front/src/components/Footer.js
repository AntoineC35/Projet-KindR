import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/footer.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../reducers/authUser.reducer";

const Footer = () => {
  const [fontFamily, setFontFamily] = useState("More sugar");
  const [fontSize, setFontSize] = useState(16);
  const [colorScheme, setColorScheme] = useState("default");
  const [textColor, setTextColor] = useState("default");
  const [showAccessibilityOptions, setShowAccessibilityOptions] =
    useState(false); // État pour contrôler l'affichage des options d'accessibilité
  const loggedIn = useSelector(selectIsLoggedIn);

  const changeColorScheme = (color) => {
    setColorScheme(color);
  };

  const changeTextColor = (color) => {
    setTextColor(color);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  return (
    <footer className="footer">
      <ul>
        <li>
          {!loggedIn ? (
            <NavLink to="/reg/about-unregister/mentions">
              Mentions Légales
            </NavLink>
          ) : (
            <NavLink to="/about/mentions">Mentions Légales</NavLink>
          )}
        </li>
        <li>
          {!loggedIn ? (
            <NavLink to="/reg/about-unregister/politique">
              Politique de Confidentialité
            </NavLink>
          ) : (
            <NavLink to="/about/politique">
              Politique de Confidentialité
            </NavLink>
          )}
        </li>
        <li>
          <button
            className="button-accessibilite"
            onClick={() =>
              setShowAccessibilityOptions(!showAccessibilityOptions)
            }
          >
            Accessibilité
          </button>
          {showAccessibilityOptions && (
            <ul className="menu-accessibilite">
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
                <ul>
                  <li>
                    <label>
                      <input
                        type="radio"
                        value={10}
                        checked={fontSize === 10}
                        onChange={() => handleFontSizeChange(10)}
                      />
                      Small 10px
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        value={16}
                        checked={fontSize === 16}
                        onChange={() => handleFontSizeChange(16)}
                      />
                      Normal 16px
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        value={20}
                        checked={fontSize === 20}
                        onChange={() => handleFontSizeChange(20)}
                      />
                      Medium 20px
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        value={25}
                        checked={fontSize === 25}
                        onChange={() => handleFontSizeChange(25)}
                      />
                      Big 25px
                    </label>
                  </li>
                </ul>
              </li>
              <li>
                <label>Couleur</label>
                <select
                  value={colorScheme}
                  onChange={(e) => changeColorScheme(e.target.value)}
                >
                  <option value="default">Par défaut</option>
                  <option value="pink-pale">Rose pâle</option>
                  <option value="red">Rouge</option>
                  <option value="blue">Bleu</option>
                  <option value="green">Vert</option>
                  <option value="purple">Violet</option>
                  <option value="yellow">Jaune</option>
                  <option value="beige">Beige</option>
                  <option value="black">Noir</option>
                </select>
              </li>
              <li>
                <label>Couleur du texte</label>
                <select
                  value={textColor}
                  onChange={(e) => changeTextColor(e.target.value)}
                >
                  <option value="default">Par défaut</option>
                  <option value="black">Noir</option>
                  <option value="white">Blanc</option>
                </select>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <p>© 2024 Antoine Cormier - Tous droits réservés</p>
      <style>{`
        body {
          font-family: ${fontFamily};
          font-size: ${fontSize}px;
          ${colorScheme !== "default" ? `--beige: var(--${colorScheme});` : ""}
          ${textColor !== "default" ? `--text-white: ${textColor};` : ""}
          ${textColor !== "default" ? `--text-black: ${textColor};` : ""}
          ${textColor !== "default" ? `--text-red: ${textColor};` : ""}
          ${textColor !== "default" ? `--text-blue: ${textColor};` : ""}
          ${textColor !== "default" ? `--text-green: ${textColor};` : ""}
          ${textColor !== "default" ? `--text-yellow: ${textColor};` : ""}
          ${textColor !== "default" ? `--text-purple: ${textColor};` : ""}
          ${textColor !== "default" ? `--text-beige: ${textColor};` : ""}
          ${textColor !== "default" ? `--text-pink-pale: ${textColor};` : ""}
        }
      `}</style>
    </footer>
  );
};

export default Footer;
