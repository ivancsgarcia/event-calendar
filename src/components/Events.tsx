import { useState } from "react";
import { Event } from "../types";

const Events = ({
    events,
    handleEdit,
}: {
    events: Event[] | undefined;
    handleEdit: (event: Event) => void;
}) => {
    const [event, setEvent] = useState<Event>();
    const groupEventsByMonth = (events: Event[]) => {
        const months: Record<string, Record<string, Event[]>> = {};
        events.forEach((event) => {
            const dateObj = new Date(event.eventDate);
            const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`;
            const dateKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
            if (!months[monthKey]) months[monthKey] = {};
            if (!months[monthKey][dateKey]) months[monthKey][dateKey] = [];
            months[monthKey][dateKey].push(event);
        });
        return months;
    };

    const to12Hours = (time24: string) => {
        const [hourStr, minute] = time24.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "pm" : "am";
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    };

    return (
        <>
            <div className="h-full border bg-white px-4 py-8">
                <h1 className="text-center text-xl font-bold uppercase">
                    Events
                </h1>
                <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-96 overflow-y-auto md:max-h-[500px] lg:max-h-[700px]">
                    {events && events.length > 0 ? (
                        <div>
                            {Object.entries(groupEventsByMonth(events))
                                .sort(([a], [b]) => a.localeCompare(b))
                                .map(([monthKey, datesObj]) => (
                                    <div key={monthKey}>
                                        {/* Month Title */}
                                        <h2 className="mt-4 mb-2 px-4 text-lg font-bold">
                                            {new Date(
                                                `${monthKey}-01`,
                                            ).toLocaleString("en-US", {
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </h2>
                                        {Object.entries(datesObj)
                                            .sort(
                                                ([dateA], [dateB]) =>
                                                    new Date(dateA).getTime() -
                                                    new Date(dateB).getTime(),
                                            )
                                            .map(([date, eventsOnDate]) => (
                                                <div
                                                    key={date}
                                                    className="flex gap-2 p-4"
                                                >
                                                    <div>
                                                        <p className="text-xl font-bold">
                                                            {new Date(
                                                                date,
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    day: "numeric",
                                                                },
                                                            )}
                                                        </p>
                                                        <p>
                                                            {new Date(
                                                                date,
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    weekday:
                                                                        "short",
                                                                },
                                                            )}
                                                        </p>
                                                    </div>

                                                    <div className="w-1 bg-gray-400"></div>
                                                    <div className="w-full">
                                                        {eventsOnDate.map(
                                                            (ev) => (
                                                                <div
                                                                    onClick={() =>
                                                                        setEvent(
                                                                            ev,
                                                                        )
                                                                    }
                                                                    className="mb-1 flex cursor-pointer items-center justify-between rounded border p-3"
                                                                >
                                                                    <div>
                                                                        <h1 className="font-bold">
                                                                            {
                                                                                ev.eventName
                                                                            }
                                                                        </h1>
                                                                    </div>
                                                                    <div>
                                                                        <p>
                                                                            {to12Hours(
                                                                                ev.eventStartTime,
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p>No current events.</p>
                    )}
                </div>
            </div>

            {event && (
                <div
                    onClick={() => setEvent(undefined)}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    <div
                        onClick={() => {}}
                        className="fixed inset-0 bg-black opacity-50"
                    />
                    <div className="z-10 w-xl bg-white">
                        <div>
                            <p>{event.eventDate}</p>
                            <p>{event.eventName}</p>
                            <p>{event.eventStartTime}</p>
                            <p>{event.eventEndTime}</p>
                            <div>
                                <button
                                    onClick={() => handleEdit(event)}
                                    className="cursor-pointer rounded border p-2"
                                >
                                    Edit Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Events;
