import { Navigate } from "react-router-dom";
import { useState, useEffect, ReactNode} from "react";
import {clearAuthTokens, getAccessToken, isTokenExpired, refreshAuthToken} from "../utils/authUtils.ts";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const auth = async () => {
        const token = getAccessToken();
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        if (isTokenExpired(token)) {
            const newToken = await refreshAuthToken();
            if (newToken) {
                setIsAuthorized(true);
            } else {
                clearAuthTokens();
                setIsAuthorized(false);
            }
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;