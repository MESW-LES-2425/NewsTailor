import React, { useState } from 'react';
import "./contentTable.css";
import api from '../../api';
import SourceSelectionComponent from './SourceSelectionComponent';
import NewsPresentation from './NewsPresentation';

const NewsGeneration: React.FC = () => {
    const [news, setNews] = useState<string | null>(null);
    const [selectedSources, setSelectedSources] = useState<{ label: string, value: string }[]>([]);
    const [contentGenerated, setContentGenerated] = useState(false);

    const fetchNews = async () => {
        try {
            const route = "api/fetch-news/";
            const response = await api.post(route, {
                category: 'technology',
                language: 'English',
                sources: selectedSources.map(source => source.value),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const newsData = Object.values(response.data).flat();
            setNews(newsData.join('\n'));
            setContentGenerated(true);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSourceChange = (sources: { label: string, value: string }[]) => {
        setSelectedSources(sources);
    };

    // With this we can replace the news generation component by the component for reading the news.
    if (contentGenerated && news) {
        return <NewsPresentation news={news} />;
    }
    // If the news is not generated then we move on to the configuration page.
    return (
        <div className="content-table">
            <h1>Customize your newspaper</h1>
            <SourceSelectionComponent onSourceChange={handleSourceChange} />
            <button className="blue-circle-button" onClick={fetchNews}>Generate</button>
        </div>
    );
};

export default NewsGeneration;
