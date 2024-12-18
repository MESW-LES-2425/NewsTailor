import {Navigate} from "react-router-dom";
import {useState, useEffect, ReactNode} from "react";
import {isAdministrator} from "../utils/authUtils.ts";

interface AdminRouteProps {
    children: ReactNode;
}

function AdminRoute({children}: AdminRouteProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        setIsAuthorized(isAdministrator());
    }, []);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/forbidden"/>;
}

export default AdminRoute;