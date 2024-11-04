import React from 'react';
import './css/AuthButtons.css';

const AuthButtons: React.FC = () => {
  return (
    <div className="auth-buttons">
      <button className="auth-button">Login</button>
      <button className="auth-button">Register</button>
    </div>
  );
};

export default AuthButtons;
