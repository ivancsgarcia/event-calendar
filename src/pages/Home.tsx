import { FormEvent, useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import Events from "../components/Events";
import { Event } from "../types";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { useAuth } from "../contexts/authContext";

const Home = () => {
    const { currentUser } = useAuth();
    const [eventDate, setEventDate] = useState<Date>();
    const [eventName, setEventName] = useState<string>("");
    const [eventStartTime, setEventStartTime] = useState<string>("00:00");
    const [eventEndTime, setEventEndTime] = useState<string>("00:00");
    const [events, setEvents] = useState<Event[]>([]);
    const [editEvent, setEditEvent] = useState<Event>();

    useEffect(() => {
        if (currentUser) {
            getEvents();
        }
    }, [currentUser]);

    const getEvents = async () => {
        const querySnapshot = await getDocs(
            collection(db, "users", currentUser!.uid, "events"),
        );
        const events = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Event[];

        setEvents(events);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Sign out successful");
        } catch (error) {
            console.error("Sign out failed", error);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!eventName || !eventDate) return;

        const newEvent = {
            eventName,
            eventDate: eventDate.toLocaleDateString(),
            eventStartTime,
            eventEndTime,
        };

        try {
            await addDoc(
                collection(db, "users", currentUser!.uid, "events"),
                newEvent,
            );
            await getEvents();
        } catch (error) {
            console.error("Error adding event: ", error);
        } finally {
            setEventName("");
            setEventStartTime("00:00");
            setEventEndTime("00:00");
            setEventDate(undefined);
        }
    };

    const handleEdit = (event: Event) => {
        setEditEvent(event);
    };

    const handleUpdateEvent = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editEvent) return;
        try {
            await updateDoc(
                doc(db, "users", currentUser!.uid, "events", editEvent!.id),
                {
                    eventName: editEvent.eventName,
                    eventDate: editEvent.eventDate,
                    eventStartTime: editEvent.eventStartTime,
                    eventEndTime: editEvent.eventEndTime,
                },
            );
            await getEvents();
            setEditEvent(undefined);
        } catch (error) {
            console.error("Error updating event: ", error);
        }
    };

    const handleDeleteEvent = async () => {
        try {
            await deleteDoc(
                doc(db, "users", currentUser!.uid, "events", editEvent!.id),
            );
            await getEvents();
            setEditEvent(undefined);
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    return (
        <>
            <div className="bg-gray-200">
                <div className="relative container mx-auto min-h-screen px-4 py-12">
                    <h1 className="mb-8 text-center text-2xl font-bold uppercase">
                        Event Calendar
                    </h1>
                    <div className="flex flex-col-reverse gap-4 md:justify-around lg:flex-row">
                        <div className="w-full lg:w-8/12">
                            <Calendar
                                events={events}
                                setEventDate={setEventDate}
                            />
                        </div>
                        <div className="w-full lg:w-4/12">
                            <Events events={events} handleEdit={handleEdit} />
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="absolute top-4 right-4 block cursor-pointer rounded border border-transparent bg-red-500 p-2 text-white"
                    >
                        Sign out
                    </button>
                </div>
            </div>
            {eventDate && (
                <Modal setEventDate={setEventDate}>
                    <Form
                        handleSubmit={handleSubmit}
                        eventName={eventName}
                        setEventName={setEventName}
                        eventDate={eventDate}
                        eventStartTime={eventStartTime}
                        setEventStartTime={setEventStartTime}
                        eventEndTime={eventEndTime}
                        setEventEndTime={setEventEndTime}
                    />
                </Modal>
            )}

            {editEvent && (
                <Modal setEventDate={() => setEditEvent(undefined)}>
                    <form onSubmit={handleUpdateEvent} className="border p-4">
                        <h1 className="mb-4 text-center font-bold">
                            Edit Event
                        </h1>
                        <div className="mb-4">
                            <label className="mb-1 block">Event Name</label>
                            <input
                                type="text"
                                value={editEvent.eventName}
                                onChange={(e) =>
                                    setEditEvent({
                                        ...editEvent,
                                        eventName: e.target.value,
                                    })
                                }
                                required
                                className="w-full border p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block">Event Date</label>
                            <input
                                type="text"
                                value={editEvent.eventDate}
                                disabled
                                className="w-full border p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block">
                                Event Start Time
                            </label>
                            <input
                                type="time"
                                value={editEvent.eventStartTime}
                                onChange={(e) =>
                                    setEditEvent({
                                        ...editEvent,
                                        eventStartTime: e.target.value,
                                    })
                                }
                                required
                                className="w-full border p-2"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="mb-1 block">Event End Time</label>
                            <input
                                type="time"
                                value={editEvent.eventEndTime}
                                onChange={(e) =>
                                    setEditEvent({
                                        ...editEvent,
                                        eventEndTime: e.target.value,
                                    })
                                }
                                required
                                className="w-full border p-2"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleDeleteEvent}
                                className="rounded bg-red-600 px-4 py-2 text-white"
                            >
                                Delete
                            </button>
                            <button
                                type="submit"
                                className="rounded bg-blue-600 px-4 py-2 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};

export default Home;
