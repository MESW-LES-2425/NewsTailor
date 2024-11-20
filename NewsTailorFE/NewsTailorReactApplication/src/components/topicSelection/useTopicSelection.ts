import React, {useState} from "react";
import config from "../../appConfig.json";

interface Topic {
    label: string;
    value: string;
    id: number;
}

const useTopicSelection = (onTopicChange: (topics: Topic[]) => void) => {
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

    return {
        topicOptions,
        selectedTopics,
        dropdownValue,
        handleRemoveTopics,
        handleSelectChange
    }
}

export default useTopicSelection;