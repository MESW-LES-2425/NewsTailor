import React, {useState} from "react";
import {useUserContext} from "../../context/useUserContext.ts";
import api from "../../api.ts";
import {useNavigate} from "react-router-dom";

interface Source {
    label: string;
    value: string;
}

interface Topic {
    label: string;
    value: string;
    percentage?: number;
}

const useConfigurationForm = () => {
    const [name, setName] = useState<string>("");
    const [timeline, setTimeline] = useState<string | null>(null);
    const [sources, setSources] = useState<Array<Source> | null>(null);
    const [topics, setTopics] = useState<Array<Topic> | null>(null);
    const [readingTime, setReadingTime] = useState<number>(5);
    const { user } = useUserContext();

    const navigate = useNavigate();
    const route = "/api/create-configuration/";

    const validateTopics = (topics: Array<Topic>): boolean => {
        const totalPercentage = topics.reduce((sum, topic) => sum + topic.percentage!, 0);

        if (totalPercentage > 100) {
            alert("The total percentage of all categories cannot exceed 100%.");
            return false;
        }

        if (totalPercentage < 100) {
            alert("The total percentage of all categories has to be 100%.");
            return false;
        }

        const hasZeroPercentage = topics.some((topic) => topic.percentage === 0);
        if (hasZeroPercentage) {
            alert("No category can have a 0% percentage.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (topics && !validateTopics(topics)) {
            return;
        }

        const sourceValues = sources?.map((source) => source.value) || [];
        const categoryValuesPercentage = topics?.map((topic) => ({
            value: topic.value,
            percentage: topic.percentage,
        })) || [];

        const formData = {
            name,
            fetch_period:timeline,
            sources:sourceValues,
            categories:categoryValuesPercentage,
            read_time:readingTime,
            user_id: user.id
        };

        try {
            await api.post(route, formData);
            navigate(`/${user.id}`);
        } catch (error) {
            console.log(error);
        }

    };

    return {
        name,
        setName,
        setTimeline,
        setSources,
        setTopics,
        setReadingTime,
        handleSubmit,
        user
    };
}

export default useConfigurationForm;