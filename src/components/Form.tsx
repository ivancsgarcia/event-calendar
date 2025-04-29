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
        <form onSubmit={handleSubmit} className="border p-4">
            <h1 className="text-center font-bold">Create Event Form</h1>

            <div className="mb-4">
                <label className="mb-1 block">Event Name</label>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setEventName(e.target.value);
                    }}
                    required
                    className="w-full border p-2"
                />
            </div>
            <div className="mb-4">
                <label className="mb-1 block">Event Date</label>
                <input
                    type="text"
                    value={eventDate.toLocaleDateString()}
                    disabled
                    required
                    className="w-full border p-2"
                />
            </div>
            <div className="mb-4">
                <label className="mb-1 block">Event Start Time</label>
                <input
                    type="time"
                    value={eventStartTime}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEventStartTime(e.target.value)
                    }
                    required
                    className="w-full border p-2"
                />
            </div>
            <div className="mb-6">
                <label className="mb-1 block">Event End Time</label>
                <input
                    type="time"
                    value={eventEndTime}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEventEndTime(e.target.value)
                    }
                    required
                    className="w-full border p-2"
                />
            </div>
            <button type="submit" className="w-full border p-2">
                Save Event
            </button>
        </form>
    );
};

export default Form;
