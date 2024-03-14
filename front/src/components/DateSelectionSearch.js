import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProsByDate } from "../actions/users.action";

const DateSelectionSearch = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Date sélectionnée :", selectedDate);
    const chosenDate = new FormData();
    chosenDate.append("chosen_date", selectedDate);
    dispatch(getProsByDate(chosenDate));
    console.log(chosenDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sélectionnez une date :
        <input
          type="date"
          value={selectedDate}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default DateSelectionSearch;
