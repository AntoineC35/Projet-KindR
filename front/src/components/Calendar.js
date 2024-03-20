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
          title: "Occupé", // Titre de l'événement
          start: slot.start_datetime, // Date de début du créneau
          end: slot.end_datetime, // Date de fin du créneau
          backgroundColor: "#F68484", // Couleur de fond de l'événement
          borderColor: "#F68484", // Couleur de la bordure de l'événement
          editable: false, // Empêche l'édition de l'événement
        };
        allEvents.push(event);
      });

      // Obtenez la date d'aujourd'hui
      const today = new Date();
      // Obtenez la fin de l'année en cours
      const endOfYear = new Date(today.getFullYear(), 11, 31);

      // Ajoutez les créneaux disponibles à la liste des événements
      if (pro.availableSlot > 0) {
        for (let i = 0; i < 3; i++) {
          const event = {
            title: "Disponible", // Titre de l'événement
            start: format(today, "yyyy-MM-dd"), // Date de début du créneau (aujourd'hui)
            end: format(endOfYear, "yyyy-MM-dd"), // Date de fin du créneau (fin de l'année)
            backgroundColor: "#66BB6A", // Couleur de fond de l'événement
            borderColor: "#66BB6A", // Couleur de la bordure de l'événement
            editable: false, // Empêche l'édition de l'événement
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
