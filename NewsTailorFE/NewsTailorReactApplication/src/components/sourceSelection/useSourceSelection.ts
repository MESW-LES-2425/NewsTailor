import React, {useState} from "react";
import config from "../../appConfig.json";

interface Source {
    label: string;
    value: string;
}

const useSourceSelection = (onSourceChange: (sources: Source[]) => void) => {
    const [selectedSources, setSelectedSources] = useState<Source[]>([]);
    const [dropdownValue, setDropdownValue] = useState<string>("");
    const sourcesOptions = config.sourcesOptions;

    const toggleSourceSelection = (source: Source) => {
        const isAlreadySelected = selectedSources.some(selected => selected.value === source.value);

        const updatedSources = isAlreadySelected
            ? selectedSources.filter(selected => selected.value !== source.value)
            : [...selectedSources, source];

        setSelectedSources(updatedSources);
        onSourceChange(updatedSources);
    };

    const handleRemoveSource = (value: string) => {
        const updatedSources = selectedSources.filter(source => source.value !== value);
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

    return {
        sourcesOptions,
        selectedSources,
        dropdownValue,
        handleRemoveSource,
        handleSelectChange,
    }
}

export default useSourceSelection;