import React, { useState } from 'react';
import api from '../../api';
import "./contentTable.css";
import MarkdownReader from "../../utils/MarkdownReader.tsx";
import ShareButtons from '../socialMediaExports/socialMediaExport.tsx';
import "../socialMediaExports/socialMediaStyling.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHeart, faHeartBroken, faGear } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';

export interface NewsPropertiesPresentation {
    news?: { content?: string; title?: string; id?: string; created_at?: string; is_currently_reading?: boolean; is_saved?: boolean; user_newspaper?: string; };
    onDelete?: (id: string) => void;
    onConclude?: () => void;
}

const NewsPresentation: React.FC<NewsPropertiesPresentation> = ({ news, onConclude }) => {

    const [isSaved, setIsSaved] = useState(news?.is_saved || false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);


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

    const openConfigs = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };


    return (
        <div className="content-and-buttons">
            <div className="home-news-actions">
                <div className="social-icons">
                    {news?.content && <ShareButtons initialContent={news.content} />}
                    <div className="icon-wrapper" title="Configurations">
                        <button onClick={openConfigs}>
                            <FontAwesomeIcon icon={faGear} size="lg" />
                        </button>
                    </div>
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
            <Popup open={isPopupOpen} closeOnDocumentClick onClose={closePopup} overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="popup-content">
                    <h3>Configurations</h3>
                    <p>Font</p>
                    <button onClick={closePopup} className="close-popup-button">
                        Close
                    </button>
                </div>
            </Popup>
            <div className="content-table">
                <div className="news-container">
                    <div className="news-item">
                        {news?.content && <MarkdownReader initialContent={news.content} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPresentation;
