import React from "react";
import { X, Plus } from "lucide-react";

const ProjectDescription = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#5f75ff] to-[#582b84] rounded-2xl shadow-2xl text-white p-6 relative">
        

        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
        >
          <X size={20} />
        </button>

        {/* Top Section */}
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 bg-gray-200 rounded-full border-4 border-white shadow"></div>

          <div>
            <h1 className="text-2xl font-bold">Project Title</h1>

            <button className="mt-2 px-4 py-1 bg-white/30 text-white rounded-lg hover:bg-white/40">
              Change Photo
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 border-t border-white/20 pt-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-sm text-gray-200 mt-2 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s...
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6 border-t border-white/20 pt-4">
          <h2 className="text-xl font-semibold">Skills Used</h2>
          <div className="flex gap-3 mt-3 flex-wrap">
            {["React", "Node", "MongoDB", "Tailwind"].map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}

            <button className="w-9 h-9 bg-white/25 rounded-full flex items-center justify-center hover:bg-white/40 transition">
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-6 border-t border-white/20 pt-4">
          <h2 className="text-xl font-semibold">Team Members</h2>

          <div className="flex items-center gap-6 mt-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <div className="w-14 h-14 bg-gray-200 rounded-full mx-auto"></div>
                <p className="text-sm mt-1">Name {n}</p>
              </div>
            ))}

            <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition">
              <Plus size={26} className="text-white" />
            </button>
          </div>
        </div>

        {/* Delete Button */}
        <div className="border-t border-white/20 mt-8 pt-4 flex justify-center">
          <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full shadow text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
