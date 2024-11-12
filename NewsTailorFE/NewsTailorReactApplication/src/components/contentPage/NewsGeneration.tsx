import React, { useState } from 'react';
import "./newsGeneration.css";
import api from '../../api';
import SourceSelectionComponent from './SourceSelectionComponent';

const NewsGeneration: React.FC = () => {
    const [news, setNews] = useState<string | null>(null);
    const [selectedSources, setSelectedSources] = useState<{ label: string, value: string }[]>([]);

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
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSourceChange = (sources: { label: string, value: string }[]) => {
        setSelectedSources(sources);
    };

    return (
        <div className="news-generation">
            <h1>Customize your newspaper</h1>

            <SourceSelectionComponent onSourceChange={handleSourceChange} />

            <button className="blue-circle-button" onClick={fetchNews}>Generate</button>

            {news && (
                <div className='news-content-container'>
                    <h2>Obtained News</h2>
                    <p>{news}</p>
                </div>
            )}
        </div>
    );
};

export default NewsGeneration;
