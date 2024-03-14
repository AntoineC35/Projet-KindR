const ActivitesPro = ({ pro }) => {
  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>Critère</th>
            <th>Disponible</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ludothèques</td>
            <td>{pro.activite.game_space === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Bibliothèques</td>
            <td>{pro.activite.library === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Spectacle</td>
            <td>{pro.activite.show === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Piscine</td>
            <td>{pro.activite.pool === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Terrain de jeux</td>
            <td>{pro.activite.playground === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Promenade</td>
            <td>{pro.activite.walk === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Cinéma</td>
            <td>{pro.activite.cinema === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Parc collectif</td>
            <td>{pro.activite.collective_playspace === "yes" ? "V" : "X"}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ActivitesPro;
