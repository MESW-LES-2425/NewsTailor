import React, { useState, useEffect } from 'react';
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

    const [configUpdated, setConfigUpdated] = useState(false);

    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState("AbeeZee");
    const [marginSize, setMarginSize] = useState(16);

    const [selectedFontSize, setSelectedFontSize] = useState(fontSize);
    const [selectedFontFamily, setSelectedFontFamily] = useState(fontFamily);
    const [selectedMarginSize, setSelectedMarginSize] = useState(marginSize);

    useEffect(() => {
        const fetchUserConfiguration = async () => {
            try {
                const response = await api.get(`/api/fetch-user-configuration/${news?.user_newspaper}/`);
                const { font_size: fontSize } = response.data["User Configuration"] || {};
                const { font_family: fontFamily } = response.data["User Configuration"] || {};
                const { margin_size: marginSize } = response.data["User Configuration"] || {};

                if (fontSize && fontFamily && marginSize) {
                    setFontSize(fontSize);
                    setFontFamily(fontFamily);
                    setMarginSize(marginSize);
                } else {
                    console.log("Missing fields in response data");
                }
            } catch (error) {
                console.error("Error fetching user configuration:", error);
            }
        };
    
        if (news?.user_newspaper) {
            fetchUserConfiguration();
        }
    }, [news?.user_newspaper, configUpdated]);

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
        setSelectedFontSize(fontSize);
        setSelectedFontFamily(fontFamily);
        setSelectedMarginSize(marginSize);
        setIsPopupOpen(true);
    };

    const closePopup = async () => {
        setIsPopupOpen(false);
        try {
            console.log(selectedFontFamily);
            await api.post("api/save-user-configuration/", {
                user_configuration: news?.user_newspaper,
                font_size: selectedFontSize,
                font_family: selectedFontFamily,
                margin_size: selectedMarginSize,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            setConfigUpdated((prev) => !prev);
        } catch (error) {
            console.error('Error saving configurations:', error);
        }
            
    };

    const fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
    const fontFamilies = ["AbeeZee", "Arial", "Times New Roman"];
    const marginSizes = [1, 16, 32, 48, 64, 80, 96];


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
            <Popup open={isPopupOpen} closeOnDocumentClick overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="popup-content">
                    <h3>Configurations</h3>
                    <div className="newspaper-configurations">
                        <h4>Font Size</h4>
                        <select
                            value={selectedFontSize}
                            onChange={(e) => setSelectedFontSize(Number(e.target.value))}
                        >
                            {fontSizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                        <h4>Font Family</h4>
                        <select
                            value={selectedFontFamily}
                            onChange={(e) => setSelectedFontFamily(e.target.value)}
                        >
                            {fontFamilies.map(font => (
                                <option key={font} value={font}>{font}</option>
                            ))}
                        </select>
                        <h4>Margin Size</h4>
                        <select
                            value={selectedMarginSize}
                            onChange={(e) => setSelectedMarginSize(Number(e.target.value))}
                        >
                            {marginSizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <h4>Preview</h4>
                    <div
                        className="preview-container"
                        style={{
                            fontSize: `${selectedFontSize}px`,
                            fontFamily: selectedFontFamily,
                            padding: `${selectedMarginSize}px`,
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9',
                            marginTop: '1rem',
                        }}
                    >
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quam odio, gravida et ultrices ac, dapibus quis odio. Suspendisse potenti.</p>
                    </div>
                        
                    <button onClick={closePopup} className="close-popup-button">
                        Close
                    </button>
                </div>
            </Popup>
            <div className="content-table">
                <div className="news-container">
                    <div className="news-item">
                        {news?.content && news?.user_newspaper && <MarkdownReader initialContent={news.content} fontSize={fontSize} fontFamily={fontFamily} marginSize={marginSize} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPresentation;
