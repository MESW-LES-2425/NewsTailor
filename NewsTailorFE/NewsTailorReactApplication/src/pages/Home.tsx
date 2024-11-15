import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../components/contentPage/Sidebar';
import NewsGeneration from '../components/contentPage/NewsGeneration';
import { REFRESH_TOKEN} from "../constants";
import api from "../api";
import Header from '../components/landingPage/Header';
import {checkAuthStatus, clearAuthTokens} from "../utils/authUtils.ts";

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state ? location.state.userId : null;

    const handleLogout = async () => {
        const route = "/api/logout/";
        const isAuthenticated = await checkAuthStatus();
        if(isAuthenticated){
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            await api.post(route, { "refresh": refreshToken });
            clearAuthTokens();
            navigate("/landingPage");
        } else {
            clearAuthTokens();
            navigate("/landingPage");
        }
    };

    const handleAbout = () => {
      navigate('/about');
    };

    return (
        <div>
          <Header />
          <Sidebar userId={userId} />
          <NewsGeneration />
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleAbout}>About</button>
        </div>
      );
}

export default Home;
