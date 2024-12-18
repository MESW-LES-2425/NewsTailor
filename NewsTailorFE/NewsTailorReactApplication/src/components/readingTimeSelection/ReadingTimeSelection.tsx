import React from "react";
import useReadingTimeSelection from "./useReadingTimeSelection";
import '../../styles/news-content/configuration.css';

interface ReadingTimeSelectionProps {
    onReadingTimeChange: (readingTime: number) => void;
}

const ReadingTimeSelection: React.FC<ReadingTimeSelectionProps> = ({ onReadingTimeChange }) => {
    const { readingTime, handleReadingTimeChange } = useReadingTimeSelection(onReadingTimeChange);

    return (
        <div className="reading-time-selection">
            <h3 className="reading-time-title">Reading Time</h3>
            <div className="reading-time-slider-container">
                <div className="reading-time-slider">
                    <h6>1 min</h6>
                    <input type="range" min="1" max="60" value={readingTime}
                        onChange={(e) => handleReadingTimeChange(Number(e.target.value))}
                        className="slider"
                        required
                    />
                    <h6>1 hour</h6>
                </div>
                <h5 className="reading-time-slider-value">{readingTime} minutes</h5>
            </div>
        </div>
    );
};

export default ReadingTimeSelection;
