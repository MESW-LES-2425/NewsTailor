
import {jwtDecode} from "jwt-decode";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.ts";
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
        const response = await api.post<{ access: string }>("/api/token/refresh/", {
            refresh: refreshToken,
        });

        if (response.status === 200) {
            const newAccessToken = response.data.access;
            localStorage.setItem(ACCESS_TOKEN, newAccessToken);
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
};


