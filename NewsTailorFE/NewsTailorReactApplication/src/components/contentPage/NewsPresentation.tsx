import React, {useEffect, useState} from 'react';
import api from '../../api';
import "./contentTable.css";
import MarkdownReader from "../../utils/MarkdownReader.tsx";
import ShareButtons from '../socialMediaExports/socialMediaExport.tsx';
import "../socialMediaExports/socialMediaStyling.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import Modal from "../../utils/Modal.tsx";

export interface NewsPropertiesPresentation {
    news?: { content?: string; title?: string; id?: string; created_at?: string; is_currently_reading?: boolean; is_saved?: boolean; user_newspaper?: string; };
    onDelete?: (id: string) => void;
    onConclude?: () => void;
}

const NewsPresentation: React.FC<NewsPropertiesPresentation> = ({ news, onConclude }) => {

    const [isSaved, setIsSaved] = useState(news?.is_saved || false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [reading_time, setReadingTime] = useState(0);
    const [extension_time, setExtensionTime] = useState(0);
    const [isExtensionAvailable, setIsExtensionAvailable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(news?.content || '');


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
    const extendReadingSession = async () => {
        const sources = localStorage.getItem('selectedSources');
        const topics = localStorage.getItem('selectedTopics');
        const date = localStorage.getItem('selectedDate');
        const isPresetSelected = localStorage.getItem('isPresetSelected');

        if (!news?.id || !news?.user_newspaper) {
            console.error('News ID is missing.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.post("api/extend-reading-session/", {
                sources: sources,
                topics: topics,
                date: date,
                isPresetSelected: isPresetSelected,
                reading_time: extension_time,
                user_id: news.user_newspaper,
                newspaper_id: news.id
            }, {
                headers: {'Content-Type': 'application/json'},
            });

            // Ensure response data is properly appended to the content
            setContent((prevContent) => prevContent + response.data);
            setIsModalOpen(false);
            setIsExtensionAvailable(false);
        } catch (error) {
            console.error('Error extending reading session:', error);
        } finally {
            setIsLoading(false);
        }
}

useEffect(() => {
    //console.log('Updated news content:', content);
}, [content]);

    useEffect(() => {
        setExtensionTime(Math.floor(reading_time / 4));
    }, [reading_time]);

const loadReadingTime = async () => {
        setIsModalOpen(true);
        setReadingTime(parseInt(localStorage.getItem('reading_time') as string) || 0);
    }


    return (
        <div className="content-and-buttons">
            <div className="home-news-actions">
                <div className="social-icons">
                    {news?.content && <ShareButtons initialContent={news.content} />}
                    <div className="icon-wrapper" title="Conclude Reading Session">
                        <button onClick={concludeReadingSession} className="hover-effect">
                            <FontAwesomeIcon icon={faCheck} size="lg" />
                        </button>
                    </div>
                    <div className="icon-wrapper" title="Save Newspaper">
                        <button onClick={!isSaved ? saveNewspaper : undefined} disabled={isSaved}>
                            <FontAwesomeIcon icon={isSaved ? faHeart : faHeartBroken} size="lg" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="content-table">
                <div className="news-container">
                    <div className="news-item">
                        {content && <MarkdownReader initialContent={content} />}
                    </div>
                    {isExtensionAvailable &&
                        <button onClick={loadReadingTime} className="auth-button">Extend Reading Session</button>
                    }
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {isLoading ? <p>Loading more news...</p> : <>
                    <h2>Extend Your Reading Session</h2>
                    <p>How much longer would you like to read?</p>
                    <select name="extend-time" id="extend-time"
                            onChange={(e) => setExtensionTime(parseInt(e.target.value))}>
                        <option value={Math.floor(reading_time / 4)}>{Math.floor(reading_time / 4)} minutes</option>
                        <option value={Math.floor(reading_time / 2)}>{Math.floor(reading_time / 2)} minutes</option>
                        <option value={reading_time}>{reading_time} minutes</option>
                    </select>
                    <button onClick={extendReadingSession} className="auth-button">Extend</button>
                </>
                }
            </Modal>
        </div>
    );
};

export default NewsPresentation;
