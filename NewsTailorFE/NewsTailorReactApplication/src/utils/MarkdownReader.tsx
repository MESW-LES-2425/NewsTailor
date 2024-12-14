import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../utils/markdownStyling.css';


const MarkdownReader = ({ initialContent = "", fontSize = 0, fontFamily = "", marginSize = 0 }) => {
    const [markdown, setMarkdown] = useState(initialContent);

     useEffect(() => {
        setMarkdown(initialContent);
    }, [initialContent]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
                style={{
                    padding: `${marginSize}px`,
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
