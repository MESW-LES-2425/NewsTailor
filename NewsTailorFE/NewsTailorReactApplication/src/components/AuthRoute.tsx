import { Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import {checkAuthStatus} from "../utils/authUtils";

interface AuthRouteProps {
    children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const authenticate = async () => {
            const isAuthenticated = await checkAuthStatus();
            setIsLoggedIn(isAuthenticated);
        };

        authenticate().catch(() => setIsLoggedIn(false));
    }, []);

    if (isLoggedIn === null) {
        return <div>Loading...</div>;
    }

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}

export default AuthRoute;
