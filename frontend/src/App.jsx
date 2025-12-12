import React, {useEffect} from "react"
import { Route, Routes, Navigate } from "react-router"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import DashBoard from "./pages/DashBoard.jsx"
import Profile from "./pages/Profile.jsx"
import Developers from "./pages/Developers.jsx"
import PageLoader from "./components/PageLoader.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import Chat from "./pages/Chat.jsx"




export default function App() {

    const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    if (isCheckingAuth) return <PageLoader />

    return (
  
        <div className="min-h-screen bg-gradient-to-br from-[#292F5A] via-[#1D3F87] to-[#59558D] text-white">

            <Routes>
                <Route path="/" element={authUser ? <DashBoard /> : <Navigate to={"/login"}/>}/>
                <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"}/>}/>
                <Route path="/register" element={!authUser ? <Register /> : <Navigate to={"/"}/>}/>
                <Route path="/profile/:id" element={authUser ? <Profile /> : <Navigate to={"/login"}/>}/>
                <Route path="/developers" element={authUser ? <Developers /> : <Navigate to={"/login"}/>}/>
                <Route path="/chats" element={authUser ? <Chat /> : <Navigate to={"/login"}/>}/>
            </Routes>
        </div>
    )
}
