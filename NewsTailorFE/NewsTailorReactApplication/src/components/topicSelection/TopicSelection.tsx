import React from "react";
import useTopicSelection from "./useTopicSelection.ts";
import '../../styles/news-content/configuration.css';
interface Topic {
    label: string;
    value: string;
    id: number;
}

interface TopicSelectionProps {
    onTopicChange: (topics: Topic[]) => void;
}

const TopicSelection: React.FC<TopicSelectionProps> = ({ onTopicChange }) => {

    const {
        topicOptions,
        selectedTopics,
        dropdownValue,
        handleRemoveTopics,
        handleSelectChange
    } = useTopicSelection(onTopicChange)

    return (
        <div className="source-selection">
            <h3>Categories</h3>
            <div className="selected-sources-2">
                {selectedTopics.map((topic) => (
                    <div key={topic.value} className="source-tag">
                        {topic.label}
                        <button
                            onClick={() => handleRemoveTopics(topic.value)}
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
                aria-label="Select a category"
            >
                <option value="" disabled>
                    Category
                </option>
                {topicOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TopicSelection;
