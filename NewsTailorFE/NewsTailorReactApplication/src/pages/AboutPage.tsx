import About from '../components/aboutPage/About';
import Header from '../components/aboutPage/Header';
import Footer from '../components/aboutPage/Footer';
import '../styles/aboutPage/AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page-container fade-in">
      <Header />
      <About />
      <Footer />
    </div>
  );
}

export default AboutPage