import React, { useState } from 'react';
import axios from 'axios';
import "./newsGeneration.css";

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
      // Setting news values to the state variable
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div className="news-generation">
      <h1>Customize your newspaper</h1>
      <button onClick={fetchNews}>Generate</button>
      {news && (
        <div className='news-content-container'>
          <h2>News:</h2>
          <p>{news}</p>
        </div>
      )}
    </div>
  );
};

export default NewsGeneration;
