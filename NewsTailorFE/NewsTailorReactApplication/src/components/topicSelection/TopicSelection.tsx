import React, {useEffect} from "react";
import useTopicSelection from "./useTopicSelection";
import "../../styles/news-content/configuration.css";

interface Topic {
    label: string;
    value: string;
    percentage?: number;
}

interface TopicSelectionProps {
    onTopicChange: (topics: Topic[]) => void;
    inputData?: Category[];
}

interface Category {
    id: number;
    name: string;
    percentage: number;
}

const TopicSelection: React.FC<TopicSelectionProps> = ({ onTopicChange, inputData }) => {
    const {
        topicOptions,
        selectedTopics,
        dropdownValue,
        handleRemoveTopics,
        handleSelectChange,
        updateTopicPercentage,
        setInputTopics
    } = useTopicSelection(onTopicChange);

    const mapCategoriesToTopics = (categories: Category[], topicOptions: { label: string; value: string }[]): Topic[] => {
        return categories.map(category => {
            const foundTopic = topicOptions.find(option => option.value === category.name);
            return foundTopic ? { ...foundTopic, percentage: category.percentage } : { label: "", value: "" };
        });
    };

    useEffect(() => {
        if (inputData) {
            const transformedTopics = mapCategoriesToTopics(inputData, topicOptions);
            setInputTopics(transformedTopics);
        }
    }, []);

    return (
        <div className="source-selection">
            <h3 className="categories-title">Categories</h3>
            <div className="selected-sources-2">
                {selectedTopics.map((topic) => (
                    <div key={topic.value} className="source-tag">
                        <div className="topic-details">
                            <span className="topic-label">{topic.label}</span>
                            <button
                                onClick={() => handleRemoveTopics(topic.value)}
                                className="remove-source-btn"
                                aria-label={`Remove ${topic.label}`}
                            >
                                ×
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
                                className="percentage-input"
                                aria-label={`Percentage for ${topic.label}`}
                            />
                            <span className="percentage-symbol">%</span>
                        </div>
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
};

export default TopicSelection;
