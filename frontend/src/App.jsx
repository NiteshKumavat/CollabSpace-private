import React from "react"
import { Route, Routes } from "react-router"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import DashBoard from "./pages/DashBoard.jsx"


export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#292F5A] via-[#1D3F87] to-[#59558D] text-white">
        <Routes>
            <Route path="/" element={<DashBoard />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
        </Routes>

    </div>
  )
}
