import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const token = localStorage.getItem("Authorization");

    if(!token) {
        return <Navigate to="/log-in" replace />
    }

    return <Outlet />;
};