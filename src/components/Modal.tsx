import { Dispatch, ReactNode, SetStateAction } from "react";

const Modal = ({
    children,
    setEventDate,
}: {
    children: ReactNode;
    setEventDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
    const handleCloseModal = () => {
        setEventDate(undefined);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                onClick={handleCloseModal}
                className="bg-opacity-40 fixed inset-0 bg-black/50 transition-opacity"
                aria-label="Close modal"
                tabIndex={-1}
            />
            <div className="z-10 w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
                {children}
            </div>
        </div>
    );
};

export default Modal;
