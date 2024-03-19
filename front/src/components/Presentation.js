import he from "he";

const Presentation = ({ pro }) => {
  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  }

  return (
    <table className="table-profil">
      <tbody>
        <tr>
          <td>Age</td>
          <td>{pro.situation.age}</td>
        </tr>
        <tr>
          <td>Enfant(s) du foyer</td>
          <td>{he.decode(pro.situation.kids)}</td>
        </tr>
        <tr>
          <td>Autres Adultes</td>
          <td>{he.decode(pro.situation.other_adults)}</td>
        </tr>
        <tr>
          <td>Formation</td>
          <td>{he.decode(pro.situation.formation)}</td>
        </tr>
        <tr>
          <td>Experience</td>
          <td>{he.decode(pro.situation.experience)}</td>
        </tr>
        <tr>
          <td>Date d'agrément</td>
          <td>{formatDate(pro.situation.date_agrement)}</td>
        </tr>
        <tr>
          <td>Capacité total</td>
          <td>{pro.situation.total_capacity}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Presentation;
