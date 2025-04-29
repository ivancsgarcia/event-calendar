import { ReactNode } from "react";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router";

const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (currentUser) {
        return <Navigate to={"/"} replace />;
    }
    return <>{children}</>;
};

export default PublicRoute;
