import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../components/contentPage/Sidebar';
import NewsGeneration from '../components/contentPage/NewsGeneration';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";
import Header from '../components/landingPage/Header';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state ? location.state.userId : null;

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
                navigate("/landingPage");
            }
        } catch (error) {
            console.log("Failed logout! " + error);
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
