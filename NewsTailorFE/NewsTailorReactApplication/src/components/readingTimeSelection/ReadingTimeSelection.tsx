import React from "react";
import useReadingTimeSelection from "./useReadingTimeSelection";
import "../contentPage/configuration.css";

interface ReadingTimeSelectionProps {
    onReadingTimeChange: (readingTime: number) => void;
}

const ReadingTimeSelection: React.FC<ReadingTimeSelectionProps> = ({ onReadingTimeChange }) => {
    const { readingTime, handleReadingTimeChange } = useReadingTimeSelection(onReadingTimeChange);

    return (
        <div className="reading-time-selection">
            <h3>Reading Time</h3>
            <div className="reading-time-slider-container">
                <input type="range" min="1" max="60" value={readingTime}
                onChange={(e) => handleReadingTimeChange(Number(e.target.value))}
                className="slider"
                />
                <div className="reading-time-slider-value">{readingTime} minutes</div>
            </div>
        </div>
    );
};

export default ReadingTimeSelection;
