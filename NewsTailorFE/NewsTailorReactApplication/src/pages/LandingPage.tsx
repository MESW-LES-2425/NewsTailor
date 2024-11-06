import AuthButton from '../components/landingPage/AuthButton';
import Header from '../components/landingPage/Header';
import InfoCards from '../components/landingPage/InfoCards';
import '../styles/LandingPage.css';


function LandingPage() {
  return (
    <div className="landing-page-container">
      <Header />
      <AuthButton />
      <InfoCards />
    </div>
  );
}

export default LandingPage