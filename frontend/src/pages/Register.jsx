import React from 'react'

function register() {
    return (
        <div className="w-full h-screen flex items-center justify-center ">
            <div className="bg-[#301F56] rounded-lg w-[1200px] h-[700px] grid grid-cols-2 border border-gray-500 container">
                <div className="flex justify-center items-center px-5">
                    <div className="bg-purple-800 rounded-2xl p-7 w-96 h-[90%] flex flex-col items-center auth-container">
                        <img className="mt-6" src="logo-removebg-preview.png" alt="logo" width={150} />
        
                        <h1 className="text-white text-3xl font-extrabold mb-12">Join CollabSpace</h1>
                        <form className="w-full flex flex-col">
                            <label htmlFor="fullName" className="ml-2 text-white font-semibold text-l">Full Name : </label>
                            <input type="fullName" id="fullName" placeholder="Full Name" className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black mb-5" required/>
                            <label htmlFor="email" className="ml-2 text-white font-semibold text-l">Email : </label>
                            <input type="email" id="email" placeholder="Email" className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black mb-5" required/>
                            <label htmlFor="password" className='ml-2 text-white font-semibold text-l'>Password : </label>
                            <input type="password" id="password" placeholder="Password" className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black mb-5" required/>
                            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                                Sign Up
                            </button> 
                        </form>

                        <p className="mt-4 text-gray-300 text-sm">
                            Already have an account? <a href="/login" className="text-blue-400 underline">Sign In</a>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center image-container">
                    <img src="register-removebg-preview.png" alt="team image" />
                    <h2 className='text-3xl font-bold text-blue-400 text-center'>Find your team. Build your vision</h2>
                </div>
            </div>
        </div>
    )
}

export default register