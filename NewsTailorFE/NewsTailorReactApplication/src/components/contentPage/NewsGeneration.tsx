import React, { useState, useEffect } from 'react';
import "./contentTable.css";
import api from '../../api';
import SourceSelectionComponent from './SourceSelectionComponent';
import NewsPresentation from './NewsPresentation';

interface NewsProperties {
    userId?: string | undefined;
}

const NewsGeneration: React.FC<NewsProperties> = ({ userId }) => {
    const [news, setNews] = useState<{ content?: string; title?: string; id?: string; userid?: string } | null>(null);
    const [selectedSources, setSelectedSources] = useState<{ label: string, value: string }[]>([]);
    const [contentGenerated, setContentGenerated] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkIfNewsExists = async () => {
            try {
                const response = await api.post(`api/check-news/${userId}/`);
                if (response.data.exists) {
                    setNews(response.data.Newspaper);
                    setContentGenerated(true);
                }
            } catch (error) {
                console.error("Error checking news existence. Please check your database connection.", error);
            }
        };

        if (userId) {
            checkIfNewsExists();
        }
    }, [userId]);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);

        try {
            const route = "api/fetch-news/";
            const response = await api.post(route, {
                category: 'technology',
                language: 'English',
                sources: selectedSources.map(source => source.value),
                userid: userId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setNews(response.data);
            setContentGenerated(true);
        } catch (error: any) {
            setError('Error generating news. Please try again later.');
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSourceChange = (sources: { label: string, value: string }[]) => {
        setSelectedSources(sources);
    };

    if (contentGenerated && news) {
        return <NewsPresentation news={news} />;
    }

    return (
        <div className="content-table">
            <h1>Customize your newspaper</h1>
            {error && <div className="error">{error}</div>}
            <SourceSelectionComponent onSourceChange={handleSourceChange} />
            <button className="blue-circle-button" onClick={fetchNews} disabled={loading}>
                {loading ? 'Generating...' : 'Generate'}
            </button>
        </div>
    );
};

export default NewsGeneration;
