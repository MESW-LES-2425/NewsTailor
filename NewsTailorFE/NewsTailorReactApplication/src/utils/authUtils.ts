import {jwtDecode} from "jwt-decode";
import {ACCESS_TOKEN, REFRESH_TOKEN, USER_INFO} from "../constants.ts";
import api from "../api.ts";

interface JwtPayload {
    exp: number;
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        const expirationTime = decoded.exp;
        const currentTime = Date.now() / 1000;
        return expirationTime < currentTime;
    } catch (error) {
        return true;
    }
};

export const refreshAuthToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
        return null;
    }

    try {
        const response = await api.post<{ access: string, refresh: string }>("/api/token/refresh/", {
            refresh: refreshToken,
        });

        if (response.status === 200) {
            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;
            localStorage.setItem(ACCESS_TOKEN, newAccessToken);
            localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
            return newAccessToken;
        }
        return null;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

export const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN);
};

export const clearAuthTokens = (): void => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER_INFO);
};

export const checkAuthStatus = async (): Promise<boolean> => {
    const accessToken = getAccessToken();

    if (accessToken && !isTokenExpired(accessToken)) {
        return true;
    }

    if (accessToken && isTokenExpired(accessToken)) {
        const newAccessToken = await refreshAuthToken();
        if (newAccessToken) {
            return true;
        } else {
            clearAuthTokens();
            return false;
        }
    }

    return false;
};


