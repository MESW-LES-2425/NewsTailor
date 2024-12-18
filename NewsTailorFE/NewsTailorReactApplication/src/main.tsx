import './index.css'
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
import {GoogleOAuthProvider} from "@react-oauth/google";
import Templates from "./components/templates/templates.tsx";
import ConfigurationForm from "./components/configurationForm/ConfigurationForm.tsx";
import AdminPage from "./pages/adminPage.tsx";
import Forbidden from "./pages/Forbidden.tsx";
import AdminRoute from "./components/AdminRoute.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="866508719375-9ll87llj25h9v0c1leukt43usator7kn.apps.googleusercontent.com">
        <UserProvider>
            <App />
        </UserProvider>
    </GoogleOAuthProvider>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
                <Route path="/create-configuration" element={<ProtectedRoute><ConfigurationForm /></ProtectedRoute>} />
                <Route path="/landingPage" element={<AuthRoute><LandingPage /></AuthRoute>} />
                <Route path="/" element={<AuthRoute><LandingPage /></AuthRoute>} />
                <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/404" element={<NotFound />}></Route>
                <Route path="/newspapers/:userId" element={<ProtectedRoute><YourNewspapersPage /></ProtectedRoute>} />
                <Route path="/profile/:userId" element={<ProtectedRoute><ProfileForm /></ProtectedRoute>} />
                <Route path="/reset-password/:userId/:token" element={<AuthRoute><ResetPassword /></AuthRoute>} />
                <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
                <Route path="/forbidden" element={<Forbidden/>} />
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
