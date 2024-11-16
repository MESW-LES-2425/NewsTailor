import React, { useState } from 'react';
import './configuration.css';
import config from '../../appConfig.json';

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
    const [dropdownValue, setDropdownValue] = useState<string>("");

    const sourcesOptions = config.sourcesOptions;

    const toggleSourceSelection = (source: Source) => {
        const isAlreadySelected = selectedSources.some(selected => selected.value === source.value);

        // Check to see if the source is already selected by going over the selected sources and checking values.
        const updatedSources = isAlreadySelected
            ? selectedSources.filter(selected => selected.value !== source.value)
            : [...selectedSources, source];
        // Update the selected sources and call the onSourceChange function to notify the NewsGeneration component.
        setSelectedSources(updatedSources);
        onSourceChange(updatedSources);
    };

    const handleRemoveSource = (value: string) => {
        const updatedSources = selectedSources.filter(source => source.value !== value);
        // Update the selected sources and call the onSourceChange function to notify the NewsGeneration component.
        setSelectedSources(updatedSources);
        onSourceChange(updatedSources);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedSource = sourcesOptions.find(option => option.value === selectedValue);

        if (selectedSource) {
            toggleSourceSelection(selectedSource);
        }

        // Reset the dropdown value to keep "Sources" displayed
        setDropdownValue("");
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
                            X
                        </button>
                    </div>
                ))}
            </div>

            <select
                value={dropdownValue}
                onChange={handleSelectChange}
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
