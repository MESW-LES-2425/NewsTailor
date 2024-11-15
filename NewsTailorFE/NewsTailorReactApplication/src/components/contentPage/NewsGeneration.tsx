import React, { useState } from 'react';
import "./contentTable.css";
import api from '../../api';
import SourceSelectionComponent from './SourceSelectionComponent';

interface NewsProperties {
    userId?: string | undefined;
    onGenerate?: (newsData: { content?: string; title?: string; id?: string; userid?: string }) => void;
}

const NewsGeneration: React.FC<NewsProperties> = ({ userId, onGenerate }) => {
    const [selectedSources, setSelectedSources] = useState<{ label: string, value: string }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post("api/fetch-news/", {
                category: 'technology',
                language: 'English',
                sources: selectedSources.map(source => source.value),
                userid: userId,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (onGenerate) onGenerate(response.data);

            // This is a hack that has to be fixed
            window.location.reload();
        } catch (error) {
            setError('Error generating news.');
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSourceChange = (sources: { label: string, value: string }[]) => {
        setSelectedSources(sources);
    };

    return (
        <div className="content-table">
            <h1>Customize your newspaper</h1>
            {error && <div className="error">{error}</div>}
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    <SourceSelectionComponent onSourceChange={handleSourceChange} />
                    <button className="blue-circle-button" onClick={fetchNews} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </>
            )}
        </div>
    );
};

export default NewsGeneration;
