
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import ProjectBox from '../components/ProjectBox.jsx'
import { FaSearch } from "react-icons/fa";
import ProjectDescription from '../components/ProjectDescription.jsx';

import { useState } from 'react';

function DashBoard() {
    const [open, setOpen] = useState(false)
  return (
  	<div >
        <Header />

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-5xl font-extrabold leading-tight">
                    Collaborate.<br />Create. Grow.
                </h1>
                <p className="mt-4 text-lg text-gray-200 max-w-[450px]">
                    Join developers across the world to build amazing projects together.
                </p>
                <div className="flex gap-4 mt-8">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-medium">
                        Explore Projects
                    </button>
                    <button className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl text-lg font-medium">
                        Create a Team
                    </button>
                </div>
            </div>
            <div>
                <img
                    src="./home-page-team-removebg-preview.png"
                    alt="team illustration"
                    className="max-w-[500px] lg:max-w-[600px]"
                />
            </div>
        </div>

        <div className='m-5 p-4 bg-white/10 backdrop-blur-md rounded'>


            <h2 className='font-bold text-3xl mb-5'>Featured Projects</h2>
            <div className="flex items-center w-72 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20 w-[100%] gap-2">
                <FaSearch />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="ml-2 w-full bg-transparent outline-none placeholder-gray-400 text-white"
                />
            </div>

            <div className='grid grid-cols-[repeat(auto-fill,300px)] gap-5 mt-5 middle'>
                <ProjectBox onStart={() => setOpen(true)}/>
                <ProjectBox onStart={() => setOpen(true)}/>
                <ProjectBox onStart={() => setOpen(true)}/>

                {open && <ProjectDescription onClose={() => setOpen(false)}/>}
            </div>


        </div>

        <Footer />
    </div>
  )

}

export default DashBoard