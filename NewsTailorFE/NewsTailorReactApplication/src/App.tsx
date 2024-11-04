import { useState } from 'react'
import './App.css'
import Header from './landingPage/Header';
import AuthButtons from './landingPage/AuthButtons';
import NewsSection from './landingPage/InfoCards';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <AuthButtons />
      <NewsSection />
    </div>
  );
}

export default App
