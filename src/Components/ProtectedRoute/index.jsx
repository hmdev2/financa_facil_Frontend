import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const [ isValid, setIsValid ] = useState(null);
    const token = localStorage.getItem("Authorization");

    useEffect(() => {
        
        if(!token) {
            setIsValid(false);
            return;
        }

        fetch("https://financa-facil-g3n2.onrender.com/api/validate-token", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
        })
        .then(res => {
            if(!res.ok) throw new Error("Token inválido");
            setIsValid(true);
        })
        .catch(() => {
            localStorage.removeItem("Authorization");
            setIsValid(false);
        });
    }, [token]);

    if(isValid === null) return <div className="container">Carregando...</div>
    if(isValid === false) return <Navigate to="/log-in" replace />;

    return <Outlet />;
};