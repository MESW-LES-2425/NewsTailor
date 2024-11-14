import { useNavigate } from 'react-router-dom';
import "./contentTable.css";
import api from '../../api';

interface NewsPropertiesPresentation {
    news?: { content?: string; title?: string; id?: string; userid?: string };
}

const NewsPresentation: React.FC<NewsPropertiesPresentation> = ({ news }) => {
    const navigate = useNavigate();

    const concludeReadingSession = async () => {
        if (!news?.id) {
            console.error('News ID is missing, cannot conclude reading session.');
            return;
        }

        try {
            const route = "api/conclude-reading-session/";
            await api.post(route, {
                newspaperid: news.id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // After successful conclusion, navigate to the user's news generation component
            if (news.userid) {
                navigate(`/news-generation/${news.userid}`);  // Navigate to the news generation component
            }
        } catch (error) {
            console.error('Error concluding reading session:', error);
        }
    };

    return (
        <div className="content-table">
            <div className="news-container">
                <div className="news-item">
                    <h2>Your Reading Session</h2>
                    {news?.title && <h3 className="news-title">{news.title}</h3>}
                    {news?.content && <p className="news-content">{news.content}</p>}
                    <button className="SideButton" onClick={concludeReadingSession}>
                        Conclude Reading Session
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsPresentation;
