import { useState } from "react";
import Header from "../components/Header.jsx";
import ProjectBox from "../components/ProjectBox.jsx";
import ProjectDescription from "../components/ProjectDescription.jsx";
import RequestBox from "../components/RequestBox.jsx";

export default function Profile() {
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)

  return (
    <div className="w-[100%]">
        <Header />

        <div className="w-[80%] mx-auto mt-10 px-4 ">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[100%]">

                <div className="flex flex-col items-center relative">

                    <div className="absolute right-0 top-0 flex items-center gap-2">
                        <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow hover:opacity-90 transition" onClick={() => setEdit(!edit)}>{edit ? "Save" : "Edit"}</button>
                    </div>

                    <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white"></div>

                    <h1 className="text-2xl font-semibold mt-3">UserName</h1>
                    <p className="text-sm text-gray-300">Nitesh Kumavat</p>
                </div>

                <div className="mt-8">
                    <p className="font-semibold text-lg">Bio</p>
                    <div className="bg-white/20 mt-2 p-4 rounded-xl text-sm">
                        Passionate about building collaborative tools and modern web applications.
                    </div>
                </div>

                <div className="mt-6">
                    <p className="font-semibold text-lg mb-2">Skills</p>
                    <div className="bg-white/10 mt-2 p-2 rounded-xl text-sm inline">
                        Node.js
                    </div>
                </div>

                <div className="mt-6">
                    <p className="font-semibold text-lg">Email</p>
                    <div className="bg-white/20 mt-2 p-4 rounded-xl text-sm">
                        xyz@gmail.com
                    </div>
                </div>

                <div className="mt-6">
                    <p className="font-semibold text-lg">Website Links</p>

                    <div className="bg-white/20 mt-3 p-4 rounded-xl space-y-4">

                        <div>
                            <label className="text-sm text-gray-200">LinkedIn</label>
                            {edit ? (
                                <input
                                    type="text"
                                    placeholder="https://linkedin.com/in/username"
                                    className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40"
                                />
                                ) : (
                                    <p className="mt-1 bg-white/10 px-3 py-2 rounded-lg text-gray-200 break-all">
                                        { "Not added"}
                                    </p>
                                )
                            }
                        </div>

                        <div>
                            <label className="text-sm text-gray-200">GitHub</label>

                            {edit ? (
                                <input
                                    type="text"
                                    placeholder="https://github.com/username"
                                    className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40"
                                />
                            ) : (
                                <p className="mt-1 bg-white/10 px-3 py-2 rounded-lg text-gray-200 break-all">
                                    { "Not added"}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-gray-200">Portfolio</label>

                            {edit ? (
                                <input
                                    type="text"
                                    placeholder="https://your-portfolio.com"
                                    className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40"
                                />
                            ) : (
                                <p className="mt-1 bg-white/10 px-3 py-2 rounded-lg text-gray-200 break-all">
                                    { "Not added"}
                                </p>   
                            )}
                        </div>

                    </div>
                </div>

                <div>
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-lg mt-4">Your Projects</h2>
                        <button className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow hover:opacity-90 transition">Create Project</button>
                    </div>
                
                    <div className='bg-white/20 mt-2 p-4 rounded-xl grid grid-cols-[repeat(auto-fill,300px)]  gap-5 mt-5 middle'>
                        <ProjectBox onStart={() => setOpen(true)}/>
                        <ProjectBox onStart={() => setOpen(true)}/>
                        <ProjectBox onStart={() => setOpen(true)}/>

                        {open && <ProjectDescription onClose={() => setOpen(false)}/>}
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-lg mt-4">All Requests</h2>
                    <div className="bg-white/20 mt-2 p-4 rounded-xl">
                        <RequestBox name="Nitesh" desc="lorem" img={"./login.png"} project="Project Manager" onApprove={() => console.log("Hello")} onReject={() => console.log("No Hello")}/>
                        <RequestBox name="Nitesh" desc="lorem" img={"./login.png"} project="Project Manager" onApprove={() => console.log("Hello")} onReject={() => console.log("No Hello")}/>
                    </div>
                </div>

                <div className="flex justify-center mt-5">
                    <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-md">
                        Delete Profile
                    </button>
                </div>

            </div>

            
        </div>

        

        <div className="pb-10"></div>
    </div>
  );
}
