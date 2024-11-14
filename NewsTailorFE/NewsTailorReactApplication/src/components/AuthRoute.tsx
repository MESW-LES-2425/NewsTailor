import { Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { getAccessToken, isTokenExpired, refreshAuthToken, clearAuthTokens } from "../utils/authUtils";

interface AuthRouteProps {
    children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        checkAuthStatus().catch(() => setIsLoggedIn(false));
    }, []);

    const checkAuthStatus = async () => {
        const accessToken = getAccessToken();

        if (accessToken && !isTokenExpired(accessToken)) {
            setIsLoggedIn(true);
        }
        else if (accessToken && isTokenExpired(accessToken)) {
            const newAccessToken = await refreshAuthToken();

            if (newAccessToken) {
                setIsLoggedIn(true);
            } else {
                clearAuthTokens();
                setIsLoggedIn(false);
            }
        }
        else {
            setIsLoggedIn(false);
        }
    }

    if (isLoggedIn === null) {
        return <div>Loading...</div>;
    }

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}

export default AuthRoute;
