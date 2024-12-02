import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../utils/markdownStyling.css';
import api from '../api';


const MarkdownReader = ({ initialContent = "", user_id = "", configUpdated = false }) => {
    const [markdown, setMarkdown] = useState(initialContent);
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState("AbeeZee");

    useEffect(() => {
        const fetchUserConfiguration = async () => {
            try {
                const response = await api.get(`/api/fetch-user-configuration/${user_id}/`);
                const { font_size: fontSize } = response.data["User Configuration"] || {};
                const { font_family: fontFamily } = response.data["User Configuration"] || {};


                if (fontSize && fontFamily) {
                    setFontSize(fontSize);
                    setFontFamily(fontFamily);
                } else {
                    console.log("Missing fields in response data");
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
                    fontFamily: `${fontFamily}, sans-serif`,
                }}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownReader;
