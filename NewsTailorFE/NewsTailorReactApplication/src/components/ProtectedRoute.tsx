import { Navigate } from "react-router-dom";
import { useState, useEffect, ReactNode} from "react";
import {checkAuthStatus} from "../utils/authUtils.ts";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const authenticate = async () => {
            const isAuthenticated = await checkAuthStatus();
            setIsAuthorized(isAuthenticated);
        };
        authenticate().catch(() => setIsAuthorized(false));

    }, []);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;