import "./contentTable.css";

const NewsPresentation = ({ news }: { news: string }) => {
    return (
        // Using the same styling as in the news generation component.
        <div className="content-table">
            <div className="news-container">
                <div className="news-item">
                    <h2>Your Reading Session</h2>
                    <p className="news-content">{news}</p>
                </div>
            </div>
        </div>
    );
}

export default NewsPresentation;
