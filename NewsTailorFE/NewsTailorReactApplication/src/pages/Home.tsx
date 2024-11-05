import React from 'react';
import Sidebar from '../Sidebar';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      console.log("Refresh token: " + refreshToken);
      console.log("Access token: " + localStorage.getItem(ACCESS_TOKEN));

      const route = "/api/logout/";
      if (refreshToken) {
        await api.post(route, { "refresh": refreshToken });
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(ACCESS_TOKEN);

        // Navigate after successfully logging out
        navigate("/auth");
      }
    } catch (error) {
      console.log("Failed logout! " + error);
    }
  };

  return (
    <div>
      <Sidebar />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
