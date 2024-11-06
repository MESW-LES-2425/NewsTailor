import logo from './assets/logo.png';

const Logo: React.FC = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;