import React from 'react'

function ProjectBox({onStart}) {


  return (
    <div className="w-[300px] bg-white rounded-xl shadow-lg overflow-hidden border" onClick={onStart}>

        <img 
            src="/mnt/data/02d59f7b-05c4-4e51-81d6-67f3d8f7bd83.png"
            alt="project"
            className="w-full h-40 object-cover"
        />

        <div className="p-4">

            <h2 className="text-xl font-bold text-black">Project Manager</h2>

            <p className="text-gray-600 text-sm mt-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry’s standard dummy…..
            </p>

            <div className="mt-3">
                <h3 className="font-semibold text-gray-700">Skills Required:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">Leadership</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">Teamwork</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md">Communication</span>
                </div>
            </div>

            <button className="w-full mt-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
            Join Project
            </button>

        </div>
    </div>
  )
}

export default ProjectBox