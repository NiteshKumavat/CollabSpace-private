import React, {useState} from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { LoaderIcon } from 'lucide-react';

function Login() {

    const [form, setFormData] = useState({email : "", password : ""})
    const {login, isLoggingIn} = useAuthStore()

    const handleSubmit = (e) => {
        e.preventDefault();
        login(form);
    }

    return (
        <div className="w-full h-screen flex items-center justify-center ">
            <div className="bg-[#301F56] rounded-lg w-[1200px] h-[700px] grid grid-cols-2 border border-gray-500 container">
                <div className="flex justify-center items-center px-5">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-7 w-96 h-[90%] flex flex-col items-center auth-container">
                        <img className="mt-6" src="logo-removebg-preview.png" alt="logo" width={150} />
        
                        <h1 className="text-white text-3xl font-extrabold mb-12 ">Welcome back!</h1>
                        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                            <label htmlFor="email" className="ml-2 text-white font-semibold text-l">Email : </label>
                            <input type="email" id="email" className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black mb-5" value={form.email} onChange={(e) => setFormData({ ...form , email : e.target.value})} required/>
                            <label htmlFor="password" className='ml-2 text-white font-semibold text-l'>Password : </label>
                            <input type="password" id="password" className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black mb-5" value={form.password} onChange={(e) => setFormData({ ...form , password : e.target.value})} required/>
                            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" disabled={isLoggingIn}>
                                {isLoggingIn ? (
                                    <LoaderIcon className="w-full h-5 animate-spin text-center" />
                                ) : (
                                    "Sign In"
                                )}
                            </button> 
                        </form>

                        <p className="mt-4 text-gray-300 text-sm">
                            Don't have an account? <a href="/register" className="text-blue-400 underline">Sign up</a>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center image-container">
                    <img src="login.png" alt="team image" />
                    <h2 className='text-3xl font-bold text-blue-400 text-center'>Keep creating. Keep collabrating.</h2>
                </div>
            </div>
        </div>
    )
}

export default Login