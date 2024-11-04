import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Sidebar from './Sidebar';
import Header from './landingPage/Header';
import AuthButtons from './landingPage/AuthButtons';
import InfoCards from './landingPage/InfoCards';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Sidebar />
    <Header />
    <AuthButtons />
    <InfoCards />
  </React.StrictMode>,
)
