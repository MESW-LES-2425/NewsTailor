import React from 'react';
import '../../styles/aboutPage/About.css';
import teamImage from '../../assets/team.png';

const About: React.FC = () => {
  return (
    <div className="about-content">
      <div className="about-text">
        <p>
          NewsTailor was developed as part of the Software Engineering Lab course within the Master’s program in Software Engineering at the Faculty of Engineering, University of Porto. Our team—Duarte Caldas, João Oliveira, Maria Laranjeira, and Pedro Magalhães—was tasked with designing an original and impactful product.
          <br />
          <br />
          Driven by the goal of making news consumption more relevant and efficient, we created NewsTailor: a smart, personalized news curator that tailors content to match the user’s interests and available time. Serving as developers, designers, and project managers, we built NewsTailor from the ground up, bringing together our skills and creativity to offer a fresh way to engage with the news that matters most.
        </p>
      </div>
      <div className="about-icon">
        <img src={teamImage} alt="Team Illustration" className="about-image" />
      </div>
    </div>
  );
};

export default About;
