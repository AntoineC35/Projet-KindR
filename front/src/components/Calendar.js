import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useEffect, useState } from "react";
import "../styles/calendar.css";
import { format } from "date-fns";

const Calendar = ({ pro }) => {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    if (pro && pro.disponibility) {
      // Créez une liste de tous les événements (occupés et disponibles)
      let allEvents = [];

      // Ajoutez les créneaux occupés à la liste des événements
      pro.disponibility.forEach((slot) => {
        const event = {
          title: "Occupé",
          start: slot.start_datetime,
          end: slot.end_datetime,
          backgroundColor: "#F68484",
          borderColor: "#F68484",
          editable: false,
        };
        allEvents.push(event);
      });

      const today = new Date();
      // Obtenez la fin de l'année en cours
      const endOfYear = new Date(today.getFullYear(), 11, 31);

      // Ajoutez les créneaux disponibles à la liste des événements
      if (pro.availableSlot > 0) {
        for (let i = 0; i < 3; i++) {
          const event = {
            title: "Disponible",
            start: format(today, "yyyy-MM-dd"),
            end: format(endOfYear, "yyyy-MM-dd"),
            backgroundColor: "#66BB6A",
            borderColor: "#66BB6A",
            editable: false,
          };
          allEvents.push(event);
        }
      }

      // Mettez à jour la liste des événements du calendrier
      setCalendarEvents(allEvents);
    }
  }, [pro]);

  return (
    <section className="calendar">
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
    </section>
  );
};

export default Calendar;
