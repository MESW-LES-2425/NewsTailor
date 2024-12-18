import React from "react";
import useTemplates from "./useTemplates.ts";
import Header from "../landingPage/Header.tsx";
import Sidebar from "../contentPage/Sidebar.tsx";
import "../contentPage/contentTable.css";
import "./templates.css";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import ConfigurationShareButtons from "../socialMediaExports/configurationExport.tsx";

const Templates: React.FC = () => {
    const {
        configurations,
        loading,
        fetchPeriodMapper,
        deleteConfiguration,
        user
    } = useTemplates();

    if (loading) return <div>Loading configurations...</div>;

    const formatConfigurationsForSharing = () => {
        return configurations.map(config => {
            const categories = config.categories
                .map(category => `${category.name} (${category.percentage}%)`)
                .join(", ");
            return `
                Name: ${config.name}
                Reading Time: ${config.read_time} mins
                Fetch Period: ${fetchPeriodMapper[config.fetch_period]}
                Sources: ${config.sources.join(", ")}
                Categories: ${categories}
            `;
        }).join("\n\n");
    };

    const shareableContent = configurations.length > 0
        ? formatConfigurationsForSharing()
        : "No configurations available.";

    return (
        <>
            <Header />
            <Sidebar userId={user.id!.toString()} />
            <div className="social-icons">
                <ConfigurationShareButtons initialContent={shareableContent} />
            </div>
            <div className="content-table">
                <h1>Your Templates</h1>
                <Link to="/create-configuration" className="new-template-btn">
                    + New
                </Link>
                <div className="configurations-container">
                    {configurations.length === 0 ? (
                        <div>No configurations available.</div>
                    ) : (
                        configurations.map((config) => (
                            <div key={config.id} className="configuration-card">
                                <h2>{config.name}</h2>
                                <p>
                                    <strong>Reading Time:</strong> {config.read_time} mins
                                </p>
                                <p>
                                    <strong>Fetch Period:</strong>{" "}
                                    {fetchPeriodMapper[config.fetch_period]}
                                </p>
                                <p>
                                    <strong>Sources:</strong> {config.sources.join(", ")}
                                </p>
                                <h3>Categories:</h3>
                                <ul>
                                    {config.categories.map((category) => (
                                        <li key={category.id}>
                                            {category.name} ({category.percentage}%)
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="delete-configuration-btn"
                                    onClick={() => deleteConfiguration(config.id)}
                                    aria-label="delete"
                                >
                                    <MdDelete className="delete-icon" />
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Templates;
