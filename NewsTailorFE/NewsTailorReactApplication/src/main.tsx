import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./components/auth/Auth"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import './index.css'
import ProfileForm from "./components/profile/ProfileForm.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/register" element={<Auth/>}/>
                <Route path="/login" element={<Auth/>}/>
                <Route path="/404" element={<NotFound/>}></Route>
                <Route path="/profile/:userId" element={<ProfileForm/>}/>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App