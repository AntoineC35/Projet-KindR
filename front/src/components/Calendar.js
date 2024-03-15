import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useState } from "react";

const Calendar = ({ pro }) => {
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
    pro.disponibility.map((disponibility) => ({
      id: disponibility.id,
      title: getRandomName(),
      start: disponibility.start_datetime,
      end: disponibility.end_datetime,
      color: "#3a87ad",
    }))
  );

  return (
    <FullCalendar
      plugins={[dayGridPlugin, listPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      }}
      initialView="dayGridMonth"
      events={calendarEvents}
      views={{
        listMonth: { buttonText: "Liste mois" },
      }}
    />
  );
};

export default Calendar;
