import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import TimelineSelection from "../timelineSelection/TimelineSelection.tsx";
import SourceSelection from "../sourceSelection/SourceSelection.tsx";
import TopicSelection from "../topicSelection/TopicSelection.tsx";
import ReadingTimeSelection from "../readingTimeSelection/ReadingTimeSelection.tsx";
import Header from '../../components/landingPage/Header';
import '../../styles/news-content/configuration.css';
import Sidebar from "../contentPage/Sidebar.tsx";
import useConfigurationForm from "../configurationForm/useConfigurationForm.ts";

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

const EditConfigurationForm: React.FC = () => {
    const location = useLocation();
    const { configuration } = location.state as { configuration: Configuration };

    const {
        name,
        setName,
        setTimeline,
        setSources,
        setTopics,
        setReadingTime,
        handleSubmit,
        user
    } = useConfigurationForm(configuration.id);

    useEffect(() => {
        setName(configuration.name);
    }, []);

    return (
        <div>
            <Header />
            {user.id && <Sidebar userId={user.id.toString()} />}
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="configuration-form">
                    <div className="configuration-form-header">
                        <h2>Edit Template</h2>
                        <button className="configuration-form-button" type="submit">Save Changes</button>
                    </div>
                    <div className="configuration-form-field">
                        <div className="form-name-input">
                            <label htmlFor="template-name">
                                <h3>Name</h3>
                            </label>
                            <input
                                className="configuration-form-input"
                                type="text"
                                id="template-name-config"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter template name"
                                required
                            />
                        </div>
                        <TimelineSelection
                            onDateChange={setTimeline}
                            inputData={{label:fetchPeriodMapper[configuration.fetch_period], value:(configuration.fetch_period/60).toString()}}
                        />
                        <ReadingTimeSelection
                            onReadingTimeChange={setReadingTime}
                            inputData={configuration.read_time}
                        />
                        <SourceSelection
                            onSourceChange={setSources}
                            inputData={configuration.sources}
                        />
                    </div>
                    <TopicSelection
                        onTopicChange={setTopics}
                        inputData={configuration.categories}
                    />
                </form>
            </div>
        </div>
    );
};

export default EditConfigurationForm;
