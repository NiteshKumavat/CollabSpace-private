import React from 'react'

function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
        <div className="bg-[#301F56] rounded-lg w-[1200px] h-[700px] grid grid-cols-2 border border-gray-500">
            <div className="flex justify-center items-center ">
                <div className="bg-purple-800 rounded-2xl p-7 w-96 h-[90%] flex flex-col items-center ">
                    <img className="mt-6" src="logo-removebg-preview.png" alt="logo" width={150} />
    
                    <h1 className="text-white text-3xl font-extrabold mb-12">Welcome back!</h1>
                    <form className="w-full flex flex-col">
                        <label htmlFor="email" className="ml-2 text-white font-semibold text-l">Email : </label>
                        <input type="email" id="email" placeholder="Email" className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black mb-5" required/>
                        <label htmlFor="password" className='ml-2 text-white font-semibold text-l'>Password : </label>
                        <input type="password" id="password" placeholder="Password" className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black mb-5" required/>
                        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                            Sign in
                        </button>
                        
                    </form>

                    <p className="mt-4 text-gray-300 text-sm">
                        Don't have an account? <a href="/register" className="text-blue-400 underline">Sign up</a>
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <img src="login.png" alt="team image" />
                <h2 className='text-3xl font-bold text-blue-400 text-center'>Keep creating. Keep collabrating.</h2>
            </div>
        </div>
    </div>
  )
}

export default Login