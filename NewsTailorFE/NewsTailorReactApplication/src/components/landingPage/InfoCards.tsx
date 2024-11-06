import React from 'react';
import '../../styles/landingPage/InfoCards.css';
import { IoVolumeMute, IoReader, IoEarth, IoStopwatch } from "react-icons/io5";


interface InfoCard {
  text: string;
  icon: React.ReactNode;
}

const infoCards: InfoCard[] = [
  { icon: <IoReader />, text: "Get the news that matters to you. Our AI curates articles from across the web based on your selected interests." },
  { icon: <IoStopwatch />, text: "Short on time? Let us know how much time you have, and NewsTailor will adjust the news length just for you." },
  { icon: <IoEarth />, text: "Stay up-to-date with real-time news summaries, keeping you informed on the latest in your favorite topics." },
  { icon: <IoVolumeMute />, text: "Cut through the noise. NewsTailor filters out irrelevant content, delivering only what you need to know." },
];

const InfoCards: React.FC = () => {
  return (
    <section className="info-section">
      <div className="info-cards">
        {infoCards.map((card, index) => (
          <div className="info-card" key={index}>
            <span className="news-icon">{card.icon}</span>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoCards;
