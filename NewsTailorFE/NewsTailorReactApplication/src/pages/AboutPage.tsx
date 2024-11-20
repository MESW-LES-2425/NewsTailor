import About from '../components/aboutPage/About';
import Header from '../components/aboutPage/Header';
import Footer from '../components/aboutPage/Footer';

function AboutPage() {
  return (
    <div className="about-page-container">
      <Header />
      <About />
      <Footer />
    </div>
  );
}

export default AboutPage