import AuthButton from '../components/landingPage/AuthButton';
import Header from '../components/landingPage/Header';
import InfoCards from '../components/landingPage/InfoCards';
import '../styles/landingPage/LandingPage.css';


function LandingPage() {
  return (
    <div className="landing-page-container fade-in">
      <Header />
      <AuthButton />
      <InfoCards />
    </div>
  );
}

export default LandingPage