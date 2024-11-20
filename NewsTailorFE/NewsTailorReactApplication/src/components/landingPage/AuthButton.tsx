import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/landingPage/AuthButton.css';

const AuthButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="auth-button-container">
      <button className="auth-button" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default AuthButton;
