import {useState} from "react";
import config from "../../appConfig.json";

interface DateOption {
    label: string;
    value: string;
}

const useTimelineSelection = (onDateChange: (date: string | null) => void) => {
    const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);
    const dateOptions = config.dateOptions;

    const handleDateSelection = (date: DateOption) => {
        setSelectedDate(date);
        onDateChange(date.value);
    };

    return {
        selectedDate,
        dateOptions,
        handleDateSelection
    }
}

export default useTimelineSelection
