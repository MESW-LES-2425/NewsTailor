import React from "react";
import useTopicSelection from "./useTopicSelection";
import "../../styles/news-content/configuration.css";

interface Topic {
    label: string;
    value: string;
    percentage?: number;
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
        handleSelectChange,
        updateTopicPercentage,
    } = useTopicSelection(onTopicChange);

    return (
        <div className="source-selection">
            <h3>Categories</h3>
            <div className="selected-sources-2">
                {selectedTopics.map((topic) => (
                    <div key={topic.value} className="source-tag">
                        <div className="topic-label">
                            {topic.label}
                            <button
                                onClick={() =>
                                    handleRemoveTopics(topic.value)
                                }
                                className="remove-source-btn"
                            >
                                X
                            </button>
                        </div>
                        <div className="topic-percentage">
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={topic.percentage}
                                onChange={(e) =>
                                    updateTopicPercentage(
                                        topic.value,
                                        Number(e.target.value)
                                    )
                                }
                                aria-label={`Percentage for ${topic.label}`}
                            />
                            <span>%</span>
                        </div>
                    </div>
                ))}
            </div>

            <select
                id="source-select-buttons"
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
};

export default TopicSelection;
