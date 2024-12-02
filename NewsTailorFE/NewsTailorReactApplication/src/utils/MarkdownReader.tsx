import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../utils/markdownStyling.css';
import api from '../api';


const MarkdownReader = ({ initialContent = "", user_id = "", configUpdated = false }) => {
    const [markdown, setMarkdown] = useState(initialContent);
    const [fontSize, setFontSize] = useState(16);

    useEffect(() => {
        const fetchUserConfiguration = async () => {
            try {
                const response = await api.get(`/api/fetch-user-configuration/${user_id}/`);
                const { font_size: fontSize } = response.data["User Configuration"] || {};
                
                if (fontSize) {
                    setFontSize(fontSize);
                } else {
                    console.log("Font size not found in response data");
                }
            } catch (error) {
                console.error("Error fetching user configuration:", error);
            }
        };
    
        if (user_id) {
            fetchUserConfiguration();
        }
    }, [user_id, configUpdated]);
    

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
                style={{
                    padding: "1rem",
                    borderRadius: "8px",
                    background: "#f9f9f9",
                    fontSize: `${fontSize}px`,
                }}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownReader;
