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
            <div className="h-full rounded-xl border bg-white px-4 py-8 shadow-sm">
                <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide text-gray-800 uppercase">
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
                                        <h2 className="mt-8 mb-4 px-2 text-xl font-bold tracking-wide text-blue-700">
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
                                                    className="mb-4 flex gap-4 rounded-lg bg-gray-50 p-4 shadow-sm"
                                                >
                                                    <div className="flex w-16 flex-col items-center justify-center">
                                                        <span className="text-2xl font-bold text-gray-700">
                                                            {new Date(
                                                                date,
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    day: "numeric",
                                                                },
                                                            )}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(
                                                                date,
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    weekday:
                                                                        "short",
                                                                },
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="mx-2 w-1 rounded-full bg-gray-200"></div>
                                                    <div className="flex-1 space-y-2">
                                                        {eventsOnDate.map(
                                                            (ev) => (
                                                                <div
                                                                    key={ev.id}
                                                                    onClick={() =>
                                                                        setEvent(
                                                                            ev,
                                                                        )
                                                                    }
                                                                    className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:border-blue-400 hover:bg-blue-50"
                                                                >
                                                                    <div>
                                                                        <h1 className="font-medium text-gray-800">
                                                                            {
                                                                                ev.eventName
                                                                            }
                                                                        </h1>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-sm text-gray-600">
                                                                            {to12Hours(
                                                                                ev.eventStartTime,
                                                                            )}
                                                                        </span>
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
                        <p className="text-center text-gray-500">
                            No current events.
                        </p>
                    )}
                </div>
            </div>

            {event && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        onClick={() => setEvent(undefined)}
                        className="fixed inset-0 bg-black opacity-40"
                    />
                    <div className="z-10 w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">
                            Event Details
                        </h2>
                        <div className="space-y-2">
                            <div>
                                <span className="font-semibold text-gray-700">
                                    Name:{" "}
                                </span>
                                {event.eventName}
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">
                                    Date:{" "}
                                </span>
                                {event.eventDate}
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">
                                    Start Time:{" "}
                                </span>
                                {to12Hours(event.eventStartTime)}
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">
                                    End Time:{" "}
                                </span>
                                {to12Hours(event.eventEndTime)}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={() => setEvent(undefined)}
                                className="rounded bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    handleEdit(event);
                                    setEvent(undefined);
                                }}
                                className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                            >
                                Edit Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Events;
