import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProsByDate } from "../actions/users.action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datePicker.css";

const DateSelectionSearch = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      const chosenDate = new FormData();
      chosenDate.append("chosen_date", selectedDate.toISOString());
      dispatch(getProsByDate(chosenDate));
    }
  };

  return (
    <form className="datePicker" onSubmit={handleSubmit}>
      <label>
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          required
        />
      </label>
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default DateSelectionSearch;
