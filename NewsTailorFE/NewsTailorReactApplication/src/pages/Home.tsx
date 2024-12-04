import { useNavigate } from "react-router-dom";
import Sidebar from '../components/contentPage/Sidebar';
import NewsGeneration from '../components/contentPage/NewsGeneration';
import api from "../api";
import Header from '../components/landingPage/Header';
import { checkAuthStatus, clearAuthTokens } from "../utils/authUtils.ts";
import NewsPresentation from '../components/contentPage/NewsPresentation';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { REFRESH_TOKEN } from "../constants";

// Define the types for news and configurations
export interface NewsType {
    content?: string;
    title?: string;
    id?: string;
    userid?: string;
    created_at?: string;
    is_currently_reading?: boolean;
    is_saved?: boolean;
    user_newspaper?: string;
}

interface Category {
    id: number;
    name: string;
    percentage: number;
}

interface Configuration {
    id: number;
    name: string;
    read_time: number;
    fetch_period: number;
    sources: string[];
    categories: Category[];
}

function Home() {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const [news, setNews] = useState<NewsType | null>(null);
    const [configurations, setConfigurations] = useState<Configuration[] | null>(null);

    useEffect(() => {
        const checkIfNewsExists = async () => {
            try {
                const response = await api.post(`api/check-news/${userId}/`);
                if (response.data.exists) {
                    setNews(response.data.Newspaper as NewsType);
                }
            } catch (error) {
                console.error("Error checking news existence:", error);
            }
        };

        // Fetch user-specific configurations/presets
        const fetchConfigurations = async () => {
            try {
                const response = await api.get("/api/configurations/");
                setConfigurations(response.data);
            } catch (error) {
                console.error('Error fetching configurations', error);
            }
        };

        if (userId) {
            checkIfNewsExists();
            fetchConfigurations();
        }
    }, [userId]);

    const handleGenerate = async (newsData: NewsType) => {
        setNews(newsData);
    };

    const handleConclude = () => {
        setNews(null);
    };

    const handleLogout = async () => {
        const route = "/api/logout/";
        const isAuthenticated = await checkAuthStatus();
        if (isAuthenticated) {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            await api.post(route, { "refresh": refreshToken });
            clearAuthTokens();
            navigate("/landingPage");
        } else {
            clearAuthTokens();
            navigate("/landingPage");
        }
    };

    const handleAbout = () => {
        navigate('/about');
    };

    const handleFaq = () => {
        navigate('/faq');
    };

    return (
        <div>
            <Header />
            <Sidebar userId={userId} />
            {news ? (
                <NewsPresentation news={news} onConclude={handleConclude} />
            ) : (
                <NewsGeneration
                    userId={userId}
                    onGenerate={handleGenerate}
                    configurations={configurations}
                />
            )}
            <button id = "Logout-button" className="blue-circle-button" onClick={handleLogout}>Logout</button>
            <button id = "About-page-button" className="blue-circle-button-about" onClick={handleAbout}>About</button>
            <button id="FAQ-button" className="blue-circle-button-faq" onClick={handleFaq}>FAQ</button>
        </div>
    );
}

export default Home;
