import React, { useState } from 'react';
import axios from 'axios';

const NewsGeneration: React.FC = () => {
  const [news, setNews] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/fetch-news/', {
        category: 'technology',
        language: 'English',
        source: 'news_api',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div className="news-generation">
      <h1>News Generation</h1>
      <button onClick={fetchNews}>Generate News</button>
      {news && (
        <div>
          <h2>Fetched News:</h2>
          <p>{news}</p>
        </div>
      )}
    </div>
  );
};

export default NewsGeneration;
