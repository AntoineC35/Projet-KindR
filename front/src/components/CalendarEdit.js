import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../reducers/authUser.reducer";
import { useState } from "react";
import "../styles/calendar.css";

const CalendarEdit = () => {
  const currentUser = useSelector(selectCurrentUser);

  const getRandomName = () => {
    const names = [
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Emma",
      "Frank",
      "Grace",
    ];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  const [calendarEvents, setCalendarEvents] = useState(
    currentUser.disponibility.map((disponibility) => ({
      id: disponibility.id,
      title: getRandomName(),
      start: disponibility.start_datetime,
      end: disponibility.end_datetime,
      backgroundColor: "#F68484",
      borderColor: "#F68484",
      color: "#3a87ad",
    }))
  );

  return (
    <FullCalendar
      plugins={[dayGridPlugin, listPlugin]}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "today",
      }}
      initialView="dayGridMonth"
      events={calendarEvents}
      views={{
        listMonth: { buttonText: "Liste mois" },
      }}
      height="auto"
    />
  );
};

export default CalendarEdit;
