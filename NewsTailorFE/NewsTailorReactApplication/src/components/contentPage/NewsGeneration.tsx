import React, { useState } from 'react';
import "./newsGeneration.css";
import api from '../../api';

const NewsGeneration: React.FC = () => {
  const [news, setNews] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const route = "api/fetch-news/";
      const response = await api.post(route, {
        category: 'technology',
        language: 'English',
        source: 'dev_to',
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
          <h2>Obtained News</h2>
          <p>{news}</p>
        </div>
      )}
    </div>
  );
};

export default NewsGeneration;
