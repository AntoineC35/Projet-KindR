const Presentation = ({ pro }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Critère</th>
          <th>Valeur</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Age</td>
          <td>{pro.situation.age}</td>
        </tr>
        <tr>
          <td>Enfant(s) du foyer</td>
          <td>{pro.situation.kids}</td>
        </tr>
        <tr>
          <td>Autres Adultes</td>
          <td>{pro.situation.other_adults}</td>
        </tr>
        <tr>
          <td>Formation</td>
          <td>{pro.situation.formation}</td>
        </tr>
        <tr>
          <td>Experience</td>
          <td>{pro.situation.experience}</td>
        </tr>
        <tr>
          <td>Date d'agrément</td>
          <td>{pro.situation.date_agrement}</td>
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
