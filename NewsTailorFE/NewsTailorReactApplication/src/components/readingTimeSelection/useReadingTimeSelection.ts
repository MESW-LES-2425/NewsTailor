import { useState } from "react";

const useReadingTimeSelection = (onReadingTimeChange: (readingTime: number) => void) => {
    const [readingTime, setReadingTime] = useState<number>(5);

    const handleReadingTimeChange = (value: number) => {
        setReadingTime(value);
        onReadingTimeChange(value);
    };

    return {
        readingTime,
        handleReadingTimeChange,
    };
};

export default useReadingTimeSelection;
