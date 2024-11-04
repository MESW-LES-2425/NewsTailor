import React from 'react';
import './css/InfoCards.css';

interface InfoCard {
  text: string;
}

const infoCards: InfoCard[] = [
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
];

const InfoCards: React.FC = () => {
  return (
    <section className="news-section">
      <div className="news-cards">
        {infoCards.map((card, index) => (
          <div className="news-card" key={index}>
            <span className="news-icon">📰</span>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoCards;
