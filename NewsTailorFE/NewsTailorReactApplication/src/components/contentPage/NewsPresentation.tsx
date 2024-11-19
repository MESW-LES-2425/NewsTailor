import React from 'react';
import api from '../../api';
import "./contentTable.css";
import MarkdownReader from "../../utils/MarkdownReader.tsx";

interface NewsPropertiesPresentation {
    news?: { content?: string; title?: string; id?: string; userid?: string };
    onConclude?: () => void;
}

const NewsPresentation: React.FC<NewsPropertiesPresentation> = ({ news, onConclude }) => {

    const concludeReadingSession = async () => {
        if (!news?.id) {
            console.error('News ID is missing.');
            return;
        }
        try {
            await api.post("api/conclude-reading-session/", { newspaperid: news.id }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (onConclude) onConclude();
        } catch (error) {
            console.error('Error concluding reading session:', error);
        }
    };

    return (
        <div className="content-table">
            <div className="news-container">
                <div className="news-item">
                    <h2>Your Reading Session</h2>
                    {news?.content && <MarkdownReader initialContent={news.content} />}
                    <button className="SideButton" onClick={concludeReadingSession}>
                        Conclude Reading Session
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsPresentation;
