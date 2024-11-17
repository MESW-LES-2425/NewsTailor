import React from "react";
import TimelineSelection from "../timelineSelection/TimelineSelection.tsx";
import SourceSelection from "../sourceSelection/SourceSelection.tsx";
import TopicSelection from "../topicSelection/TopicSelection.tsx";
import ReadingTimeSelection from "../readingTimeSelection/ReadingTimeSelection.tsx";
import useConfigurationForm from "./useConfigurationForm.ts";

const ConfigurationForm: React.FC = () => {

    const {
        name,
        setName,
        setTimeline,
        setSources,
        setTopics,
        setReadingTime,
        handleSubmit,
    } = useConfigurationForm()

    return (
        <form onSubmit={handleSubmit} className="configuration-form">
            <h2>Create your Template</h2>
            <div className="form-field">
                <label htmlFor="template-name">Name as</label>
                <input
                    type="text"
                    id="template-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter template name"
                    required
                />
            </div>
            <TimelineSelection onDateChange={setTimeline}/>
            <SourceSelection onSourceChange={setSources}/>
            <TopicSelection onTopicChange={setTopics}/>
            <ReadingTimeSelection onReadingTimeChange={setReadingTime}/>

            <button type="submit">Submit</button>
        </form>
    );
};

export default ConfigurationForm;
