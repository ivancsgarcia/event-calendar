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
                className="fixed inset-0 bg-black opacity-50"
            />
            <div className="z-10 w-xl bg-white">{children}</div>
        </div>
    );
};

export default Modal;
