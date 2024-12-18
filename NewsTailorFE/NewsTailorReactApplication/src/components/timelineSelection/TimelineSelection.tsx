import React, {useEffect} from 'react';
import useTimelineSelection from "./useTimelineSelection.ts";
import '../../styles/news-content/configuration.css';

interface DateOption {
    label: string;
    value: string;
}

interface DateSelectionProps {
    onDateChange: (date: string | null) => void;
    inputData?: DateOption | null;
}

const TimelineSelection: React.FC<DateSelectionProps> = ({ onDateChange, inputData }) => {

    const {
        selectedDate,
        dateOptions,
        handleDateSelection
    } = useTimelineSelection(onDateChange);

    // load input data for edit form
    useEffect(() => {
        if(inputData){
            handleDateSelection(inputData);
        }
    }, []);

    return (
        <div className="timeline-selection">
            <h3 className="timeline-title">Timeline</h3>

            <select
                value={selectedDate ? selectedDate.value : ""}
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedOption = dateOptions.find(option => option.value === selectedValue);
                    if (selectedOption) handleDateSelection(selectedOption);
                }}
                className="configuration-form-input"
                aria-label="Select a timeline"
            >
                <option value="" disabled>
                    Select a timeline
                </option>
                {dateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TimelineSelection;
