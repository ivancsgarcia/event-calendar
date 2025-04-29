import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Dispatch, SetStateAction } from "react";
import { Event } from "../types";

const Calendar = ({
    events,
    setEventDate,
}: {
    events: Event[];
    setEventDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
    const handleDateClick = (arg: DateClickArg) => {
        setEventDate(arg.date);
    };
    return (
        <div className="bg-white p-4">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "today,dayGridDay,dayGridWeek,dayGridMonth",
                    center: "title",
                    right: "prev,next",
                }}
                dateClick={handleDateClick}
                events={events.map((event) => {
                    const date = new Date(event.eventDate);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear();
                    const isoDate = `${year}-${month}-${day}`;
                    return {
                        title: event.eventName,
                        start: event.eventStartTime
                            ? `${isoDate}T${event.eventStartTime}`
                            : isoDate,
                        end: event.eventEndTime
                            ? `${isoDate}T${event.eventEndTime}`
                            : isoDate,
                        color: "blue",
                    };
                })}
                dayCellClassNames={"cursor-pointer hover:bg-blue-100"}
            />
        </div>
    );
};

export default Calendar;
