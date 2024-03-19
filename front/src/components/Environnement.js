const Environnement = ({ pro }) => {
  return (
    <>
      <table className="table-profil">
        <tbody>
          <tr>
            <td>Type de logement</td>
            <td>{pro.place.type === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Etage</td>
            <td>{pro.place.level === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Ascenseur</td>
            <td>{pro.place.pool === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Piscine</td>
            <td>{pro.place.garden === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Animaux</td>
            <td>{pro.place.elevator === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Jardin</td>
            <td>{pro.place.yard === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Proximité School</td>
            <td>{pro.place.near_school === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Proximité Parc</td>
            <td>{pro.place.near_park === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Proximité Ecole</td>
            <td>{pro.place.sea === "yes" ? "V" : "X"}</td>
          </tr>
          <tr>
            <td>Proximité Mer</td>
            <td>{pro.place.walk === "yes" ? "V" : "X"}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default Environnement;
