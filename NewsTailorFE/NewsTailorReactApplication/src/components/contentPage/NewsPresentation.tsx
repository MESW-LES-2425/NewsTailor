import React, { useState } from 'react';
import api from '../../api';
import "./contentTable.css";
import { FaRegHeart, FaHeart, FaCheck } from "react-icons/fa";
import MarkdownReader from "../../utils/MarkdownReader.tsx";


export interface NewsPropertiesPresentation {
    news?: { content?: string; title?: string; id?: string; created_at?: string; is_currently_reading?: boolean; is_saved?: boolean; user_newspaper?: string; };
    onDelete?: (id: string) => void;
    onConclude?: () => void;
}

const NewsPresentation: React.FC<NewsPropertiesPresentation> = ({ news, onConclude }) => {

    const [isSaved, setIsSaved] = useState(news?.is_saved || false);

    const concludeReadingSession = async () => {
        if (!news?.id) {
            console.error('News ID is missing.');
            return;
        }
        try {
            await api.post("api/delete-newspaper/", { newspaperid: news.id }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (onConclude) onConclude();
        } catch (error) {
            console.error('Error concluding reading session:', error);
        }
    };

    const saveNewspaper = async () => {
        if (!news?.id) {
            console.error('News ID is missing.');
            return;
        }
        try {
            await api.post("api/save-newspaper/", { newspaperid: news.id }, {
                headers: { 'Content-Type': 'application/json' },
            });
            setIsSaved(true);
        } catch (error) {
            console.error('Error saving newspaper:', error);
        }
    }

    return (
        <div className="content-and-buttons">
            <div className="home-news-actions">
                <button className="conclude-reading-button" onClick={concludeReadingSession}>
                    Conclude Reading Session  <FaCheck />
                </button>
                <button className="save-news-button" onClick={!isSaved ? saveNewspaper : undefined} disabled={isSaved}>
                    {isSaved ? (
                        <>
                            Saved <FaHeart />
                        </>
                    ) : (
                        <>
                            Save <FaRegHeart />
                        </>
                    )}
                </button>
            </div>
            <div className="content-table">
                <div className="news-container">
                    <div className="news-item">
                        <h2>Your Reading Session</h2>
                        {news?.title && <h3 className="news-title">{news.title}</h3>}
                        {news?.content && <MarkdownReader initialContent={news.content} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPresentation;
