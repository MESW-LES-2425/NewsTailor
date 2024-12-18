import { Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import {checkAuthStatus} from "../utils/authUtils";
import {useUserContext} from "../context/useUserContext.ts";

interface AuthRouteProps {
    children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const { user } = useUserContext();

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
        return <Navigate to={`/${user.id}`} />;
    }

    return <>{children}</>;
}

export default AuthRoute;
