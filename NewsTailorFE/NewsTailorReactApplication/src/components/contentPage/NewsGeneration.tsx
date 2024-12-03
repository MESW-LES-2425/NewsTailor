import React, { useState } from 'react';
import "./contentTable.css";
import api from '../../api';
import SourceSelection from "../sourceSelection/SourceSelection.tsx";
import TopicSelection from "../topicSelection/TopicSelection.tsx";
import TimelineSelection from "../timelineSelection/TimelineSelection.tsx";
import Select from 'react-select';
import ReadingTimeSelection from "../readingTimeSelection/ReadingTimeSelection.tsx";

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

interface NewsProperties {
    userId?: string | undefined;
    onGenerate?: (newsData: { content?: string; title?: string; id?: string; userid?: string }) => void;
    configurations?: Configuration[]| null;
}

const NewsGeneration: React.FC<NewsProperties> = ({ userId, onGenerate, configurations}) => {
    const [selectedSources, setSelectedSources] = useState<{ label: string, value: string }[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<{ label: string, value: string }[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null); // Simplified to use a string or null
    const [selectedReadTime, setSelectedReadTime] = useState<number>(5);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isPresetSelected, setIsPresetSelected] = useState(false);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post("api/fetch-news/", {
                categories: selectedTopics.map(topic => topic.value),
                language: 'English',
                sources: selectedSources.map(source => source.value),
                timeline: selectedDate,
                read_time: selectedReadTime,
                userid: userId,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (onGenerate) {
                onGenerate(response.data);
            }

            // This is a hack that has to be fixed
            window.location.reload();

        } catch (error) {
            setError('Error generating news.');
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSourceChange = (sources: { label: string, value: string }[]) => {
        setSelectedSources(sources);
    };

    const handleDateChange = (date: string | null) => {
        setSelectedDate(date);
    };

    const handleReadingTimeChange = (readingTime: number) => {
        setSelectedReadTime(readingTime);
    };

    const handleTopicChange = (topics: { label: string, value: string }[]) => {
        setSelectedTopics(topics);
    };

    const handleToggle = () => {
        setIsPresetSelected(!isPresetSelected);
    };

    const handlePresetSelection = (config:Configuration) => {
        setSelectedSources(config.sources.map((source) => ({ label: source, value: source })));
        setSelectedTopics(config.categories.map((category) => ({ label: category.name, value: category.name })));
        setSelectedDate((config.fetch_period/60).toString());
        setSelectedReadTime(config.read_time);
    };

    return (
        <div className="content-table">
            <h1 className='customizeTitle'>Customize your newspaper</h1>
            {error && <div className="error">{error}</div>}
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    <div className="toggle-switch-configurations">
                        <label className="switch-configurations">
                            <input
                                type="checkbox"
                                checked={isPresetSelected}
                                onChange={handleToggle}
                            />
                            <span className="slider-configurations"></span>
                        </label>
                        <div className="toggle-labels">
                            <span>Select a Template</span>
                        </div>
                    </div>
                    {isPresetSelected && configurations && (
                        <div>
                            <Select
                                options={configurations.map((preset) => ({
                                    label: preset.name,
                                    value: preset.id
                                }))}
                                onChange={(selectedOption) => handlePresetSelection(configurations!.find(preset => preset.id === selectedOption!.value)!)}
                                placeholder="Select a preset"
                            />
                        </div>
                    )}
                    {!isPresetSelected && (
                        <>
                            <SourceSelection onSourceChange={handleSourceChange} />
                            <TopicSelection onTopicChange={handleTopicChange} />
                            <TimelineSelection onDateChange={handleDateChange} />
                            <ReadingTimeSelection onReadingTimeChange={handleReadingTimeChange} />
                        </>
                    )}
                    <button
                        className="blue-circle-button"
                        onClick={fetchNews}
                        disabled={loading || !selectedDate}
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </>
            )}
        </div>
    );
};

export default NewsGeneration;