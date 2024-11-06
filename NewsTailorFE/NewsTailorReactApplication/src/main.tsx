import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./components/auth/Auth"
import NotFound from "./pages/NotFound"
import LandingPage from './pages/LandingPage'
import ProtectedRoute from "./components/ProtectedRoute"
import AboutPage from './pages/AboutPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>}/>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App