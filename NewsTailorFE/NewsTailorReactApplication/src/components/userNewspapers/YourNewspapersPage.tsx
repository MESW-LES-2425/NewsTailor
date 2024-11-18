import Sidebar from "../contentPage/Sidebar.tsx";
import Header from '../landingPage/Header.tsx';
import userNewspapersForm from "./userNewspapersForm.ts";
import "./Newspapers.css";
import api from '../../api';


interface NewsPropertiesPresentation {
    news?: { content?: string; title?: string; id?: string; userid?: string; created_at?: string; is_currently_reading?: boolean };
    onDelete?: (id: string) => void;
}

const truncateContent = (content: string, maxLength: number = 200) => {
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
};
  
const NewsPresentation: React.FC<NewsPropertiesPresentation> = ({ news, onDelete }) => {
    const handleRead = () => {
      console.log(`Reading news with ID: ${news?.id}`);
    };
  
    const handleDelete = async () => {
        if (!news?.id) {
          console.error("News ID is missing.");
          return;
        }
        try {
          await api.post(
            "api/delete-newspaper/",
            { newspaperid: news.id },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log(`Deleted news with ID: ${news.id}`);
          if (onDelete) onDelete(news.id);
        } catch (error) {
          console.error("Error deleting news:", error);
        }
    };
  
    if (!news) return null;
    
    if (news.is_currently_reading) return null;
    
    return (
        <div className="news-item">
        {news.title && <h3 className="news-title">{news.title}</h3>}
        {news.content && (
            <div className="news-content">
            {truncateContent(news.content)}
            </div>
        )}
        {news.created_at && (
            <p className="news-date">
            Published: {new Date(news.created_at).toLocaleDateString()}
            </p>
        )}
        <div className="news-actions">
            <button className="read-btn" onClick={handleRead}>
            ➡ Read
            </button>
            <button className="delete-btn" onClick={handleDelete}>
            🗑 Delete
            </button>
        </div>
        </div>
    );

};

function YourNewspapersPage() {
    const { userId, newspapers = [], setNewspapers } = userNewspapersForm();

    const handleConclude = (id: string) => {
        setNewspapers((prev) => prev.filter((news) => news?.id !== id));
    };

    const filteredNewspapers = newspapers.filter((news) => !news.is_currently_reading);
  
    return (
      <div>
        <Sidebar userId={userId} />
        <Header />
        <div className="your-newspapers-container">
          <h1 className="your-newspapers">Your Newspapers</h1>
          {newspapers.length === 0 ? (
            <p>No newspapers available.</p>
          ) : (
            <div className="news-grid">
              {filteredNewspapers.map((news, index) => (
                <div key={index} className="news-item-container">
                  <NewsPresentation news={news} onDelete={handleConclude}/>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  
  

export default YourNewspapersPage;