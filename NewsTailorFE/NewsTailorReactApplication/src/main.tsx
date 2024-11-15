import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./components/auth/Auth"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthRoute from "./components/AuthRoute.tsx";
import AboutPage from './pages/AboutPage'
import './index.css'
import ProfileForm from "./components/profile/ProfileForm.tsx";
import LandingPage from './pages/LandingPage.tsx'
import FaqPage from './pages/FaqPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:userId" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/landingPage" element={<LandingPage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>}/>
                <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/404" element={<NotFound />}></Route>
                <Route path="/profile/:userId" element={<ProtectedRoute><ProfileForm /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
