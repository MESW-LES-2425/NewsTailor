import { useNavigate } from "react-router-dom";
import Sidebar from '../components/contentPage/Sidebar';
import NewsGeneration from '../components/contentPage/NewsGeneration';
import NewsPresentation from '../components/contentPage/NewsPresentation';
import Header from '../components/landingPage/Header';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

interface NewsType {
    content?: string;
    title?: string;
    id?: string;
    userid?: string;
}

function Home() {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const [news, setNews] = useState<NewsType | null>(null);

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
        if (userId) {
            checkIfNewsExists();
        }
    }, [userId]);

    const handleGenerate = async (newsData: NewsType) => {
        setNews(newsData);
    };

    const handleConclude = () => {
        setNews(null);
    };

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            if (refreshToken) {
                await api.post("/api/logout/", { "refresh": refreshToken });
                localStorage.removeItem(REFRESH_TOKEN);
                localStorage.removeItem(ACCESS_TOKEN);
                navigate("/landingPage");
            }
        } catch (error) {
            console.log("Failed logout:", error);
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
                <NewsGeneration userId={userId} onGenerate={handleGenerate} />
            )}
            <button className="blue-circle-button" onClick={handleLogout}>Logout</button>
            <button className="blue-circle-button-about" onClick={handleAbout}>About</button>
            <button className="blue-circle-button-faq" onClick={handleFaq}>FAQ</button>
        </div>
    );
}

export default Home;
