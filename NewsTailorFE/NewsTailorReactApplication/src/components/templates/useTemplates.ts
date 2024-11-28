import {useEffect, useState} from "react";
import api from "../../api.ts";
import {useUserContext} from "../../context/useUserContext.ts";

interface Category {
    id: number;
    name: string;
    percentage: number;
}

interface Configuration {
    id: number;
    name: string;
    read_time: number;
    fetch_period: number;
    sources: string[];
    categories: Category[];
}

const fetchPeriodMapper: { [key: number]: string } = {
    1440: "Last Day",
    4320: "Last 3 Days",
    10080: "Last Week",
    43200: "Last Month",
};

const useTemplates = () => {
    const [configurations, setConfigurations] = useState<Configuration[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { user } = useUserContext();

    useEffect(() => {
        fetchConfigurations();
    }, []);

    const fetchConfigurations = async () => {
        try {
            const response = await api.get("/api/configurations/");
            setConfigurations(response.data);
        } catch (err) {
            console.error("Failed to fetch configurations.", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteConfiguration = async (id: number) => {
        try {
            await api.delete(`/api/delete-configuration/${id}/`);
            setConfigurations((prevConfigs) =>
                prevConfigs.filter((config) => config.id !== id)
            );
        } catch (err) {
            console.error("Failed to delete configuration.", err);
        }
    }

    return {
        configurations,
        loading,
        fetchPeriodMapper,
        deleteConfiguration,
        user
    };
};

export default useTemplates;