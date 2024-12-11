//import React from 'react'
import './index.css'
import ConfigPage from "./pages/configPage.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./components/auth/Auth"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthRoute from "./components/AuthRoute.tsx";
import AboutPage from './pages/AboutPage'
import ProfileForm from "./components/profile/ProfileForm.tsx";
import LandingPage from './pages/LandingPage.tsx'
import FaqPage from './pages/FaqPage.tsx'
import YourNewspapersPage from './components/userNewspapers/YourNewspapersPage.tsx'
import ResetPassword from './components/resetPassword/ResetPassword.tsx'
import Templates from "./components/templates/templates.tsx";
import AdminPage from "./pages/adminPage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <UserProvider>
        <App />
    </UserProvider>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:userId" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
                <Route path="/config/:userId" element={<ConfigPage />} />
                <Route path="/landingPage" element={<LandingPage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
                <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/404" element={<NotFound />}></Route>
                <Route path="/newspapers/:userId" element={<ProtectedRoute><YourNewspapersPage /></ProtectedRoute>} />
                <Route path="/profile/:userId" element={<ProtectedRoute><ProfileForm /></ProtectedRoute>} />
                <Route path="/reset-password/:userId/:token" element={<AuthRoute><ResetPassword /></AuthRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
