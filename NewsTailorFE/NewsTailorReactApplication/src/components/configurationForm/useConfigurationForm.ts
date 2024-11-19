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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            name,
            fetch_period:timeline,
            sources,
            categories:topics,
            read_time:readingTime,
            user_id: user.id
        };

        try {
            await api.post(route, formData);
            navigate("/${user.id}");
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
    };
}

export default useConfigurationForm;