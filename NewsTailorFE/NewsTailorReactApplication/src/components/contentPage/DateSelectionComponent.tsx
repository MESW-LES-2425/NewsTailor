import React, { useState } from 'react';

interface DateOption {
    label: string;
    value: string;
}

interface DateSelectionProps {
    onDateChange: (date: string | null) => void; // Pass ISO string or null
}

const DateSelectionComponent: React.FC<DateSelectionProps> = ({ onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);

    const dateOptions: DateOption[] = [
        { label: "Last 3 days", value: "72" },
        { label: "Last Week", value: "168" },
        { label: "Last Month", value: "720" },
    ];

    const handleDateSelection = (date: DateOption) => {
        setSelectedDate(date);
        onDateChange(date.value); // Pass ISO string
    };

    const handleRemoveDate = () => {
        setSelectedDate(null);
        onDateChange(null); // Notify parent
    };

    return (
        <div className="source-selection">
            <h3>Timeline</h3>

            <select
                value={selectedDate ? selectedDate.value : ""}
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedOption = dateOptions.find(option => option.value === selectedValue);
                    if (selectedOption) handleDateSelection(selectedOption);
                }}
                className="source-select"
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

export default DateSelectionComponent;
