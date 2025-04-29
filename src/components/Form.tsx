import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface FormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    eventName: string;
    setEventName: Dispatch<SetStateAction<string>>;
    eventDate: Date;
    eventStartTime: string;
    setEventStartTime: Dispatch<SetStateAction<string>>;
    eventEndTime: string;
    setEventEndTime: Dispatch<SetStateAction<string>>;
}

const Form = ({
    handleSubmit,
    eventName,
    setEventName,
    eventDate,
    eventStartTime,
    setEventStartTime,
    eventEndTime,
    setEventEndTime,
}: FormProps) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-md rounded-xl border border-gray-100 bg-white px-8 py-8 shadow-lg"
        >
            <h1 className="mb-8 text-center text-2xl font-semibold tracking-tight text-gray-900">
                Create Event
            </h1>

            <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Event Name
                </label>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEventName(e.target.value)
                    }
                    required
                    className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                />
            </div>
            <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Event Date
                </label>
                <input
                    type="text"
                    value={eventDate.toLocaleDateString("en-CA")}
                    disabled
                    className="w-full rounded-md border border-gray-200 bg-gray-100 p-2 text-gray-900"
                />
            </div>
            <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Event Start Time
                </label>
                <input
                    type="time"
                    value={eventStartTime}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEventStartTime(e.target.value)
                    }
                    required
                    className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                />
            </div>
            <div className="mb-8">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Event End Time
                </label>
                <input
                    type="time"
                    value={eventEndTime}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEventEndTime(e.target.value)
                    }
                    required
                    className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                />
            </div>
            <button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-2 font-medium text-white shadow transition hover:bg-blue-700"
            >
                Save Event
            </button>
        </form>
    );
};

export default Form;
