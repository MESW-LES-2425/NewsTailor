import Sidebar from "../contentPage/Sidebar.tsx";
import Header from '../landingPage/Header.tsx';
import userNewspapersForm from "./userNewspapersForm.ts";

interface NewsPropertiesPresentation {
    news?: { content?: string; title?: string; id?: string; userid?: string };
}

const NewsPresentation: React.FC<NewsPropertiesPresentation> = ({ news }) => {
    if (!news) return null;
  
    return (
      <div className="news-item">
        {news.title && <h3 className="news-title">{news.title}</h3>}
        {news.content && <div className="news-content">{news.content}</div>}
      </div>
    );
};
  

function YourNewspapersPage() {
    const { 
        userId,
        newspapers
    } = userNewspapersForm();


    return (
        <div>
        <Sidebar userId={userId} />
        <Header />
        <div className="your-newspapers-container">
            <h1>Your Newspapers</h1>
            {newspapers.length === 0 ? (
            <p>No newspapers available.</p>
            ) : (
            <ul>
                {newspapers.map((news, index) => (
                <li key={index} className="news-item-container">
                    <NewsPresentation news={news} />
                </li>
                ))}
            </ul>
            )}
        </div>    
        </div>
    );
}
  
  

export default YourNewspapersPage;