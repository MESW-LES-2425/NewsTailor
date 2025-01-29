import React, {useEffect} from "react";
import useReadingTimeSelection from "./useReadingTimeSelection";
import '../../styles/news-content/configuration.css';

interface ReadingTimeSelectionProps {
    onReadingTimeChange: (readingTime: number) => void;
    inputData?: number | null;
}

const ReadingTimeSelection: React.FC<ReadingTimeSelectionProps> = ({ onReadingTimeChange, inputData }) => {
    const { readingTime, handleReadingTimeChange } = useReadingTimeSelection(onReadingTimeChange);

    // load input data for edit form
    useEffect(() => {
        if(inputData){
            handleReadingTimeChange(inputData);
        }
    }, []);

    return (
        <div className="reading-time-selection">
            <h3 className="reading-time-title">Reading Time</h3>
            <div className="reading-time-slider-container">
                <div className="reading-time-slider">
                    <h6>1 min</h6>
                    <input type="range" min="1" max="20" value={readingTime}
                        onChange={(e) => handleReadingTimeChange(Number(e.target.value))}
                        className="slider"
                        required
                    />
                    <h6>20 min</h6>
                </div>
                <h5 className="reading-time-slider-value">{readingTime} minutes</h5>
            </div>
        </div>
    );
};

export default ReadingTimeSelection;
