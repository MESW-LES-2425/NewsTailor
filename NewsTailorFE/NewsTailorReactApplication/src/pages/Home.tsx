import React from 'react';
import Sidebar from '../components/mainPage/Sidebar';
import NewsGeneration from '../components/mainPage/NewsGeneration';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Header from '../components/landingPage/Header';

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      const route = "/api/logout/";

      if (refreshToken) {
        await api.post(route, { "refresh": refreshToken });
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(ACCESS_TOKEN);

        // Navigate after successfully logging out
        navigate("/");
      }
    } catch (error) {
      console.log("Failed logout! " + error);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <NewsGeneration />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
