import React, { useState } from 'react';
import './sourceSelection.css';

interface Source {
    label: string;
    value: string;
}

// Interface to let the NewsGeneration handle the source selection logic
interface SourceSelectionProps {
    onSourceChange: (sources: Source[]) => void;
}

const SourceSelectionComponent: React.FC<SourceSelectionProps> = ({ onSourceChange }) => {
    const [selectedSources, setSelectedSources] = useState<Source[]>([]);

    // Add more options as we go along.
    const sourcesOptions = [
        { label: "Guardian", value: "guardian" },
        { label: "News API (Generic)", value: "news_api" },
        { label: "Dev TO (Generic)", value: "dev_to" },
        { label: "New York Times", value: "nyt" },
    ];

    const toggleSourceSelection = (source: Source) => {
        const isAlreadySelected = selectedSources.some(selected => selected.value == source.value);

        // Check to see if the source is already selected by going over the selected sources and checking values.
        const updatedSources = isAlreadySelected
            ? selectedSources.filter(selected => selected.value != source.value)
            : [...selectedSources, source];
        // Update the selected sources and call the onSourceChange function to notify the NewsGeneration component.
        setSelectedSources(updatedSources);
        onSourceChange(updatedSources);
    };

    const handleRemoveSource = (value: string) => {
        const updatedSources = selectedSources.filter(source => source.value != value);
        // Update the selected sources and call the onSourceChange function to notify the NewsGeneration component.
        setSelectedSources(updatedSources);
        onSourceChange(updatedSources);
    };

    return (
        <div className="source-selection">
            <h3>News Sources</h3>
            <div className="selected-sources">
                {selectedSources.map((source) => (
                    <div key={source.value} className="source-tag">
                        {source.label}
                        <button
                            onClick={() => handleRemoveSource(source.value)}
                            className="remove-source-btn"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>

            <select
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedSource = sourcesOptions.find(option => option.value == selectedValue);
                    if (selectedSource) toggleSourceSelection(selectedSource);
                    e.target.value = "";
                }}
                className="source-select"
            >
                <option value="" disabled>
                    Sources
                </option>
                {sourcesOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SourceSelectionComponent;
