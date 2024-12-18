import React from "react";
import TimelineSelection from "../timelineSelection/TimelineSelection.tsx";
import SourceSelection from "../sourceSelection/SourceSelection.tsx";
import TopicSelection from "../topicSelection/TopicSelection.tsx";
import ReadingTimeSelection from "../readingTimeSelection/ReadingTimeSelection.tsx";
import useConfigurationForm from "./useConfigurationForm.ts";
import Header from '../../components/landingPage/Header';
import '../../styles/news-content/configuration.css';
import ShareButtons from "../socialMediaExports/socialMediaExport.tsx";
import Sidebar from "../contentPage/Sidebar.tsx";

const ConfigurationForm: React.FC = () => {

    const {
        name,
        setName,
        setTimeline,
        setSources,
        setTopics,
        setReadingTime,
        handleSubmit,
        user
    } = useConfigurationForm()

    return (
        <div>
            <div className="social-icons">
                <ShareButtons initialContent={ `${name}`} />
            </div>
            
            <Header />
            {user.id && <Sidebar userId={user.id.toString()} />}
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="configuration-form">
                    <div className="configuration-form-header">
                        <h2>Create your Template</h2>
                        <button className="configuration-form-button" type="submit">Create</button>
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

                        <TimelineSelection onDateChange={setTimeline} />
                        <ReadingTimeSelection onReadingTimeChange={setReadingTime} />
                        <SourceSelection onSourceChange={setSources} />
                    </div>
                    <TopicSelection onTopicChange={setTopics} />
                </form>
            </div>
        </div>

    );
};

export default ConfigurationForm;