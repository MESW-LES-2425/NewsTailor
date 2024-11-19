import React, { useState } from 'react';
import './configuration.css';
import config from '../../appConfig.json';

interface Topic {
    label: string;
    value: string;
}

// Interface to let the NewsGeneration handle the topic selection logic
interface TopicSelectionProps {
    onTopicChange: (topics: Topic[]) => void;
}

const TopicSelectionComponent: React.FC<TopicSelectionProps> = ({ onTopicChange }) => {
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const [dropdownValue, setDropdownValue] = useState<string>("");

    const topicOptions = config.topicOptions;

    const toggleTopicSelection = (topic: Topic) => {
        const isAlreadySelected = selectedTopics.some(selected => selected.value === topic.value);

        const updatedTopics = isAlreadySelected
            ? selectedTopics.filter(selected => selected.value !== topic.value)
            : [...selectedTopics, topic];
        setSelectedTopics(updatedTopics);
        onTopicChange(updatedTopics);
    };

    const handleRemoveTopics = (value: string) => {
        const updatedTopics = selectedTopics.filter(topic => topic.value !== value);
        setSelectedTopics(updatedTopics);
        onTopicChange(updatedTopics);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedTopic = topicOptions.find(option => option.value === selectedValue);

        if (selectedTopic) {
            toggleTopicSelection(selectedTopic);
        }

        // Reset the dropdown value to keep "Category" displayed
        setDropdownValue("");
    };

    return (
        <div className="source-selection">
            <h3>Categories</h3>
            <div className="selected-sources">
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

export default TopicSelectionComponent;
