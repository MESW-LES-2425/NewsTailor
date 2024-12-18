import React from "react";
import useSourceSelection from "./useSourceSelection.ts";
import '../../styles/news-content/configuration.css';

interface Source {
    label: string;
    value: string;
}

interface SourceSelectionProps {
    onSourceChange: (sources: Source[]) => void;
}

const SourceSelection: React.FC<SourceSelectionProps> = ({ onSourceChange }) => {
    const {
        sourcesOptions,
        selectedSources,
        dropdownValue,
        handleRemoveSource,
        handleSelectChange,
    } = useSourceSelection(onSourceChange)

    return (
        <div id = "source-selection-button" className="form-source-selection">
            <h3 className="news-sources-title">News Sources</h3>
            <div className="selected-news-sources">
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
                className="configuration-form-input"
                aria-label="Select a source"
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

}

export default SourceSelection;
